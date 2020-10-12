from flask import Flask, render_template, request, jsonify
import sqlite3

WEATHERDB = 'weather.db'

app = Flask(__name__)

@app.route('/')
def index():

    return render_template ('index.html')



@app.route('/continent', methods=['POST'])
def scores_list():

    entry = request.json

    con = sqlite3.connect(WEATHERDB)
    cur = con.execute('SELECT imglink FROM continents WHERE id = ?', [entry])

    imgUrl = cur.fetchone()

    con.close()


    return jsonify(imgUrl)
