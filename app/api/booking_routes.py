from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from datetime import datetime, timedelta
from app.models import  db, Booking, Service
from app.forms import BookingForm
from .auth_routes import validation_errors_to_error_messages
import datetime
from datetimerange import DateTimeRange

booking_routes = Blueprint('bookings', __name__)




@booking_routes.route('/', methods=['GET'])
def getBookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings])


@booking_routes.route('/<int:id>', methods =['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()
    return jsonify(message="Sucessfully removed Service")
    

@booking_routes.route('/<int:id>', methods=["PUT","PATCH"])
def edit_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    date = form.data["date"]
    time_to = form.data["time_to"]
    time_from =form.data["time_from"]

    date_time_from = datetime.datetime.strptime(f'{date}-{time_from}','%Y-%m-%d-%H:%M:%S')
    date_time_to = datetime.datetime.strptime(f'{date}-{time_to}','%Y-%m-%d-%H:%M:%S')
    received_dates = DateTimeRange(f'{date}T{time_from}', f'{date}T{time_to}')


    today = date.today()

    if today > date:
        return {'errors':'Any booking for the past dates or time cannot be accomodated'},406

 

    if form.validate_on_submit():
        data = form.data
        booking = Booking.query.get(id)

    


        if time_from.hour > time_to.hour:
            return {'errors':'Invalid Booking Time'},406

        datas = Booking.query.all()

        if datas:
            for data in datas:
                date_time_from_here = datetime.datetime.strptime(f'{data.booking_date}-{data.booking_time_from}','%Y-%m-%d-%H:%M:%S')
                date_time_to_here = datetime.datetime.strptime(f'{data.booking_date}-{data.booking_time_to}','%Y-%m-%d-%H:%M:%S')
              
                data_dates = DateTimeRange(str(date_time_from_here).replace(' ','T'),str(date_time_to_here).replace(' ','T'))
                if data_dates.is_intersection(received_dates):
                    return {'errors':'Someone already booked this time, please book another time'},409


        if datetime.datetime.now() > date_time_from:
            return {'errors':'Any booking for the past dates or time cannot be accomodated'},406
        elif date_time_from > date_time_to:
            return {'errors':'Any booking for the past dates or time cannot be accomodated'},406
        elif time_from.minute > time_to.minute:
                return {'errors':'Your booking time must be 1 hour minimum'},406

        
        booking.booking_date = date
        booking.booking_time_to = time_to
        booking.booking_time_from = time_from
            
        db.session.commit()
        return booking.to_dict()

    return {'errors':validation_errors_to_error_messages(form.errors)},401