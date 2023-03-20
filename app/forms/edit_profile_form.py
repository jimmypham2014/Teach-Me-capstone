from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, StopValidation, Length, Optional
from app.models import User
from flask_login import current_user


class EditProfileForm(FlaskForm):
      firstName = StringField('first_name', validators=[DataRequired(),
                            Length(min=2, max=20, message="First name must be between 2 to 20 characters long." )
                            ]),
      lastName = StringField('last_name', validators=[DataRequired(),
                             Length(min=2, max=20, message="Last name must be between 2 to 20 characters long." )]),
      profileImg = FileField('image'),
      description = StringField('description')


      





