from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Service(db.Model, UserMixin):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
        
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable = False)
    subject = db.Column(db.String(40), nullable = False)
    description = db.Column(db.String(1000), nullable = False)
    subject_level = db.Column(db.String(40), nullable = True)
    price = db.Column(db.Integer, nullable = False)
    tutor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    image = db.Column(db.String(500))
    tutor = db.relationship('User', back_populates='services')
    reviews = db.relationship('Review', back_populates ='service')

    booking = db.relationship('Booking', back_populates ='service')
     
     
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'subject': self.subject,
            'description': self.description,
            'image':self.image,
            'tutor':self.tutor.id,
            'price': self.price,
            'subject_level': self.subject_level
        }
   
     
     

