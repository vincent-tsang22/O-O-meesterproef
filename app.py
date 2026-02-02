from flask import Flask, render_template, request

app = Flask(__name__)

@app.context_processor
def inject_request():
    return {'request': request}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/kas')
def kas():
    return render_template('de.kas.html')

@app.route('/verbruik')
def verbruik():
    return render_template('verbruik.html')

@app.route('/duurzaam')
def duurzaam():
    return render_template('duurzaam.html')

@app.route('/dashboard')
def dashboard():
    return render_template('duurzaam.html')

@app.route('/contact')
def contact():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
