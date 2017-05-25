from flask import Flask, render_template, redirect
from urllib import urlopen
app = Flask(__name__)


@app.route('/')
def main():
    return render_template("index.html")


@app.route('/room')
def room():
    return render_template("room.html")
