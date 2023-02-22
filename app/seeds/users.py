from app.models import db, User, Service, Booking,environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName ='Hoe', lastName = 'User',username='Demo', email='demo@aa.io', password='password', is_student = True)
    marnie = User(
        firstName ='Marnie', lastName = 'Trash',username='marnie', email='marnie@aa.io', password='password', is_student = True)
    bobbie = User(
        firstName ='Bobbie', lastName = 'bob',username='bobbie', email='bobbie@aa.io', password='password',is_student = False)


    service1 = Service(title = 'Algebra', subject = 'Math', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 30 , tutor = demo)
    service2 = Service(title = 'Chemistry', subject = 'Science', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 30 , tutor = marnie)
    service3 = Service(title = 'Modern World', subject = 'History', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 30 , tutor = bobbie)
    service4 = Service(title = 'Calculus', subject = 'Math', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 45 , tutor = demo)
    service5 = Service(title = 'Literature', subject = 'English', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 34 , tutor = marnie)
    service6 = Service(title = 'Coding', subject = 'Python', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 35 , tutor = bobbie)
    service7 = Service(title = 'Geometry', subject = 'Math', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 36 , tutor = demo)


    db.session.add(service1) 
    db.session.add(service2) 
    db.session.add(service3) 
    db.session.add(service4) 
    db.session.add(service5) 
    db.session.add(service6)  
    db.session.add(service7)   
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()