from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,DateField, TimeField
from wtforms.validators import DataRequired, Email, ValidationError

class BookingForm(FlaskForm):
    date = DateField('Date', validators=[DataRequired()])
    time_to = TimeField('time_to', validators=[DataRequired()])
    time_from = TimeField('time_from',validators = [DataRequired()])

    



    
    
    