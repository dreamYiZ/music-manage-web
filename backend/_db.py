import sqlite3

def getDb():
    connection = sqlite3.connect('database.db')
    return connection


def get_folder_path():    
    connection = getDb()
    cur = connection.cursor()

    cur.execute("SELECT id, created, fpath FROM folder_path;")
    
    connection.commit()
    rows = cur.fetchall()

    connection.close()
    
    values = []
    for element in rows:
        values.append({
            'id': element[0],
            'created': element[1],
            'fpath': element[2]
        })
    return values