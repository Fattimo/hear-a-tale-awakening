import os
import sys
import json


class Page_Generator():
	def __init__(self) -> None:
		self.tab = "     "
		self.paragraphbreak = "\n"
		self.linebreak = "\n"
		self.pagedir = "public/book/pages/"
		self.chapternum = 0

	def genpage(self, pagenum, rawtext, linesize):
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
			counter = 0
			while linepos < len(txt):
				if counter >= linesize and txt[linepos] == " ":
					txt = txt[:linepos] + self.linebreak + txt[linepos + 1:]
				if txt[linepos] == self.linebreak or txt[linepos] == self.paragraphbreak:
					counter = 0
				linepos += 1
				counter += 1
			page.write(txt)
	
	#Usage: py splitter.py pagesize
	#pagesize: Size of page in characters
	def split(self, pagesize, linesize):
		config = {}
		config["book"] = []
		config["pages"] = {}
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
				booktxt = book.read().replace('\x0c', '\n')#Read book and remove page breaks
			pos = 0#Character position in text of chapter
			while pos + pagesize < len(booktxt):
				end = pagesize
				while booktxt[pos + end] != " ":#Page must start in between words
					end -= 1
				self.genpage(pagenum, booktxt[pos:pos + end], linesize)
				config["pages"][str(globalpagenum)] = {"page":pagenum, "chapter":self.chapternum}
				pagenum += 1
				globalpagenum += 1
				pos = pos + end

			if pos != len(booktxt) - 1:#Save last page
				self.genpage(pagenum, booktxt[pos:pos + end], linesize)
					
				config["pages"][str(globalpagenum)] = {"page":pagenum, "chapter":self.chapternum}
				globalpagenum += 1
			config["book"].append({"chapter":self.chapternum, "title":chaptername, "pages":pagenum})

		config["totalPages"] = globalpagenum - 1
		with open("public/book/config.json", 'w') as configf:
			json.dump(config, configf)
				

splitter = Page_Generator()
splitter.split(int(sys.argv[1]), int(sys.argv[2]))