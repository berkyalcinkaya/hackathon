from flask import Flask, render_template, send_from_directory


app = Flask(__name__, static_url_path='/templates')

@app.route('/templates/<path:path>')
def index(path):
    return send_from_directory('templates', path)

@app.route("/")
def start():
    return send_from_directory("templates", "index.html")

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)