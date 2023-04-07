"""empty message

Revision ID: 7b6ffbab97b9
Revises: fb138d2c2c5e
Create Date: 2023-04-06 19:41:17.968327

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b6ffbab97b9'
down_revision = 'fb138d2c2c5e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.drop_index('ix_message_timestamp')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.create_index('ix_message_timestamp', ['timestamp'], unique=False)

    # ### end Alembic commands ###
