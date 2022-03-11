import os
from pdb import line_prefix
import sys
import json
# screen width: 750.49px
# responsive px width = 1083px
charsizes2 = {'a': 10.38, 'b': 11.39, 'c': 9.39, 'd': 11.43, 'e': 10.21, 'f': 6.01, 'g': 10.38,
	'h': 11.2, 'i': 5.08, 'j': 5.08, 'k': 10.19, 'l': 5.25, 'm': 17.06, 'n':11.26, 'o': 11.16, 'p':11.43,
	'q': 11.43, 'r': 7.15, 's': 8.63, 't': 6.96, 'u': 11.2, 'v': 9.61, 'w': 14.8, 'x': 9.19, 'y': 9.61, 
	'z': 8.75, 'A': 11.18, 'B': 12.1, 'C':11.76, 'D': 12.67, 'E': 10.85, 'F':10.17, 'G': 12.7, 'H': 13.43,
	'I': 5.42, 'J': 9.86, 'K': 11.92, 'L': 10.01, 'M': 14.97, 'N': 13.32, 'O': 13.67, 'P': 11.66, 'Q': 13.67,
	'R': 11.72, 'S': 11, 'T': 11.03, 'U': 13.28, 'V': 10.6, 'W': 16.18, 'X': 10.56, 'Y': 9.8, 'Z': 11.09, ' ': 4.12,
	',': 5.13, ':': 5.13, '“': 8.77, '-': 6.41, '!': 5.95, '’': 5.13, '”': 8.77, '\n':1000000, '.': 5.13,
	';': 5.13, 'ê': 10.21, 'è': 10.21, '—': 16.47, '?': 8.75, 'ç': 9.39, 'é': 10.21, '1': 10.23, '8': 10.23, '4': 10.23,
	'0': 10.23, 'ô': 11.16, 'ï': 5.08, 'î': 5.08, '(': 6.24, ')': 6.24, 'à': 10.38, '‘': 5.13}

missing = set()
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
		self.paragraphbreak = "\n"
		self.linebreak = " "
		self.pagedir = "public/book/pages/"
		self.chapternum = 0
		self.cf = Config()
		self.maxlength = 750.49

	def genpage(self, pagenum, onparagraph, text, pos, size):
		with open(self.pagedir + str(self.chapternum) + "/" + str(pagenum) + ".txt", 'w', encoding='utf8') as page:#Save a page
			txt = ""
			initpos = pos
			if not onparagraph:
				txt = "&ni; "
				sumline = 0#indent
			else:
				sumline = 14.259#indent
			if text[pos] == " ":
				pos += 1
				#txt += rawtext[1:].replace("\n", self.paragraphbreak) #Remove leading space
			#else:
			#	txt += rawtext.replace("\n", self.paragraphbreak) #No leading space
			#Split into lines
			linepos = 0
			lineno = 0
			while pos + linepos < len(text):
				if text[pos + linepos] in charsizes2:
					sumline += charsizes2[text[pos + linepos]]
				else:
					if text[pos + linepos] not in missing:
						missing.add(text[pos + linepos])
						print(text[pos + linepos])
					sumline += 1/34 #Upper bound for now
				if text[pos + linepos] == "\n":
					lineno = 0
					sumline = 14.259
				
				if sumline >= self.maxlength or (linepos >= size and sumline >= 0.99 * self.maxlength):
					while (text[pos + linepos] != " " and text[pos + linepos] != "\n") or sumline >= self.maxlength:
						sumline -= charsizes2[text[pos + linepos]]
						linepos -= 1
					lineno += 1
					#if text[pos + linepos] != "\n":
					#	txt = txt[:linepos] + self.linebreak + txt[linepos + 1:]
					sumline = 0
					if linepos >= size:
						break

				linepos += 1
			nextonparagraph = True
			txt += text[initpos:pos+linepos]
			if txt[len(txt) - 1] != '\n':
				txt += " &jl;"
				nextonparagraph = False
			page.write(txt)
			return nextonparagraph, linepos
	
	#pagesize: Size of page in characters
	def split(self, pagesize):
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
			onparagraph = True
			while pos + pagesize < len(booktxt):
				onparagraph, end = self.genpage(pagenum, onparagraph, booktxt, pos, pagesize) #self.genpage((pagenum, booktxt[pos:pos + end], onparagraph))
				self.cf.addpage(str(globalpagenum), pagenum, self.chapternum)
				pagenum += 1
				globalpagenum += 1
				pos = pos + end
				if booktxt[pos] != ' ' and booktxt[pos] != "\n":
					pos += 1

			if pos != len(booktxt) - 1:#Save last page
				self.genpage(pagenum, onparagraph, booktxt, pos, len(booktxt) - pos)
				self.cf.addpage(str(globalpagenum), pagenum, self.chapternum)
				globalpagenum += 1
			self.cf.addchapter(chaptername, self.chapternum, pagenum)

		self.cf.settotalpages(globalpagenum - 1)
		self.cf.generate()
				

splitter = Page_Generator()
splitter.split(int(sys.argv[1]))