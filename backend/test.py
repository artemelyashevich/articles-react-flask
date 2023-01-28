from datetime import datetime

from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db = SQLAlchemy(app)

CORS(app)
app.app_context().push()


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<article {self.id}>"

class User_Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, title, content):
        self.title = title
        self.content = content

    def delete(self):
        User_Article.query.filter_by(id=self.id).delete()
        db.session.commit()

    def __repr__(self):
        return f"<article {self.id}>"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    psw = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return str(self.id)


@app.route('/articles', methods=["POST", "GET"])
def articles():
    if request.method == 'GET':
        data = [{'id': article.id, 'title': article.title, 'content': article.content} for article in
                Article.query.all()]
        return jsonify(data)

    if request.method == 'POST':
        data = request.get_json()

        if data:
            name = data['name']
            age = data['age']


@app.route('/users', methods=["POST", "GET"])
def users():
    if request.method == "GET":
        data = []
        arts = []
        for user in User.query.all():
            for art in User_Article.query.all():
                if user.id == art.user_id:
                    arts += [{"title": art.title, "id": art.id, "content": art.content, "user-id": art.user_id}]
            data += [{"name": user.name, "email": user.email, "id": user.id, "articles": arts, "psw": user.psw}]
            arts = []
        return jsonify(data)

    if request.method == "POST":
        data = request.get_json()

        if data:

            def create_user():
                try:
                    name = data['name']
                    email = data['email']
                    psw = data['psw']

                    user = User(name=name, email=email, psw=psw)
                    db.session.add(user)
                    db.session.commit()
                    print("\nCommited\n")
                    return user
                except Exception as e:
                    print(f"\n{e}\n")

            def create_article():
                try:
                    title = data['title']
                    content = data['content']
                    user_id = data['user-id']

                    user_article = User(title=title, content=content, user_id=user_id)
                    db.session.add(user_article)
                    db.session.commit()
                    print("\nCommited\n")
                    return '''
                                Title is : {},
                                Content is : {}
                            '''.format(title, content)
                except Exception as e:
                    print(f"\n{e}\n")

        if "name" in data and "email" in data and "psw" in data:
            create_user()

        if "delete-article" in data and "article-id" in data:
            user_article = User_Article.query.get(data["article-id"])
            print(user_article)
            user_article.delete()

        return ""


if __name__ == '__main__':
    app.run(debug=True)
