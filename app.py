from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
# Import the limiter
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app)

# Set up the Limiter to track users by their IP address
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per day", "1 per minute"],
    storage_uri="memory://"
)

genai.configure(api_key="AIzaSyCnXgWEpV8U2OcEok0xZ_4V_r0YXL37AW8")
model = genai.GenerativeModel('gemini-2.5-flash')


@app.route('/generate-quest', methods=['POST'])
@limiter.limit("1 per minute")  # Max 1 requests per minute per user
def generate_quest():
    data = request.json
    main_quest = data.get('quest')

    system_prompt = f"""
    You are the Quest Master for a gamified productivity app called 'Conquer It'. 
    The user's main objective is: "{main_quest}"

    Break this objective down into 3 actionable tiers: 
    - Level 1: Beginner prep/easy steps
    - Level 2: Intermediate habits/the grind
    - Level 3: The Boss Fight/Final execution

    Assign an appropriate XP value to each tier. 

    You MUST respond strictly with valid JSON in this exact format:
    [
        {{"level": "Level 1", "title": "Title", "description": "Short desc.", "xp": 100}},
        {{"level": "Level 2", "title": "Title", "description": "Short desc.", "xp": 250}},
        {{"level": "Level 3", "title": "Title", "description": "Short desc.", "xp": 500}}
    ]
    """

    try:
        response = model.generate_content(system_prompt)
        clean_text = response.text.strip().replace('```json', '').replace('```', '')
        quest_data = json.loads(clean_text)
        return jsonify(quest_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# This catches the rate limit error and sends a clean message to the frontend
@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({"error": "You are requesting quests too quickly. Please slow down!"}), 429


if __name__ == '__main__':
    print("⚔️ Conquer It Backend is running on http://localhost:5000")
    app.run(debug=True, port=5000)