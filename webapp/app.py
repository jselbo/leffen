
from flask import Flask
from flask import render_template
from flask import session

from flask_mysqldb import MySQL

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

app = Flask(__name__)

# app.config['MYSQL_USER'] = 'checkin'
# app.config['MYSQL_PASSWORD'] = 'checkinpass'
# app.config['MYSQL_DB'] = 'checkin'
# app.config['MYSQL_HOST'] = 'localhost'

# mysql = MySQL(app)

FLASH_SUCCESS = 'success'
FLASH_INFO = 'info'
FLASH_WARNING = 'warning'
FLASH_DANGER = 'danger'

# def logged_in():
#   return TEACHER_ID_KEY in session

@app.route('/')
def home():
  #if logged_in():
    #return render_template('home_loggedin.html', teacherID=session[TEACHER_ID_KEY])
  #else:
  return render_template('home.html')

@app.route('/register')
def register():
  return render_template('register.html')

@app.route('/login')
def login():
  return render_template('login.html')

# @app.route('/checkin')
# def checkin():
#   return render_template('checkin.html')

# @app.route('/do_register', methods=['POST'])
# def do_sign_up():
#   username = request.form['inputName']
#   password = request.form['inputPassword']
#   title = request.form['inputTitle']
#   lastName = request.form['inputLastName']
#   email = request.form['inputEmail']

#   # Validate fields
#   errors = {}
#   if not username:
#     errors['inputName'] = 'Please enter a username'
#   else:
#     cursor = mysql.connection.cursor()
#     cursor.execute('''
#       SELECT COUNT(*) FROM Teacher WHERE Username = %s
#     ''', (username,))
#     if cursor.fetchone()[0] > 0:
#       errors['inputName'] = 'This username already exists; please choose another username'
#   if not password:
#     errors['inputPassword'] = 'Please enter a password'
#   if not lastName:
#     errors['inputLastName'] = 'Please enter your last name'

#   if errors:
#     return json.dumps({'errors': errors})

#   # Hash, salt password
#   password = generate_password_hash(password)

#   # Insert account
#   register_stmt = '''
#     INSERT INTO Teacher (Username, Password, Email, Title, LastName)
#     VALUES (%s, %s, %s, %s, %s)
#   '''
#   register_data = (username, password, email, title, lastName)
#   cursor.execute(register_stmt, register_data)
#   newTeacherID = cursor.lastrowid
#   mysql.connection.commit()

#   # Enter session
#   session[TEACHER_ID_KEY] = newTeacherID

#   flash('Your account has been registered', FLASH_SUCCESS)
#   return json.dumps({}), 200

# @app.route('/do_sign_in', methods=['POST'])
# def do_sign_in():
#   username = request.form['inputName']
#   password = request.form['inputPassword']

#   loggedInTeacherID = -1

#   # Validate fields
#   errors = {}
#   if not username:
#     errors['inputName'] = 'Please enter a username'
#   if not password:
#     errors['inputPassword'] = 'Please enter a password'

#   if username and password:
#     cursor = mysql.connection.cursor()
#     cursor.execute('''
#       SELECT TeacherID, Password FROM Teacher WHERE Username = %s
#     ''', (username,))
#     result = cursor.fetchone()

#     if result is None:
#       errors['inputName'] = 'No user found'
#     else:
#       stored_password = result[1].encode('utf8')
#       if check_password_hash(stored_password, password):
#         loggedInTeacherID = result[0]
#       else:
#         errors['inputPassword'] = 'Incorrect password'

#   if errors:
#     return json.dumps({'errors': errors})

#   # Enter session
#   session[TEACHER_ID_KEY] = loggedInTeacherID

#   flash('You have successfully logged in', FLASH_SUCCESS)
#   return json.dumps({}), 200

# @app.route('/do_logout')
# def do_logout():
#   session.pop(TEACHER_ID_KEY, None)

#   flash('You have been logged out', FLASH_SUCCESS)
#   return redirect('/')

# @app.route('/books')
# def book_list():
#   book_records = BookRecord.fetchAll(mysql)
#   return render_template('books.html', book_records=book_records)

# @app.route('/books/<int:book_identifier>/')
# def book(book_identifier):
#   book_record = BookRecord.fetchFromIdentifier(mysql, book_identifier)
#   return render_template('book.html', book_record=book_record)

if __name__ == '__main__':
  # Secret key for development only. Not used in production.
  app.secret_key = '\xb7\xde\xfe\x86?\xbd\xb8\xa2\xder\xfb\xe9\xa4\xa1%bw\xde\xd6\xc4\x04l\x9eo'

  app.run(host='0.0.0.0', debug=True)
