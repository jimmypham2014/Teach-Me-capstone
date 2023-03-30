
from flask_socketio import SocketIO, emit,send,join_room, leave_room

from flask import request
from flask_login import current_user
from app.models import Message,db
import os

users = {}
# create your SocketIO instance
socketio = SocketIO()

socketio = SocketIO(cors_allowed_origins="*")


    # code to follow

@socketio.on("connect")
def connection():
    print(request.sid)


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    print(username)
    print(room,'helloo')
    join_room(room)
    emit(username + ' has entered the room.', to=room)

@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    print(room, '++++++++++++++')
    message = Message(sender_id = current_user.id,
                        body = data['msg'],
                        recipient_id = data['recipientId'],
                        roomId = data['room'])
    db.session.add(message)
    db.session.commit()
    emit("receivedChat", data, room= room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    emit(username + ' has left the room.', to=room)

@socketio.on('disconnect')
def disconnect():
    emit('user disconnected'
      
    )




@socketio.on('private_message', namespace ='/private')
def private_message(payload):
    recipient_session_id = users[payload['username']]
    message = payload['message']

    emit('new_private_message', message, room=rec)