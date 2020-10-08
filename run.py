from flask import Flask, render_template, request, jsonify
import sqlite3

WEATHERDB = 'weather.db'

app = Flask(__name__)

@app.route('/', methods = ['GET'])
def index():
    continent = request.args.get('cont')
    print(continent)
    return render_template ('index.html')



@app.route('/cont', methods = ['GET'])
def set_continent():

    print(continent)
    #con = sqlite3.connect(WEATHERDB)
    #cur = con.execute('SELECT imglink FROM continents WHERE id =?', continent)
    #imgthingy = cur
    #con.close()

    return jsonify(continent)
