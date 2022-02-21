import os
import sys
import json

#Usage: py splitter.py charsize
pagedir = "public/book/pages/"
#Charsize: Size of page in characters
def split(charsize):
	config = {}
	config["book"] = []
	config["pages"] = {}
	#Clean any existing pages
	for f in os.listdir(pagedir):
		for f1 in os.listdir(pagedir + str(f)):
			os.remove(pagedir + str(f) + "/" + str(f1))
		os.rmdir(pagedir + f)
	globalpagenum = 1 #Book page number
	for f in range(1, 52):#Generate chapter
		chapternum = f
		os.mkdir(pagedir + str(chapternum))
		pagenum = 1 #Chapter page number
		booktxt = None
		chaptername = None
		with open("rawchapters/Chapter" + str(f), 'r', encoding='utf8') as book:
			chaptername = book.readline().strip()
			booktxt = book.read().replace('\x0c', '\n')#Read book and remove page breaks
		pos = 0#Character position in text of chapter
		while pos + charsize < len(booktxt):
			end = charsize
			
			while booktxt[pos + end] != " ":#Page must start in between words
				end -= 1
			with open(pagedir + str(chapternum) + "/" + str(pagenum) + ".txt", 'w') as page:#Save a page
				txt = ""
				if pagenum == 1:
					txt = "     "
				if booktxt[pos] == " ":
					txt += booktxt[pos:pos + end].replace("\n", "\n     ") #Remove leading space
				else:
					txt += booktxt[pos:pos + end].replace("\n", "\n     ") #No leading space
				page.write(txt)
			config["pages"][str(globalpagenum)] = {"page":pagenum, "chapter":chapternum}
			pagenum += 1
			globalpagenum += 1
			pos = pos + end

		if pos != len(booktxt) - 1:#Save last page
			with open(pagedir + str(chapternum) + "/" + str(pagenum) + ".txt", 'w') as page:
				if booktxt[pos] == " ":
					page.write(booktxt[pos + 1:len(booktxt)])
				else:
					page.write(booktxt[pos:len(booktxt)])
			config["pages"][str(globalpagenum)] = {"page":pagenum, "chapter":chapternum}
			globalpagenum += 1
		config["book"].append({"chapter":chapternum, "title":chaptername, "pages":pagenum})

	config["totalPages"] = globalpagenum - 1
	with open("public/book/config.json", 'w') as configf:
		json.dump(config, configf)
				

split(int(sys.argv[1]))