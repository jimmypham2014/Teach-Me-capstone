from app.models import db, User, Service, Booking,Tutor,environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName ='Hoe', lastName = 'User',username='Demo', email='demo@aa.io', password='password', is_student = False, profileImg='https://cdn-icons-png.flaticon.com/512/2202/2202112.png')
    marnie = User(
        firstName ='Marnie', lastName = 'Trash',username='marnie', email='marnie@aa.io', password='password', is_student = False, profileImg='https://cdn-icons-png.flaticon.com/512/201/201634.png')
    bobbie = User(
        firstName ='Bobbie', lastName = 'bob',username='bobbie', email='bobbie@aa.io', password='password',is_student = False, profileImg ='https://cdn-icons-png.flaticon.com/512/3011/3011270.png')

    


    service1 = Service(title = 'Algebra', subject = 'Math', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 30, image ='https://static3.depositphotos.com/1005895/202/i/600/depositphotos_2021206-stock-photo-doing-some-high-school-math.jpg'  , tutor = demo)
    service2 = Service(title = 'Chemistry', subject = 'Science', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 30 , image = 'https://static7.depositphotos.com/1194063/685/i/600/depositphotos_6859250-stock-photo-laboratory.jpg',  tutor = marnie)
    service3 = Service(title = 'Modern World', subject = 'History', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 30 , image='https://static5.depositphotos.com/1006006/468/i/600/depositphotos_4681227-stock-photo-erasing-history.jpg', tutor = bobbie)
    service4 = Service(title = 'Calculus', subject = 'Math', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 45 , image='https://st.depositphotos.com/1028436/2475/i/600/depositphotos_24759633-stock-photo-mathematic.jpg',tutor = demo)
    service5 = Service(title = 'Literature', subject = 'English', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 34 , image= 'https://st2.depositphotos.com/1000152/5287/i/450/depositphotos_52874279-stock-photo-open-books.jpg', tutor = marnie)
    service6 = Service(title = 'Coding', subject = 'Python', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 35,image='https://st4.depositphotos.com/12056054/27931/i/600/depositphotos_279310544-stock-photo-python-modern-programming-language-for.jpg' , tutor = bobbie)
    service7 = Service(title = 'Geometry', subject = 'Math', description ='Im the best tutor ever', subject_level= 'K12 - College', price = 36 ,image='https://st4.depositphotos.com/13193658/20412/i/600/depositphotos_204125916-stock-photo-adorable-red-haired-schoolgirl-sitting.jpg', tutor = demo)



    tutor1 = Tutor(education = 'University of California, Los Angeles', credentials ='BS Degree in Mathematics', user_id = demo.id)
    tutor2 = Tutor(education = 'University of California, Berkeley', credentials ='BS Degree in Science', user_id = marnie.id)
    tutor3 = Tutor(education = 'University of California, San Diego', credentials ='BS Degree in Literature', user_id = bobbie.id)


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
    db.session.add(tutor1)
    db.session.add(tutor2)
    db.session.add(tutor3)
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