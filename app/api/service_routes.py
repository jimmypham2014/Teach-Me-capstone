from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import User,Service, db, Booking
from app.forms import ServiceForm, BookingForm
import datetime
from .auth_routes import validation_errors_to_error_messages
from  datetimerange import DateTimeRange

service_routes = Blueprint('services', __name__)


@service_routes.route('/', methods=['GET'])
def load_service():
    services = Service.query.all()
    return jsonify([service.to_dict() for service in services])
    
    
    
    
    
@service_routes.route('/', methods=['POST'])
@login_required
def add_service():
    form = ServiceForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        data = form.data
        new_service = Service(tutor_id=current_user.get_id(),
                              title = data['title'],
                              image = data['image'],
                              subject_level=data['subject_level'],
                              subject = data['subject'],
                              price = data['price'],
                              description = data['description'])
   
        form.populate_obj(new_service)
        db.session.add(new_service)
        db.session.commit()
        return new_service.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)},401
    

@service_routes.route('/<int:id>', methods=["PUT","PATCH"])
@login_required
def edit_service(id):
    form = ServiceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        service = Service.query.get(id)
        for key, value in data.items():
            setattr(service,key,value)
            
        db.session.commit()
        return service.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)},401

    
@service_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_service(id):
    service = Service.query.get(id)
    db.session.delete(service)
    db.session.commit()
    return "Sucessfully removed Service"



@service_routes.route('/<int:id>', methods=["GET"])
def get_single_service(id):
    service = Service.query.get(id)
    return service.to_dict()



#/ 
@service_routes.route('/<int:service_id>/bookings/', methods=['POST'])
def add_booking(service_id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    date = form.data["date"]
    time_to = form.data["time_to"]
    time_from =form.data["time_from"]

    service = Service.query.get_or_404(service_id)

    # if date == '' or time_from == '' or time_to == '':
    #     return jsonify(message='daste and time cannot be blank'),406

    date_time_from = datetime.datetime.strptime(f'{date}-{time_from}','%Y-%m-%d-%H:%M:%S')
    date_time_to = datetime.datetime.strptime(f'{date}-{time_to}','%Y-%m-%d-%H:%M:%S')
    received_dates = DateTimeRange(f'{date}T{time_from}', f'{date}T{time_to}')




 
    # if datetime.datetime.now() > date_time_from:
    #     return jsonify(message='Any booking for the past dates or time cannot be accomodated'),406
    # if date_time_from > date_time_to:
    #     return jsonify(message='Any booking for the past dates or time cannot be accomodated'), 406


    today = date.today()

    current_time  = datetime.datetime.now()
    # valid_time = True
    # valid_booking_time = False



    # # if date == today, the hour === time from hour -> 
    # if date == today:
    #     if current_time.hour == time_from.hour:
    #         if current_time.minute > time_from.minute:
    #             valid_time = False
    #     elif current_time.hour > time_from.hour:
    #         valid_time = False

    # # cannot book a date before today's date
    # if today > date:
    #     valid_time = False

    #valdiate time from and time to

    if(time_from.hour <= time_to.hour):
        valid_booking_time = False


    if form.validate_on_submit():

        if time_from.hour > time_to.hour:
            return {'errors':'Invalid Booking Time'},406

        
        datas = Booking.query.all()

        if datas:
            for data in datas:
                date_time_from = datetime.datetime.strptime(f'{data.booking_date}-{data.booking_time_from}','%Y-%m-%d-%H:%M:%S')
                date_time_to = datetime.datetime.strptime(f'{data.booking_date}-{data.booking_time_to}','%Y-%m-%d-%H:%M:%S')

                data_dates = DateTimeRange(str(date_time_from).replace(' ','T'),str(date_time_to).replace(' ','T'))
                if data_dates.is_intersection(received_dates):
                    return {'errors':'Someone already booked this time, please book another time'},409

        if datetime.datetime.now() > date_time_from:
            return {'errors':'Any booking for the past dates or time cannot be accomodated'},406
        elif date_time_from > date_time_to:
            return {'errors':'Any booking for the past dates or time cannot be accomodated'},406
        elif time_from.minute > time_to.minute:
                return {'errors':'Your booking time must be 1 hour minimum'},406
        
                
        else: 
            new_booking = Booking(student_id = current_user.get_id(),
                                    service_id = service.id,
                                    booking_date = date,
                                    booking_time_from = time_from,
                                    booking_time_to= time_to,
                                    )                 
            
            form.populate_obj(new_booking)
            db.session.add(new_booking)
            db.session.commit()
            return new_booking.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)},401