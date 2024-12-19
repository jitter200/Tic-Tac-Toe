from flask import Flask, request, json
from flask_cors import CORS

app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app)

results = []

@app.route('/')
def index():
    
    return app.send_static_file('index.html')

@app.route('/save_result', methods=['POST'])
def save_result():
    data = request.get_json()
    winner = data.get('winner', 'unknown')
    results.append(winner)
    print("Сохранён результат:", winner)
    return json.dumps({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True)
