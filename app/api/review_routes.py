from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_reviews():

    reviews = Review.query.all()

    return jsonify([review.to_dict() for review in reviews])



@review_routes.route('<int:id>',methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if review.user_id != current_user.id:
        return {'errors':'This is not your review'},406

    db.session.delete(review)
    db.session.commit()
    return "Succesfully removed" 