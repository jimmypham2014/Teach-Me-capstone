from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User,db, Message

message_routes = Blueprint('messages', __name__)


@message_routes.route('/')
def messages():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    messages= Message.query.all()
    return jsonify([message.to_dict() for message in messages])


