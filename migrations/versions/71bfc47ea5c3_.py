"""empty message

Revision ID: 71bfc47ea5c3
Revises: 
Create Date: 2023-03-04 10:15:05.383089

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
# revision identifiers, used by Alembic.
revision = '71bfc47ea5c3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=40), nullable=False),
    sa.Column('lastName', sa.String(length=40), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('is_student', sa.Boolean(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profileImg', sa.String(length=512), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=40), nullable=False),
    sa.Column('subject', sa.String(length=40), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('subject_level', sa.String(length=40), nullable=True),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('tutor_id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['tutor_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE services SET SCHEMA {SCHEMA};")


    op.create_table('tutors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('education', sa.String(length=400), nullable=False),
    sa.Column('credentials', sa.String(length=400), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE tutors SET SCHEMA {SCHEMA};")

    

    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('booking_date', sa.Date(), nullable=True),
    sa.Column('booking_time_to', sa.Time(), nullable=True),
    sa.Column('booking_time_from', sa.Time(), nullable=True),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE bookings SET SCHEMA {SCHEMA};")


    op.create_table('usertutors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('users', sa.Integer(), nullable=True),
    sa.Column('tutors', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['tutors'], ['tutors.id'], ),
    sa.ForeignKeyConstraint(['users'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE usertutors SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('usertutors')
    op.drop_table('bookings')
    op.drop_table('tutors')
    op.drop_table('services')
    op.drop_table('users')
    # ### end Alembic commands ###
