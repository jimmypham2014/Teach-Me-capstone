from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import User,Service, db, Booking
from app.forms import ServiceForm, BookingForm

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
    print(form.data, 'backend')
    if form.validate_on_submit():
        data = form.data
        new_service = Service(tutor_id=current_user.get_id(),
                              title = data['title'],
                              subject = data['subject'],
                              description = data['description'])
   
        form.populate_obj(new_service)
        db.session.add(new_service)
        db.session.commit()
        return new_service.to_dict()
    

@service_routes.route('/<int:id>', methods=["PUT","PATCH"])
@login_required
def edit_service(id):
    form = ServiceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        service = Service.query.get(id)
        for key, value in data.items():
            setattr(service,key,value)
            
        db.session.commit()
        return service.to_dict()
    
    
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
    print(service_id,'ehlloolololololo')
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, 'backenddd')
    date = form.data["date"]
    time_to = form.data["time_to"]
    time_from =form.data["time_from"]

    service = Service.query.get(service_id)

    if form.validate_on_submit():
        data =form.data

        new_booking = Booking(student_id = current_user.get_id(),
                               service_id = service.id,
                               booking_date = date,
                               booking_time_from = time_from,
                               booking_time_to= time_to,
                               )
                               
        print(new_booking)
        form.populate_obj(new_booking)
        db.session.add(new_booking)
        db.session.commit()

        return new_booking.to_dict()