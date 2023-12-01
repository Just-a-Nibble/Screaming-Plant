
from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route("/")
def route_index():
    return route_catchall("index.html")

@app.route("/<path:path>")
def route_catchall(path: str):
    return send_from_directory("static", path)

