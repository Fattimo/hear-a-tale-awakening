import pymongo
import sys
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
    with open("../.env", 'r') as env:
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
docs = []
with open("rawdefinitions/names.txt", 'r', encoding='utf8') as names: #Name definitions
    for i in names.read().split(","):
        i = i.strip().replace(" ", "")
        docs.append({"words": [i.lower()], "definition": "A name", "first_letter": i.lower()[0]})

with open("rawdefinitions/definitions1.txt", 'r', encoding='utf8') as defs:#Words
    lines = defs.readlines()
    doc = {}
    s = set()
    for line in lines:
        l = line.strip()
        if l == "":
            continue
        if '=' in l:
            s = set()
            if doc != {}:
                docs.append(doc)
            doc = {"words": [], "definition": "", "first_letter": ""}
            pos = l.index('=')
            word = l[:pos-1].lower()
            if word not in s:
                doc["words"].append(word)
                s.add(word)
            doc["definition"] = l[pos+2:]
            doc["first_letter"] = l[0].lower()
        else:
            word = l.lower()
            if word not in s:
                doc["words"].append(word)
                s.add(word)
    docs.append(doc)

        
col.insert_many(docs)
col.create_index([("first_letter", pymongo.ASCENDING)])
col.create_index([("words", pymongo.ASCENDING)])