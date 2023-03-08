from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField 
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import User

class ServiceForm(FlaskForm):
    title = StringField('Title', validators =[DataRequired()])
    subject = StringField('Subject', validators = [DataRequired()])
    description = StringField('Description', validators =[DataRequired()])
    subject_level = StringField('Subject Level')
    image = StringField('Images', validators=[DataRequired(),URL(message='This is not a valid image URL link')])
    price = IntegerField('Price', validators =[DataRequired()])
    
    
    