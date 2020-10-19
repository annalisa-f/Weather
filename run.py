from flask import Flask, render_template, request, jsonify
import sqlite3

WEATHERDB = 'weather.db'

app = Flask(__name__)

@app.route('/')
def index():

    con = sqlite3.connect(WEATHERDB)

    allXY = []
    cur = con.execute('SELECT id, x, y FROM weathers')

    for i in cur:
        allXY.append(i)


    con.close()

    return render_template ('index.html', allXY=allXY)



@app.route('/allinfo', methods=['POST'])
def allinfo():

    entry = request.json
    cityinfo = []

    con = sqlite3.connect(WEATHERDB)
    cur = con.execute('SELECT city, summeravg, winteravg, rainfall, snow FROM weathers WHERE id = ?', [entry])

    cityinfo = cur.fetchone()
    print(cityinfo)

    con.close()


    return jsonify(cityinfo)

@app.route('/continent', methods=['POST'])
def continent():

    entry = request.json
    gsapinfo = []

    con = sqlite3.connect(WEATHERDB)
    cur = con.execute('SELECT x, y, scale FROM continents WHERE id = ?', [entry])

    gsapinfo = cur.fetchone()

    con.close()


    return jsonify(gsapinfo)
