from flask import Flask, request, jsonify
import json
import torch
from flask_cors import CORS
# Import your chatbot logic here
from model import NeuralNet
import random
from data import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# Load the chatbot data and model
# Replace these lines with your actual data and model loading code
with open('data.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

# ... Rest of the model loading and setup ...
FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]



model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()



@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json['input']
    
    # Process user input and get chatbot response
    # Use the chatbot logic from your chat.py here
    sentence = tokenize(user_input)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                response = random.choice(intent['responses'])
    else:
        response = "I do not understand..."

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
