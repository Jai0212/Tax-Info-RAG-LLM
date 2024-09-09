# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from run_llm import query_rag

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Python Backend '

@app.route('/generate_text', methods=['GET'])
def generate_text():
    query_text = request.args.get('question')
    generated_text = query_rag(query_text)
    return jsonify({'text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)
