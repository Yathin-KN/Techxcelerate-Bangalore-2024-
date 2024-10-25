from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
import os

app = Flask(__name__)

client = MongoClient('USE your API key')
db = client['mental_wellness']
blogs_collection = db['blogs']

@app.route('/')
def forum():
    blogs = list(blogs_collection.find())
    return render_template('forum.html', blogs=blogs)

@app.route('/post_blog', methods=['POST'])
def post_blog():
    title = request.form['title']
    content = request.form['content']
    blogs_collection.insert_one({'title': title, 'content': content, 'comments': []})
    return redirect(url_for('forum'))

@app.route('/comment', methods=['POST'])
def comment():
    blog_index = int(request.form['blog_index'])
    comment = request.form['comment']
    blog = blogs_collection.find()[blog_index]
    blogs_collection.update_one({'_id': blog['_id']}, {'$push': {'comments': comment}})
    return redirect(url_for('forum'))

if __name__ == '__main__':
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    with open('templates/forum.html', 'w') as f:
        f.write('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mental Wellness Forum</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Samsung+Sharp+Sans:wght@600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Samsung Sharp Sans', sans-serif;
            font-weight: 600;
            line-height: 1.6;
            background-color: #f0f0f0;
            color: #333;
            padding: 2rem;
        }
        
        h1, h2 {
            color: #4CAF50;
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        .blog-post {
            background-color: #fff;
            border-radius: 20px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border: 1px solid #ddd;
            animation: fadeIn 0.5s ease-in;
        }
        
        .comment {
            background-color: #e0f7fa;
            border-radius: 20px;
            padding: 0.75rem;
            margin-top: 0.75rem;
            border: 1px solid #ddd;
        }
        
        form {
            margin-top: 1.5rem;
            background-color: #fff;
            padding: 1.5rem;
            border-radius: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border: 1px solid #ddd;
        }
        
        input[type="text"], textarea {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 20px;
            background-color: #fff;
            color: #333;
        }
        
        input[type="submit"] {
            background-color: #4CAF50;
            color: #fff;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        input[type="submit"]:hover {
            background-color: #45a049;
        }
        
        .back-btn {
            display: inline-block;
            background-color: #4CAF50;
            color: #fff;
            padding: 0.5rem 1rem;
            text-decoration: none;
            border-radius: 20px;
            margin-top: 1rem;
            transition: all 0.3s ease;
        }
        
        .back-btn:hover {
            background-color: #45a049;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <h1>Mental Wellness Forum</h1>
    
    <h2>Post a New Blog</h2>
    <form action="/post_blog" method="post">
        <input type="text" name="title" placeholder="Blog Title" required>
        <textarea name="content" placeholder="Blog Content" required></textarea>
        <input type="submit" value="Post Blog">
    </form>

    <h2>Recent Blogs</h2>
    {% for blog in blogs %}
        <div class="blog-post">
            <h3>{{ blog.title }}</h3>
            <p>{{ blog.content }}</p>
            <h4>Comments:</h4>
            {% for comment in blog.comments %}
                <div class="comment">{{ comment }}</div>
            {% endfor %}
            <form action="/comment" method="post">
                <input type="hidden" name="blog_index" value="{{ loop.index0 }}">
                <input type="text" name="comment" placeholder="Add a comment" required>
                <input type="submit" value="Post Comment">
            </form>
        </div>
    {% endfor %}

    <a href="http://localhost:5173/dashboard" class="back-btn">Back to Dashboard</a>
</body>
</html>
        ''')
    
    app.run(debug=True, port=3000)
