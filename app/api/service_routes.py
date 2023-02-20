from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import User,Service, db
from app.forms import ServiceForm

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