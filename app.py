from flask import Flask, render_template, send_from_directory, jsonify, request
from major_rec.recomend import Recomendation


app = Flask(__name__, static_url_path='/templates')

@app.route("/")
def index():
    return send_from_directory("templates", "index.html")

@app.route("/main.css")
def mainCSS():
    return send_from_directory("templates", "main.css")

@app.route("/presetCourses.js")
def presetCoursesJS():
    return send_from_directory("templates", "presetCourses.js")

@app.route("/script.js")
def scriptJS():
    return send_from_directory("templates", "script.js")

@app.route("/getRecommendation", methods=["POST"])
def getRecommendation():
    if (request.json):
        rec = Recomendation(request.json)
        responseData = rec.get_rec()
    else:
        responseData = {}

    #responseData = {
    #    'asdf': 1,
    #    'qwerty': 0.1234
    #}
    
    return jsonify(responseData)

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(port=5000)
