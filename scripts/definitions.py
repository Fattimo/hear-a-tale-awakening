import pymongo
import sys
import french
from french import findandformatfrench
import os

testDB = "mongodb://localhost:27017/"
DB = testDB
client = None
prod = False
if len(sys.argv) >= 2:
    for i in sys.argv:
        if i == "-prod":
            prod = True
if prod:
    print("Production")
    env = None
    if os.path.exists("../.env.local"):
        env = "../.env.local"
    elif os.path.exists("../.env"):
        env = "../.env"
    else:
        sys.exit(".env not found")
    with open(env, 'r') as env:
        lines = env.readlines()
        for line in lines:
            if line[:8] == "MONGO_DB":
                auth = line[9:].strip()
                client = pymongo.MongoClient(auth)
else:
    client = pymongo.MongoClient(DB)


db = client["awakening"]
col = db["definitions"]
col.delete_many({})#Clear database

docs = [] #List of documents
with open("rawdefinitions/names.txt", 'r', encoding='utf8') as names: #Name definitions
    for i in names.read().split(","):
        i = i.strip().replace(" ", "")
        docs.append({"words": [i.lower()], "definition": "A name", "first_letter": i.lower()[0]})

words = set()
position = {}#Maps each word to index in docs of its document

#Check if document is duplicate of words already defined
#If it is, delete the old definition and use this one
#Otherwise add normally to docs
#This is responsible for adding a document to output, so don't remove
def dupcheck(doc):
    if doc != {}:
        exists = False
        pos = 0
        for i in doc["words"]:
            if i in position:#If already mapped
                exists = True
                pos = position[i]
        if not exists: #If new
            for i in doc["words"]:
                position[i] = len(docs) 
            docs.append(doc)
        else: #Is already defined
            for i in doc["words"]:
                position[i] = pos
            docs[pos] = doc

with open("rawdefinitions/definitions1.txt", 'r', encoding='utf8') as defs:#Words
    lines = defs.readlines()
    doc = {}
    s = set()
    for line in lines:
        l = line.strip()
        if l == "":
            continue

        if '=' in l:#Definition found
            s = set()
            dupcheck(doc) #Only check on a new document

            doc = {"words": [], "definition": "", "first_letter": ""}
            pos = l.index('=')
            word = l[:pos-1].strip().lower()# Do not include '=' or space in definition
            if word not in s:# Some words are listed twice in definition - Don't add twice
                doc["words"].append(word)
                s.add(word)
            if "(" in l:#Are there words in parentheses at the end?
                p2 = l.index("(")
                doc["definition"] = l[pos+1:p2].strip()#Do not include leading or trailing spaces
                doc["related"] = l[p2-1:] #Include trailing space as these will be concatenated for display
                smpos = len(l)
                if ';' in l[p2+1:]:
                    smpos = l[p2+1:].index(';')#We do not want to associate words after semicolon

                for w2 in l[p2+1:p2+1+smpos].split(","): #Associate with words in parentheses
                    w2 = w2.replace(')', '')
                    w2 = w2.strip()
                    if w2 != "" and w2 not in s:
                        doc["words"].append(w2)
                        s.add(w2)
            else:
                doc["definition"] = l[pos+1:].strip()#Do not include leading spaces
                doc["related"] = ""
            doc["first_letter"] = l[0].lower()
        else:#Equivalent word listed on the next line
            word = l.lower()
            if word not in s:
                doc["words"].append(word)
                s.add(word)
                
    dupcheck(doc)

frenchphrases = []
with open("rawdefinitions/french.txt", 'r', encoding='utf8') as defs:#Words
    lines = defs.readlines()
    doc = {}
    s = set()
    for line in lines:
        l = line.strip()
        if l == "":
            continue

        if '=' in l:#Definition found
            s = set()
            dupcheck(doc) #Only check on a new document

            doc = {"words": [], "definition": "", "french": True}
            pos = l.index('=')
            word = l[:pos].strip().lower()# Do not include '=' or space in definition
            if word not in s:# Some words are listed twice in definition - Don't add twice
                doc["words"].append(word)
                s.add(word)
                frenchphrases.append(word)
            if '=' in l[pos+1:]: #This definition has associated audio
                pos2 = l[pos+1:].index('=')
                doc["definition"] = l[pos+1:pos+1+pos2].strip()
                doc["audio"] = l[pos+pos2+2:].strip()
            else:
                doc["definition"] = l[pos+1:].strip()
                
    dupcheck(doc)
        
col.insert_many(docs)
col.create_index([("first_letter", pymongo.ASCENDING)])
col.create_index([("words", pymongo.ASCENDING)])

findandformatfrench(frenchphrases)