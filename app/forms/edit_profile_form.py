from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, StopValidation, Length, Optional
from app.models import User
from flask_login import current_user

def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and not user.id == current_user.id:
        raise ValidationError('Email address is already in use.')

        
class EditProfileForm(FlaskForm):
      firstName = StringField('firstName', validators=[DataRequired(),
                            Length(min=2, max=20, message="First name must be between 2 to 20 characters long." )
                            ]),
      lastName = StringField('lastName', validators=[DataRequired(),
                             Length(min=2, max=20, message="Last name must be between 2 to 20 characters long." )]),
      profileImg = FileField('image'),
      description = StringField('description')


      





