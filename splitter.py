import os
from pdb import line_prefix
import sys
import json

charsizes = {'a': 71, 'b': 646, 'c': 83, 'd': 64, 'e': 70, 'f': 118, 'g': 46,
	'h': 66, 'i': 162, 'j': 159, 'k': 75, 'l': 127, 'm': 44, 'n':66, 'o': 67, 'p':64,
	'q': 64, 'r': 105, 's': 78, 't': 111, 'u': 67, 'v': 70, 'w': 43, 'x': 71, 'y': 70, 
	'z': 81, 'A': 51, 'B': 55, 'C':57, 'D': 50, 'E': 64, 'F':68, 'G': 51, 'H': 49,
	'I': 146, 'J': 123, 'K': 60, 'L': 69, 'M': 44, 'N': 50, 'O': 49, 'P': 59, 'Q': 49,
	'R': 56, 'S': 61, 'T': 61, 'U': 51, 'V': 54, 'W': 34, 'X': 57, 'Y': 63, 'Z': 63}

#Usage: py splitter.py pagesize linesize
class Config():
	def __init__(self) -> None:
		self.book = []
		self.pages = {}
		self.totalpages = 0

	def addpage(self, globalnum, localnum, chapternum):
		self.pages[globalnum] = {"page":localnum, "chapter":chapternum}

	def addchapter(self, chaptername, chapternum, length):
		self.book.append({"chapter":chapternum, "title":chaptername, "pages":length})

	def settotalpages(self, num):
		self.totalpages = num

	def generate(self):
		config = {"book": self.book, "pages":self.pages, "totalPages": self.totalpages}
		with open("public/book/config.json", 'w') as configf:
			json.dump(config, configf)

class Page_Generator():
	def __init__(self) -> None:
		self.tab = ""
		self.paragraphbreak = "\n"
		self.linebreak = u'\xa0'
		self.pagedir = "public/book/pages/"
		self.chapternum = 0
		self.cf = Config()

	def genpage(self, pagenum, rawtext):
		with open(self.pagedir + str(self.chapternum) + "/" + str(pagenum) + ".txt", 'w') as page:#Save a page
			txt = ""
			if pagenum == 1:
				txt = self.tab
			if rawtext[0] == " ":
				txt += rawtext[1:].replace("\n", self.paragraphbreak + self.tab) #Remove leading space
			else:
				txt += rawtext.replace("\n", self.paragraphbreak + self.tab) #No leading space
			#Split into lines
			linepos = 0
			sumline = 0
			while linepos < len(txt):
				if txt[linepos] in charsizes:
					sumline += 1 / charsizes[txt[linepos]]
				else:
					sumline += 1/34 #Upper bound for now
				if txt[linepos] == "\n":
					sumline = 0
				
				if sumline >= 1:				
					while txt[linepos] != " ":
						linepos -= 1
				if sumline >= 1:
					txt = txt[:linepos] + self.linebreak + txt[linepos + 1:]
					sumline = 0
				linepos += 1
				
			page.write(txt)
	
	#pagesize: Size of page in characters
	def split(self, pagesize, linesize):
		#Clean any existing pages
		for f in os.listdir(self.pagedir):
			for f1 in os.listdir(self.pagedir + str(f)):
				os.remove(self.pagedir + str(f) + "/" + str(f1))
			os.rmdir(self.pagedir + f)
		globalpagenum = 1 #Book page number
		for f in range(1, 52):#Generate chapter
			self.chapternum = f
			os.mkdir(self.pagedir + str(self.chapternum))
			pagenum = 1 #Chapter page number
			booktxt = None
			chaptername = None
			with open("rawchapters/Chapter" + str(f), 'r', encoding='utf8') as book:
				chaptername = book.readline().strip()
				booktxt = book.read().replace('\x0c', '\n').replace(u'\xa0', " ")#Read book and remove page breaks
			pos = 0#Character position in text of chapter
			while pos + pagesize < len(booktxt):
				end = pagesize
				while booktxt[pos + end] != " ":#Page must start in between words
					end -= 1
				self.genpage(pagenum, booktxt[pos:pos + end])
				self.cf.addpage(str(globalpagenum), pagenum, self.chapternum)
				pagenum += 1
				globalpagenum += 1
				pos = pos + end

			if pos != len(booktxt) - 1:#Save last page
				self.genpage(pagenum, booktxt[pos:pos + end])
				self.cf.addpage(str(globalpagenum), pagenum, self.chapternum)
				globalpagenum += 1
			self.cf.addchapter(chaptername, self.chapternum, pagenum)

		self.cf.settotalpages(globalpagenum - 1)
		self.cf.generate()
				

splitter = Page_Generator()
splitter.split(int(sys.argv[1]), int(sys.argv[2]))