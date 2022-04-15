import os
import re

#Find each phrase in phrases in the book and replace spaces with &fr
def findandformatfrench(phrases):
    frenchphrases = []
    for phrase in phrases:
        if " " in phrase.strip():
            frenchphrases.append(phrase.strip())
    for i in range(1, 40):
        dir = f"../public/book/pages/{i}/"
        files = os.listdir(dir)
        for file in files:
            text = None
            with open(dir + str(file), 'r', encoding='utf8') as f:
                text = f.read()
                for phrase in frenchphrases:
                    offset = 0
                    positions = [f.start() for f in re.finditer(phrase, text)]
                    for pos in positions:
                        text = text[:pos + offset] + phrase.replace(" ", "&fr") + text[pos+len(phrase) + offset:]
                        offset += 2
            with open(dir + str(file), 'w', encoding='utf8') as f:
                f.write(text)

    
