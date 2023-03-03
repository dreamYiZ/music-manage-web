import time
import sqlite3
import redis
from flask import Flask, jsonify, send_from_directory
from init_db import init_db
import _db
from pathlib import Path
import pprint
import os
import glob
import urllib


MUSIC_FOLDER = '/music'


app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

app.config['MUSIC_FOLDER'] = MUSIC_FOLDER



def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)




@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been --312? seen {} times.\n'.format(count)




def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/posts')
def posts():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts').fetchall()
    conn.close()
    return jsonify(posts)



@app.route('/init-db')
def init_db_api():
    init_db()
    return {
        'err': '0',
        'msg': 'init db successfully'
    }


@app.route('/get-folder-path')
def get_folder_path():
    fpath = _db.get_folder_path();
    return {
        'err': '0',
        'msg': 'get fpath',
        'data': fpath
    }


@app.route('/scans-folder')
def scan_folder():
    fpath = _db.get_folder_path();
    _fpath = fpath[0]['fpath'];
    
    
    dir_list = os.listdir(_fpath)
    return {
        'err': '0',
        'msg': 'scans-folder',
        'data': dir_list,
        '_fpath': _fpath,
    }


@app.route('/delete/<name>')
def delete_file(name):
    decode_name = urllib.parse.unquote(name)
     
    filepath = os.path.join(app.config["MUSIC_FOLDER"], decode_name)
    # If file exists, delete it.
    if os.path.isfile(filepath):
        os.remove(filepath)
    else:
        # If it fails, inform the user.
        print("Error: %s file not found" % filepath)
    return {
        'err': '0',
        'msg': 'delete file',
        'data': '',
    }




@app.route('/music/<name>')
def download_file(name):
    
    decode_name = urllib.parse.unquote(name)
    return send_from_directory(app.config["MUSIC_FOLDER"], decode_name)





if __name__ in "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
