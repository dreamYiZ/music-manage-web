import sqlite3
from flask import Flask, jsonify, send_from_directory
from init_db import init_db
import _db
import os
import urllib
import util


MUSIC_FOLDER = '/music'


app = Flask(__name__)

app.config['MUSIC_FOLDER'] = MUSIC_FOLDER







@app.route('/')
def hello():
    return 'music management'



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
    _fpath = app.config["MUSIC_FOLDER"];
    
    dir_list = list(filter( lambda x: 'mp3' in x, os.listdir(_fpath)))
    # dir_list = os.listdir(_fpath)
    return {
        'err': '0',
        'msg': 'scans-folder',
        'data': dir_list,
        '_fpath': _fpath,
    }


@app.route('/rename')
def rename():
    _fpath = app.config["MUSIC_FOLDER"];
    dir_list = os.listdir(_fpath)
    for file in dir_list:
        if "DS_Store" in file:
            continue
        
        old_file = os.path.join(app.config["MUSIC_FOLDER"], file)
        new_file = os.path.join(app.config["MUSIC_FOLDER"], util.better_filename(file).replace('mp3', '.mp3'))
        os.rename(old_file, new_file)
     
    return {
        'err': '0',
        'msg': 'rename files',
    }



@app.route('/delete/<name>')
def delete_file(name):
    decode_name = urllib.parse.unquote_plus(name)
     
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
    
    decode_name = urllib.parse.unquote_plus(name)
    return send_from_directory(app.config["MUSIC_FOLDER"], decode_name)





if __name__ in "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
