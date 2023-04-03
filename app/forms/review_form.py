from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FieldList, FormField,FileField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Optional
from app.models import User

class ReviewForm(FlaskForm):
    comments = StringField('Commments', validators =[DataRequired()])
    reviewImage = FileField('image')
    rating= IntegerField('Price', validators =[DataRequired()])
    
    
    