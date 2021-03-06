from flask import Flask, g, request
import sqlite3
from flask import render_template


# -- leave these lines intact --
app = Flask(__name__)


def get_db():
    if not hasattr(g, 'sqlite_db'):
        db_name = app.config.get('DATABASE', 'gymbuddies.db')
        g.sqlite_db = sqlite3.connect(db_name)

    return g.sqlite_db


def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


@app.cli.command('initdb')
def initdb_command():
    """Creates the database tables."""
    init_db()
    print('Initialized the database.')


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, 'sqlite_db', None)
    if db is not None:
        db.close()
# ------------------------------


@app.route('/')
def root():
    return render_template("index.html")


@app.route('/blog',methods=['GET', 'POST'])
def blog():
    conn = get_db()
    c = conn.cursor()
    if request.method == "POST":
        post = request.form.get("user_post")
        if len(post) > 140:
            return "Post should less than 140 characters!", 400
        else:
            c.execute("INSERT INTO posts (post) VALUES(?);", [post])
            conn.commit()
    c.execute("SELECT post FROM posts ORDER BY id DESC")
    content = c.fetchall()
    return render_template("blog.html",content=content)

@app.route('/single_class')
def single_class():
    return render_template("single_class.html")

@app.route('/about_class')
def about():
    return render_template("about.html")


    if __name__ == '__main__':
        app.run()
