from flask import Flask, request, jsonify
from flask_cors import CORS
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv
from groq import Groq
import markdown2
import re
from docx import Document

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Groq client
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


##############################################
## Webscrap Content ##
# Read the contents of the .txt and .docx file
def read_file(file_path):
    try:
        if file_path.endswith('.txt'):
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
        elif file_path.endswith('.docx'):
            doc = Document(file_path)
            content = '\n'.join([para.text for para in doc.paragraphs])
        else:
            raise ValueError("Unsupported file format. Only .txt and .docx are allowed.")
        
        print(f"{file_path} loaded successfully.")
        return content
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return ""

# Example usage
file_path = 'BUDGET2025.txt'  # Change to 'output.txt' for a text file
output_content = read_file(file_path)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400
        
        message = request.json.get("message")
        if not message:
            return jsonify({"error": "No message provided"}), 400
        
        # Debugging information
        print(f"Received message: {message}")
        
        # Search output.txt for relevant information
        output_info = output_content

        # Prepare the messages for the API call
        messages = [
            {
                "role": "system",
                "content": (
                    """You are ConsoAI, an advanced AI assistant with expertise in chartered accountancy, taxation, finance, legal matters, and business consultancy.
                    Your goal is to provide comprehensive, clear, and accessible responses that demonstrate deep knowledge in these fields.
                    1.When addressing queries, ensure to: - Use terminology appropriate for both professionals and laypersons.- Provide explanations and examples to clarify complex concepts.- Incorporate current regulations and practices based on data up to January 2024.
                    2.The currency format should be Rupees always and output should be based on Indian Context.
                    3.Structure your responses as follows: - Begin with a brief summary of the main point.- Follow with a detailed explanation, including relevant laws, principles, or financial practices.- Conclude with practical advice or recommendations where applicable.
                    4.Always verify that the information shared is accurate and relevant to the user’s context, adapting your response based on the complexity of the question.
                    5.Maintain a professional yet approachable tone, ensuring that users feel comfortable asking follow-up questions or for further clarification.
                    6.If a query falls outside your expertise, acknowledge it and suggest alternative sources or approaches to obtain the needed information.By adhering to these guidelines, you will enhance the quality of your interactions and become a trusted resource in chartered accountancy and related fields."""
                )
            }
        ]

        # Add relevant content from output.txt (if found) or notify the assistant
        if output_info:
            messages.append({"role": "user", 
                             "content": f"The following information is from a trusted source:\n{output_info}\n\nUsing this, answer the query: {message}"})
        else:
            messages.append({"role": "user", 
                             "content": f"No relevant information was found in the trusted source for the query: {message}.\nAnswer based on your knowledge."})
        
        # Create chat completion using Groq client
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
            temperature=0.5,
            max_tokens=3000
        )
        
        # Extract and return the assistant's reply
        response = chat_completion.choices[0].message.content
        
        # Convert Markdown to HTML
        response_html = markdown2.markdown(response)
        return jsonify({"response": response_html})
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    api_key_status = bool(os.environ.get("GROQ_API_KEY"))
    return jsonify({
        "status": "healthy",
        "api_key_configured": api_key_status,
        "model": "llama-3.3-70b-versatile"
    }), 200



# In production, Gunicorn will use `create_app()` to run the application
if __name__ == "__main__":
    # This is for local development, use Gunicorn in production
    app.run()
