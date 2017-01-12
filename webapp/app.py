
from flask import Flask
from flask import flash
from flask import json
from flask import redirect
from flask import render_template
from flask import request
from flask import session

from flask_mysqldb import MySQL

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

app = Flask(__name__)

app.config['MYSQL_USER'] = 'leffen'
app.config['MYSQL_PASSWORD'] = 'leffenpass'
app.config['MYSQL_DB'] = 'leffen'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL(app)

FLASH_SUCCESS = 'success'
FLASH_INFO = 'info'
FLASH_WARNING = 'warning'
FLASH_DANGER = 'danger'

USER_ID_KEY = 'user_id'

def logged_in():
  return USER_ID_KEY in session

@app.route('/')
def home():
  if logged_in():
    return render_template('home_loggedin.html')
  else:
    return render_template('home.html')

@app.route('/register')
def register():
  return render_template('register.html')

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/do_register', methods=['POST'])
def do_register():
  username = request.form['inputName']
  password = request.form['inputPassword']
  email = request.form['inputEmail']

  # Validate fields
  errors = {}
  if not username:
    errors['inputName'] = 'Please enter a username'
  else:
    cursor = mysql.connection.cursor()
    cursor.execute('''
      SELECT COUNT(*) FROM User WHERE Username = %s
    ''', (username,))
    if cursor.fetchone()[0] > 0:
      errors['inputName'] = 'This username already exists; please choose another username'
  if not password:
    errors['inputPassword'] = 'Please enter a password'
  if not email:
    errors['inputEmail'] = 'Please enter an email'

  if errors:
    return json.dumps({'errors': errors})

  # Hash, salt password
  password = generate_password_hash(password)

  # Insert account
  register_stmt = '''
    INSERT INTO User (Username, Password, Email)
    VALUES (%s, %s, %s)
  '''
  register_data = (username, password, email)
  cursor.execute(register_stmt, register_data)
  new_user_id = cursor.lastrowid
  mysql.connection.commit()

  # Enter session
  session[USER_ID_KEY] = new_user_id

  flash('Success! Your account has been registered.', FLASH_SUCCESS)
  return json.dumps({}), 200

@app.route('/do_sign_in', methods=['POST'])
def do_sign_in():
  username = request.form['inputName']
  password = request.form['inputPassword']

  logged_in_user_id = -1

  # Validate fields
  errors = {}
  if not username:
    errors['inputName'] = 'Please enter a username'
  if not password:
    errors['inputPassword'] = 'Please enter a password'

  if username and password:
    cursor = mysql.connection.cursor()
    cursor.execute('''
      SELECT UserID, Password FROM User WHERE Username = %s
    ''', (username,))
    result = cursor.fetchone()

    if result is None:
      errors['inputName'] = 'No user found'
    else:
      stored_password = result[1].encode('utf8')
      if check_password_hash(stored_password, password):
        logged_in_user_id = result[0]
      else:
        errors['inputPassword'] = 'Incorrect password'

  if errors:
    return json.dumps({'errors': errors})

  # Enter session
  session[USER_ID_KEY] = logged_in_user_id

  flash('You have successfully logged in', FLASH_SUCCESS)
  return json.dumps({}), 200

@app.route('/do_logout')
def do_logout():
  session.pop(USER_ID_KEY, None)

  flash('You have been logged out', FLASH_SUCCESS)
  return redirect('/')

if __name__ == '__main__':
  # Secret key for development only. Not used in production.
  app.secret_key = '\xb7\xde\xfe\x86?\xbd\xb8\xa2\xder\xfb\xe9\xa4\xa1%bw\xde\xd6\xc4\x04l\x9eo'

  app.run(host='0.0.0.0', debug=True)
