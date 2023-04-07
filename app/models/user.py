from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime







class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    body = db.Column(db.String(140))
    roomId = db.Column(db.String(400))
    messageHasRead = db.Column(db.Boolean, default = False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(tz=timezone.utc))

    def to_dict(self):
        return{
            'id':self.id,
            'sender_id':self.sender_id,
            'recipient_id':self.recipient_id,
            'body':self.body,
            'timestamp':self.timestamp,
            'roomId':self.roomId,
            'messageHasRead': self.messageHasRead,
        }


    def __repr__(self):
        return '<Message {}>'.format(self.body)

class UserTutor(db.Model):
    __tablename__ = 'usertutors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('users',db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    tutor_id = db.Column('tutors',db.Integer,db.ForeignKey(add_prefix_for_prod('tutors.id')))

    user = db.relationship("User", back_populates ='are_tutors')
    tutor = db.relationship("Tutor", back_populates ='are_users')
# )


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
    reviews = db.relationship('Review', back_populates ='user')

    are_tutors = db.relationship("UserTutor",back_populates='user')

    messages_sent = db.relationship('Message',foreign_keys ='Message.sender_id', backref='author',lazy='dynamic')
    messages_received = db.relationship('Message', foreign_keys = 'Message.recipient_id', backref= 'recipient', lazy='dynamic')
    last_message_read_time = db.Column(db.DateTime)


    def new_messages(self):
        last_read_time = self.last_message_read_time or datetime(1900,1,1)
        return Message.query.filter_by(recipient=self).filter(Message.time)

  


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
            'is_student': self.is_student,
            'username': self.username,
            'email': self.email,
            'profileImg': self.profileImg,
            'description': self.description,
        }


class Tutor(db.Model):
    __tablename__ = 'tutors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    education = db.Column(db.String(400),nullable = False)
    credentials = db.Column(db.String(400), nullable = False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)


    are_users = db.relationship('UserTutor',back_populates = 'tutor')


    def to_dict(self):
        return {
            'id': self.id,
            'education':self.education,
            'user_id': self.user_id,
            'credentials': self.credentials
            
        }
 