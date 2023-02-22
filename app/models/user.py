from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable = False)
    lastName = db.Column(db.String(40), nullable = False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    is_student =  db.Column(db.Boolean, nullable = False)
    description = db.Column(db.String(500), nullable = True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profileImg = db.Column(db.String(512))
    
    services = db.relationship('Service', back_populates='tutor')

    bookings = db.relationship('Booking', back_populates = 'student')
  

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'email': self.email,
            'profileImg': self.profileImg
        }
