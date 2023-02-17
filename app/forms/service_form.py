from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class ServiceForm(Flaskform):
    title = StringField('Title', validators =[DataRequired()])
    subject = StringField('Subject', validators = [DataRequired()])
    description = StringField('Description', validators =[DataRequired()])
    subjet_level = StringField('Subject Level', validators =[DataRequired()])
    
    
    