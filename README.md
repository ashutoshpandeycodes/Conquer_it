https://conquer-it.onrender.com (use this link to use the web app)

CONQUER IT is an AI-integrated, full-stack web application. It's purpose is to provide users with gamified steps to reach a goal, ensuring the steps are engaging to the user and keep him/her focused.It utilizes a microservice architecture, pairing a vanilla JavaScript and CSS frontend with a robust Python/Flask backend.

1. The Vision and Purpose
   
When we set massive goals like "Learn Cloud Computing" or "Lose 10kg," staring at a 
blank to-do list is intimidating. Traditional productivity apps act as flat ledgers; they do 
not offer structural guidance or psychological momentum. This often results in task 
paralysis, where the goal is abandoned before the first step is even taken. 
I built Conquer It to act as a digital Game Master. The user feeds the application a high
level "Main Quest," and the app uses an AI model (Google Gemini 2.5 Flash) to instantly 
reverse-engineer that goal into a three-tier questline: Level 1: The Awakening 
(Preparation),  
Level 2: The Ascent (The Grind), and Level 3: The Boss Fight (Final Execution). By 
assigning Experience Points (XP) to each tier and utilizing a distraction-free, 
monochrome aesthetic, it tricks the brain into tackling real-world problems by framing 
them as winnable games.

3. Deployment and Security Architecture

The project is fully deployed and accessible via the Render cloud platform. Choosing to 
deploy a full-stack application rather than a simple static site was a critical security and 
architecture decision. The Proxy Pattern for Credential Security a common rookie 
mistake in AI web apps is embedding the API key directly into the frontend JavaScript. If 
done, anyone inspecting the browser's developer tools can steal the key and exhaust 
the developer's quota. To prevent this, I built a Python Flask backend to act as a secure 
proxy. The user's browser communicates strictly with the Flask server. The Flask server 
then securely fetches the API key from Render's hidden environment variables, 
communicates with Google's AI, sanitizes the response, and sends it safely back to the 
user.  
The API credentials never touch the public internet. 
Infrastructure Protection is very important because the application relies on an external 
metered API, it is vulnerable to bot spam. I implemented the Flask-Limiter library on the 
backend to track incoming IP addresses, capping usage to three requests per minute. 
This protects the server from quota exhaustion and ensures stable uptime. 

3. Technology Stack

• Frontend: HTML5, CSS3, and Vanilla JavaScript. I chose pure JavaScript for DOM 
manipulation and asynchronous state handling to keep the application lightweight and 
fast. 

• Backend: Python 3, Flask, and Flask-CORS. Serves as the robust communication 
bridge.

• AI Engine: Google Generative AI SDK (Gemini 2.5 Flash).

• Infrastructure: Gunicorn (Web Server Gateway Interface) and Render for cloud 
hosting.

4. Local Setup Instructions
 
If you wish to run this application locally instead of using the live Render link, please 
follow these steps. You will need Python installed on your machine and a free API key 
from Google 
AI Studio. 
Step 1: Clone the Repository 

git clone https://github.com/your-username/conquer-it.gitcd conquer-it 

Step 2: Install Dependencies 

pip install -r requirements.txt 

Step 3: Configure the API Key 

Open the app.py file in your code editor. Locate the environment variable fetch and 
replace it with your actual API key for local testing. Remember to revert this change 
before committing your code to a public repository. 
api_key = "YOUR_ACTUAL_API_KEY_HERE" 

Step 4: Boot the Server 

Run python app.py 
Once the terminal confirms the server is running on localhost, open your web browser 
to the provided address to interact with the application.
