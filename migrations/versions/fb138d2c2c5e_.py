"""empty message

Revision ID: fb138d2c2c5e
Revises: 7d11ea8eaf08
Create Date: 2023-04-06 19:21:38.955596

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb138d2c2c5e'
down_revision = '7d11ea8eaf08'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('timestamp', sa.DateTime(), nullable=True))
        batch_op.create_index(batch_op.f('ix_reviews_timestamp'), ['timestamp'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_reviews_timestamp'))
        batch_op.drop_column('timestamp')

    # ### end Alembic commands ###