from flask import Flask, request, jsonify
import numpy as np
import json
from flask_cors import CORS, cross_origin
from llm_model import generate_mcq

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
@cross_origin
def upload_pdf():
    return

if __name__ == '__main__':
    app.run(debug=True)