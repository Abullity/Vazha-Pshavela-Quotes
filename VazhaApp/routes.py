import sqlite3
import json
from VazhaApp import app
from flask import request, render_template, url_for, redirect


@app.route('/', methods=['POST', 'GET'])
def index():
	with sqlite3.connect('VazhaApp/quotes.db') as con:
		db = con.cursor()
		quotes = db.execute("""SELECT quotes.id, quote, title FROM quotes 
		JOIN works ON quotes.work_id = works.id;""").fetchall()
	return render_template('index.html', quotes=quotes)
	
	
@app.route('/add', methods=['POST'])
def add():
	quote = request.form.get('input-quote')
	work = request.form.get('input-work')
	if not quote or not work:
		return redirect('/')
	work = work.strip()
	quote = quote.strip()
	with sqlite3.connect('VazhaApp/quotes.db') as con:	
		db = con.cursor()
		db.execute("INSERT OR IGNORE INTO works (title) VALUES (?);", (work,))
		work_id = db.execute("SELECT id FROM works WHERE title = (?);", (work,)).fetchone()[0]
		db.execute("INSERT INTO quotes (work_id, quote) VALUES (?, ?);", (work_id, quote))
		con.commit()
	return redirect('/')
	
	
@app.route('/main-quote')	
def main_quote():
	with sqlite3.connect('VazhaApp/quotes.db') as con:	
		db = con.cursor()
		quote = db.execute("""SELECT quotes.id, quote, title FROM quotes 
		JOIN works ON quotes.work_id = works.id
		ORDER BY random() LIMIT 1;""").fetchone()
	data = json.dumps(quote, ensure_ascii=False)
	return data
	
	
