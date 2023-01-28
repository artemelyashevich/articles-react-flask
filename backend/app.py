from datetime import datetime
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db = SQLAlchemy(app)

CORS(app)
app.app_context().push()


class UserRepository:
    def __init__(self, db):
        self.db = db

    def create_user(self, data):
        if not self.__is_valid_data(data):
            abort(400)

        try:
            name = data['name']
            email = data['email']
            psw = data['psw']

            user = User(name=name, email=email, psw=psw)
            self.db.session.add(user)
            self.db.session.commit()
            print("\nCommitted\n")
            return user
        except Exception as e:
            print(f"\n{e}\n")
            abort(500)

    @staticmethod
    def __is_valid_data(data):
        return "name" in data and "email" in data and "psw" in data


class ArticleRepository:
    def __init__(self, db):
        self.db = db

    def create_article(self, data):
        try:
            title = data['title']
            content = data['content']
            user_id = data['user-id']

            user_article = User_Article(title=title, content=content, user_id=user_id)
            self.db.session.add(user_article)
            self.db.session.commit()
            print("\nCommited\n")
            return '''
                               Title is : {},
                               Content is : {}
                           '''.format(title, content)
        except Exception as e:
            print(f"\n{e}\n")

    @staticmethod
    def __is_valid_data(data):
        return "title" in data and "content" in data and "user-id" in data


user_repository = UserRepository(db)


@app.route('/articles', methods=['GET'])
def show_articles():
    data = [{'id': article.id, 'title': article.title, 'content': article.content} for article in Article.query.all()]
    return jsonify(data)


@app.route('/articles', methods=["DELETE"])
def delete_article():
    data = request.get_json()
    if data:
        if "id" in data:
            id = data["id"]
            db.session.delete(Article.query.get(id))
            db.session.commit()
    abort(200)


@app.route('/users')
def find_all_users():
    data = []
    arts = []
    for user in User.query.all():
        for art in User_Article.query.all():
            if user.id == art.user_id:
                arts += [{"title": art.title, "id": art.id, "content": art.content, "user-id": art.user_id}]
        data += [{"name": user.name, "email": user.email, "id": user.id, "articles": arts, "psw": user.psw}]
        arts = []
    return jsonify(data)


@app.route('/users', methods=["POST"])
def create_user():
    data = request.get_json()

    if data:
        user = user_repository.create_user(data)
        return user.convert_to_json()

    abort(200)


user_id = None


@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        User.query.filter_by(id=id).delete()
        db.session.commit()

    except Exception as e:
        print(e)
        abort(500)

    abort(200)


@app.route('/user/<int:id>', methods=["PUT"])
def change_user(id):
    user = User.query.get(id)
    try:
        name = request.json['name']
        email = request.json['email']

        user.name = name
        user.email = email
        db.session.commit()

        abort(200)
    except Exception as e:
        print(e)
        abort(400)

    abort(200)


@app.route('/login', methods=["POST"])
def post_id():
    data = request.get_json()
    if data:
        user = None
        try:
            user = User.query.filter(
                User.psw == data["psw"],
                User.email == data["email"]
            ).first()
        except Exception as e:
            print(f'\t{e}')
            abort(500)
        if not user:
            abort(404)
        return user.convert_to_json()
    abort(400)


@app.route('/user-article')
def user_article():
    data = [{'id': article.id, 'title': article.title, 'content': article.content, 'user-id': article.id} for
            article in
            User_Article.query.all()]
    return jsonify(data)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    psw = db.Column(db.String(500), nullable=False)

    def __init__(self, name, email, psw):
        self.name = name
        self.email = email
        self.psw = psw

    def convert_to_json(self):
        data = jsonify({
            "name": self.name,
            "email": self.email,
            "id": self.id
        })
        return data

    def __repr__(self):
        return str(self.name)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title, content):
        self.title = title
        self.content = content

    def delete(self):
        db.session.delete(Article.query.get(self.id))
        db.session.commit()

    def convert_to_json(self):
        data = jsonify({
            "title": self.name,
            "content": self.email,
            "id": self.id
        })
        return data

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


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
