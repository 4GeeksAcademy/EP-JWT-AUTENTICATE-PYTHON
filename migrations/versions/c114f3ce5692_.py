"""empty message

Revision ID: c114f3ce5692
Revises: 7e1f3c31565c
Create Date: 2024-12-16 15:24:45.212839

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c114f3ce5692'
down_revision = '7e1f3c31565c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nombre', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('apellido', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('ciudad', sa.String(length=100), nullable=True))
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=100),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.drop_column('ciudad')
        batch_op.drop_column('apellido')
        batch_op.drop_column('nombre')

    # ### end Alembic commands ###
