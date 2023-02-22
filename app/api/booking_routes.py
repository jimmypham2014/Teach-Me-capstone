from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from datetime import datetime, timedelta
from app.models import  db, Booking
from app.forms import BookingForm

booking_routes = Blueprint('bookings', __name__)


@booking_routes.route('/', methods=['POST'])
def add_booking():
    form = BookingForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, 'backenddd')
    if form.validate_on_submit():
        data =form.data

        new_booking = Booking(student_id = current_user.get_id(), 
                               booking_date = jsonify(data['date']),
                               booking_time_from = request.json['time_to'],
                               booking_time_to= request.json['time_from'],
                               )
                               
        print(new_booking)
        form.populate_obj(new_booking)
        db.session.add(new_booking)
        db.session.commit()

        return jsonify(new_booking.to_dict())


@booking_routes.route('/', methods=['GET'])
def getBookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings])


    
