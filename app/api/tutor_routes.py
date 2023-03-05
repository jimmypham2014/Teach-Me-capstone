from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Tutor

tutor_routes = Blueprint('tutors', __name__)

@tutor_routes.route('/', methods=['GET'])
def tutors():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    tutors= Tutor.query.all()
    return {'tutors': [tutor.to_dict() for tutor in tutors]}