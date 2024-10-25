import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from difflib import get_close_matches
import re

app = Flask(__name__)

genai.configure(api_key='AIzaSyB6yPQak9P6lrUdVJ0UV8adosGtk23ShNU')
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

def is_greeting(message):
    greetings = ['hi', 'hello', 'hey', 'hola', 'good morning', 'good afternoon', 'good evening']
    return any(greeting in message.lower() for greeting in greetings)

def is_relevant_topic(message):
    relevant_topics = {
        'mental_health': ['mental', 'wellness', 'health', 'sad', 'depressed', 'depression', 'anxiety', 'anxious', 'stress', 'stressed',
                          'burden', 'overwhelmed', 'lonely', 'alone', 'hopeless', 'panic', 'trauma', 'ptsd', 'ocd', 'bipolar', 
                          'schizophrenia', 'eating disorder', 'anorexia', 'bulimia', 'self-harm', 'cutting', 'suicidal', 'suicide', 
                          'kill myself', 'end my life', 'die', 'therapy', 'counseling', 'medication', 'coping', 'mindfulness', 
                          'relaxation', 'support group', 'crisis', 'recovery', 'resilience', 'self-care', 'emotional', 'feelings',
                          'mood', 'upset', 'angry', 'fear', 'scared', 'worry', 'hurt', 'pain', 'tired', 'exhausted', 'numb',
                          'harm', 'violent', 'aggression', 'rage', 'outburst', 'fight', 'attack', 'hurt others', 'dangerous',
                          'grief', 'loss', 'bereavement', 'mourning', 'addiction', 'substance abuse', 'alcoholism', 'drug abuse',
                          'insomnia', 'sleep problems', 'nightmares', 'flashbacks', 'dissociation', 'paranoia', 'hallucinations',
                          'mania', 'hypomania', 'mood swings', 'irritability', 'impulsivity', 'self-esteem', 'body image',
                          'perfectionism', 'obsessive thoughts', 'compulsions', 'phobias', 'panic attacks', 'agoraphobia',
                          'social anxiety', 'generalized anxiety', 'burnout', 'compassion fatigue', 'seasonal affective disorder', 'nervous breakdown','nervous','bully','bullied'],
        'sexual_wellbeing': ['sex', 'sexual', 'sexuality', 'health', 'safe sex', 'protection', 'condom', 'birth control', 'pill',
                             'std', 'sti', 'disease', 'infection', 'reproductive', 'pregnancy', 'pregnant', 'abortion',
                             'pleasure', 'consent', 'education', 'dysfunction', 'libido', 'drive', 'intimacy', 'intimate',
                             'orientation', 'identity', 'expression', 'body', 'image', 'confidence', 'communication',
                             'virginity', 'masturbation', 'orgasm', 'foreplay', 'kink', 'fetish', 'porn', 'pornography',
                             'contraception', 'family planning', 'menstruation', 'period', 'menopause', 'erectile dysfunction',
                             'premature ejaculation', 'vaginismus', 'dyspareunia', 'lubrication', 'arousal', 'desire',
                             'sexual trauma', 'sexual abuse', 'sexual assault', 'rape', 'consent violation', 'boundaries',
                             'sexting', 'online dating', 'hookup culture', 'polyamory', 'open relationships', 'swinging',
                             'BDSM', 'dominance', 'submission', 'sadomasochism', 'fetishism', 'exhibitionism', 'voyeurism',
                             'sex toys', 'sex education', 'puberty', 'sexual development', 'sexual health screening',
                             'pap smear', 'mammogram', 'prostate exam', 'testicular self-exam', 'breast self-exam'],
        'lgbtq': ['lgbtq', 'lgbt', 'lgbtqia', 'queer', 'gay', 'lesbian', 'bi', 'bisexual', 'trans', 'transgender', 
                  'non-binary', 'enby', 'genderqueer', 'pan', 'pansexual', 'ace', 'asexual', 'aromantic', 'intersex', 
                  'ally', 'coming out', 'closeted', 'pride', 'gender', 'pronouns', 'chosen family', 'community', 
                  'rights', 'discrimination', 'inclusive', 'inclusivity', 'phobia', 'homophobia', 'transphobia',
                  'biphobia', 'acephobia', 'heteronormativity', 'cisnormativity', 'gender expression', 'gender identity',
                  'gender dysphoria', 'gender euphoria', 'transition', 'hormone therapy', 'top surgery', 'bottom surgery',
                  'deadname', 'chosen name', 'misgendering', 'gender-affirming care', 'drag', 'drag queen', 'drag king',
                  'two-spirit', 'androgynous', 'genderfluid', 'agender', 'demisexual', 'graysexual', 'polyamorous',
                  'queerplatonic', 'same-sex marriage', 'civil union', 'domestic partnership', 'rainbow family',
                  'surrogacy', 'adoption', 'fostering', 'queer theory', 'intersectionality', 'pink triangle',
                  'rainbow flag', 'pride parade', 'safe space', 'out', 'stealth', 'questioning', 'queer-coding']
    }
    
    def fuzzy_match(word, keywords):
        matches = get_close_matches(word, keywords, n=1, cutoff=0.8)
        return bool(matches)
    
    lowered_message = message.lower()
    words = lowered_message.split()
    
    for topic, keywords in relevant_topics.items():
        if any(fuzzy_match(word, keywords) for word in words):
            return topic
    
    return None

def preprocess_input(message):
    message = re.sub(r'\s+', ' ', message).strip()
    return message

