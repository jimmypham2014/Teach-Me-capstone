from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    

    id = db.Column(db.Integer, primary_key=True)
    booking_date = db.Column(db.Date)
    booking_time_to = db.Column(db.Time)
    booking_time_from = db.Column(db.Time)
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('services.id')), nullable = False)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable = False)

    service = db.relationship('Service', back_populates='booking')
    student = db.relationship('User', back_populates ='bookings')




    def to_dict(self):
        return {
            'id': self.id,
            'booking_date': self.booking_date,
            'booking_time_to': str(self.booking_time_to),
            'booking_time_from': str(self.booking_time_from),
            'student_id': self.student_id,
            'student': self.student.username,
            'service_id': self.service_id,
    
        }









    