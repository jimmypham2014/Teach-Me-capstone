from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User,db
from app.forms import EditProfileForm
from ..aws import allow_file, get_unique_filename, upload_file_to_s3
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def edit_profile(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    if "profileImg" in request.files:
        image = request.files['profileImg']
    else:
        image = ""

    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if(image):
        if not allow_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return {"errors": "failed to upload into s3"}, 400

        url = upload['url']
    else:
        url = current_user.profile_picture

    if form.validate_on_submit():
        data =form.data
        user= User.query.get(id)
        for key, val in data.items():
            setattr(user, key, val)

        if url:
            user.profileImg = url
    
            db.session.commit()
            return user.to_dict()
       
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401