def get_initial_response():
    return "Hello! I'm here to listen and offer simple, caring advice about mental wellness, sexual wellbeing, or LGBTQ+ topics. What's on your mind?"


def get_followup_response(message):
    global chat
    topic = is_relevant_topic(message)

    try:
        context = "\n".join([f"{'User' if i%2==0 else 'Assistant'}: {msg.parts[0].text}" for i, msg in enumerate(chat.history)])
        context += f"\nUser: {message}\nAssistant:"

        if topic == 'mental_health':
            prompt = (
                f"{context}\n"
            )
        elif topic == 'sexual_wellbeing':
            prompt = (
                f"{context}\n"
            )
        elif topic == 'lgbtq':
            prompt = (
                f"{context}\n"
            )
        else:
            prompt = (
                f"{context}\n"
            )
        
        response = chat.send_message(prompt)
        
        refined_response = response.text.replace("*", "").replace("**", "").strip()
        return refined_response

    except Exception as e:
        print(f"Error processing message: {str(e)}")
        return (
            "I apologize, but I'm having trouble processing your message. Could you please rephrase or provide more details? "
            "Remember, I'm here to listen and help with topics related to mental health, sexual wellbeing, or LGBTQ+ issues."
        )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat_response():
    global chat
    prompt = preprocess_input(request.json['message'])
    if is_greeting(prompt):
        response_text = get_initial_response()
    else:
        response_text = get_followup_response(prompt)
    return jsonify({'response': response_text})

@app.route('/end_chat', methods=['POST'])
def end_chat():
    global chat
    chat = model.start_chat(history=[])
    return jsonify({'response': 'Chat ended. A new conversation has been started.'})

if __name__ == '__main__':
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    with open('templates/index.html', 'w') as f:
        f.write('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wellness Info Chat</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f4f8;
            padding: 20px;
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        .chat-container {
            width: 100%;
            max-width: 800px;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        #chat-messages {
            height: 60vh;
            overflow-y: auto;
            padding: 30px;
        }
        .message {
            margin-bottom: 15px;
            padding: 12px 15px;
            border-radius: 20px;
            max-width: 80%;
            line-height: 1.4;
            word-wrap: break-word;
        }
        .user-message {
            background-color: #3498db;
            color: white;
            align-self: flex-end;
            margin-left: auto;
        }
        .bot-message {
            background-color: #ecf0f1;
            color: #34495e;
        }
        .input-area {
            display: flex;
            padding: 20px;
            background-color: #f8f9fa;
            border-top: 1px solid #e0e0e0;
        }
        #user-input {
            flex-grow: 1;
            padding: 12px 15px;
            border: 1px solid #bdc3c7;
            border-radius: 25px;
            font-size: 16px;
        }
        #send-button, #end-chat-button {
            padding: 12px 25px;
            color: white;
            border: none;
            border-radius: 25px;
            margin-left: 10px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        #send-button {
            background-color: #2ecc71;
        }
        #send-button:hover {
            background-color: #27ae60;
        }
        #end-chat-button {
            background-color: #e74c3c;
        }
        #end-chat-button:hover {
            background-color: #c0392b;
        }
        @media (max-width: 600px) {
            .chat-container {
                height: 90vh;
            }
            #chat-messages {
                height: calc(90vh - 140px);
            }
            .input-area {
                flex-wrap: wrap;
            }
            #user-input {
                width: 100%;
                margin-bottom: 10px;
            }
            #send-button, #end-chat-button {
                width: calc(50% - 5px);
                margin-left: 0;
            }
            #end-chat-button {
                margin-left: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Wellness Info Chat</h1>
        <p>Get support and information on mental health, sexual wellbeing, and LGBTQ+ topics</p>
    </div>
    <div class="chat-container">
        <div id="chat-messages"></div>
        <div class="input-area">
            <input type="text" id="user-input" placeholder="Type your message...">
            <button id="send-button">Send</button>
            <button id="end-chat-button">End Chat</button>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            function addMessage(message, isUser) {
                const messageDiv = $('<div>').addClass('message').addClass(isUser ? 'user-message' : 'bot-message').text(message);
                $('#chat-messages').append(messageDiv);
                $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
            }

            function sendMessage() {
                const userInput = $('#user-input').val().trim();
                if (userInput) {
                    addMessage(userInput, true);
                    $('#user-input').val('').focus();

                    $.ajax({
                        url: '/chat',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({message: userInput}),
                        success: function(data) {
                            addMessage(data.response, false);
                        },
                        error: function() {
                            addMessage("Sorry, there was an error processing your request.", false);
                        }
                    });
                }
            }

            $('#send-button').click(sendMessage);

            $('#end-chat-button').click(function() {
                $.ajax({
                    url: '/end_chat',
                    method: 'POST',
                    contentType: 'application/json',
                    success: function(data) {
                        $('#chat-messages').empty();
                        addMessage(data.response, false);
                    },
                    error: function() {
                        addMessage("Sorry, there was an error ending the chat.", false);
                    }
                });
            });

            $('#user-input').keypress(function(e) {
                if (e.which == 13) {
                    sendMessage();
                }
            });

            // Initial greeting
            setTimeout(function() {
                addMessage("Hello! I'm here to provide factual information about mental wellness, sexual wellbeing, or LGBTQ+ topics. What would you like to know?", false);
            }, 500);
        });
    </script>
</body>
</html>
        ''')

    app.run(debug=True)