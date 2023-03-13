from flask import Blueprint, jsonify, session, request
from app.models import User, db,Tutor, UserTutor
from app.forms import LoginForm
from app.forms import SignUpForm, TutorSignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():

    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
   
    if form.validate_on_submit():
        user = User(
            firstName = form.data['firstName'],
            lastName = form.data['lastName'],
            is_student = form.data['is_student'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/tutorsignup', methods=['POST'])
def tutor_sign_up():
    """
    Creates a new user and logs them in
    """
    form = TutorSignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        is_student = form.data['is_student']
        email = form.data['email']
        username = form.data['username']

        
        user = User(
            firstName = form.data['firstName'],
            lastName = form.data['lastName'],
            is_student = is_student,
            username=username,
            email=email,
            password=form.data['password']
        )

        db.session.add(user)
        db.session.commit()
        

        if is_student == False:
            tutor = Tutor(
            user_id = user.id,
            education = form.data['education'],
            credentials = form.data['credentials']
            )

        
        
       
        db.session.add(tutor)
        db.session.commit()

        userTutor = UserTutor(
            user_id = user.id,
            tutor_id = tutor.id
        )

        db.session.add(userTutor)
        db.session.commit()
        

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401