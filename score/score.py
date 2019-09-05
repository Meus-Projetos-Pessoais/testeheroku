import random
import json
import datetime
from json import dumps


def main():
    score = random.randint(1,999)
    #print(score)
    dateDaConsulta = str(datetime.datetime.now())
    
    return print(json.dumps({'Score': score, 'Data': dateDaConsulta}))

#start process
if __name__ == '__main__':
    main()


