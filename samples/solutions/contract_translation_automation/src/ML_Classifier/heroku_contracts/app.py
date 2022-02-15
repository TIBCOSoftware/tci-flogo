# your code 
import json
from flask import Flask, request, jsonify
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
import joblib

def Clean(text):
    text=text.split()
    text=[i.lower() for i in text if i.lower() not in stopwords.words('english')]
    text=' '.join(text)
    text=re.sub('[^A-Za-z0-9]+',' ',text)
    text=text.lower()
    return text

def Load_Predict(text):
    tfidf = joblib.load("tfidf_model_contract")
    X_pred = tfidf.transform([text]).todense()
    clf = joblib.load("LR-model-Contract")
    prediction = clf.predict(X_pred)
    return prediction[0]

# create an instance of Flask
app = Flask(__name__)



# Define a post method for our API.
@app.route('/classify', methods=['POST'])
def classify():
    text=request.form['text']
    text = Clean(text)
    prediction = Load_Predict(text)
    payload = {
    'prediction': prediction
    }
    response = jsonify(payload)
    return response


if __name__=="__main__":
    app.run(debug=True)
