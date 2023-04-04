from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class Review(db.Model):
    __tablename__ ='reviews'

    if environment == "production":
        __table_args__ ={'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    comments = db.Column(db.String(1000))
    reviewImage = db.Column(db.String(500))
    rating = db.Column(db.Integer)
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('services.id')), nullable = False)
    user_id = db.Column(db. Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)

    user = db.relationship('User', back_populates ='reviews')
    service =db.relationship('Service', back_populates ='reviews')

    def to_dict(self):
        return{
            'id': self.id,
            'comments': self.comments,
            'rating': self.rating,
            'reviewImage': self.reviewImage
        }