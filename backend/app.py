import io
from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import json
from flask_cors import CORS, cross_origin
from llm_model import generate_mcq
import os
import PyPDF2

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate():
    number_of_questions = request.form.get('numMCQs')
    tone = request.form.get('difficulty')
    subject = request.form.get('subject')

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
    pdf_text = ''
        
    for page in pdf_reader.pages:
        pdf_text += page.extract_text() or ''

    quiz = generate_mcq(pdf_text, number_of_questions, subject, tone)
    return jsonify(quiz)

@app.route('/csv', methods=['GET'], endpoint = 'csv')
def csv():
    csv_file_path = os.path.join(os.path.dirname(__file__), 'machinelearning.csv')

    return send_from_directory(directory=os.path.dirname(csv_file_path),
                               path=os.path.basename(csv_file_path),
                               as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)