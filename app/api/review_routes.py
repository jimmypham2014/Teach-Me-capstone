from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_reviews():

    reviews = Review.query.all()

    return jsonify([review.to_dict() for review in reviews])