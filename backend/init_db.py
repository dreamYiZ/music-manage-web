import sqlite3
import os


def init_db():
    
    
    path = "../music"
    # Check whether the specified path exists or not
    isExist = os.path.exists(path)
    if not isExist:
        # Create a new directory because it does not exist
        os.makedirs(path)
        print("The new directory is created!")
        
        
    os.remove("database.db")
    f = open("database.db", "x")
    f.close()    
    connection = sqlite3.connect('database.db')


    with open('schema.sql') as f:
        connection.executescript(f.read())

    cur = connection.cursor()

    cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
                ('First Post', 'Content for the first post')
                )

    cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
                ('Second Post', 'Content for the second post')
                )
    
    
    cur.execute("INSERT INTO folder_path (fpath) VALUES (?)",
                ('/music',)
                )

    connection.commit()
    connection.close()