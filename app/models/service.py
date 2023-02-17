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
     description = db.Column(db.String(1000), nullable)
     
     

