import os
import sys
import json

#Usage: py splitter.py charsize
pagedir = "public/book/pages/"
#Charsize: Size of page in characters
def split(charsize):
	#Clean any existing pages
	for f in os.listdir(pagedir):
		for f1 in os.listdir(pagedir + str(f)):
			os.remove(pagedir + str(f) + "/" + str(f1))
		os.rmdir(pagedir + f)

	for f in os.listdir("rawchapters"):#Generate chapter
		chapternum = str(f)[7:]#Pull number from file name
		os.mkdir(pagedir + str(chapternum))
		globalpagenum = 1 #Book page number
		pagenum = 1 #Chapter page number
		booktxt = None
		chaptername = None
		with open("rawchapters/" + f, 'r', encoding='utf8') as book:
			chaptername = book.readline().strip()
			booktxt = book.read().strip().replace('\x0c', '')#Read book and remove page breaks
		pos = 0#Character position in text of chapter
		while pos + charsize < len(booktxt):
			end = charsize
			while booktxt[pos + end] != " ":#Page must start in between words
				end -= 1
			with open(pagedir + str(chapternum) + "/" + str(pagenum) + ".txt", 'w') as page:#Save a page
				if booktxt[pos] == " ":
					page.write(booktxt[pos + 1:pos + end]) #Remove leading space
				else:
					page.write(booktxt[pos:pos + end]) #No leading space
			pagenum += 1
			pos = pos + end

		if pos != len(booktxt) - 1:#Save last page
			with open(pagedir + str(chapternum) + "/" + str(pagenum) + ".txt", 'w') as page:
				if booktxt[pos] == " ":
					page.write(booktxt[pos + 1:len(booktxt)])
				else:
					page.write(booktxt[pos:len(booktxt)])
				

split(int(sys.argv[1]))