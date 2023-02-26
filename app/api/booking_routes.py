from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from datetime import datetime, timedelta
from app.models import  db, Booking, Service
from app.forms import BookingForm


booking_routes = Blueprint('bookings', __name__)


# @booking_routes.route('/', methods=['POST'])
# def add_booking(service_id):
#     form = BookingForm()
    
#     form['csrf_token'].data = request.cookies['csrf_token']
#     print(form.data, 'backenddd')
#     date = form.data["date"]
#     time_to = form.data["time_to"]
#     time_from =form.data["time_from"]


#     if form.validate_on_submit():
#         data =form.data

#         new_booking = Booking(student_id = current_user.get_id(),
#                                 service_id =service_id,
#                                booking_date = date,
#                                booking_time_from = time_from,
#                                booking_time_to= time_to,
#                                )
                               
#         print(new_booking)
#         form.populate_obj(new_booking)
#         db.session.add(new_booking)
#         db.session.commit()

#         return jsonify(new_booking.to_dict())


@booking_routes.route('/', methods=['GET'])
def getBookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings])


@booking_routes.route('/<int:id>', methods =['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)
    print(booking)
    db.session.delete(booking)
    db.session.commit()
    return jsonify(message="Sucessfully removed Service")
    

@booking_routes.route('/<int:id>', methods=["PUT","PATCH"])
def edit_booking(id):



    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, 'put --->backend')
    date = form.data["date"]
    time_to = form.data["time_to"]
    time_from =form.data["time_from"]

    if form.validate_on_submit():
        data = form.data
        booking = Booking.query.get(id)
        
        booking.booking_date = date
        booking.booking_time_to = time_to
        booking.booking_time_from = time_from
            
        db.session.commit()
        return booking.to_dict()