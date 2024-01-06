from uuid import uuid4

from database.sql import sqldb

"""
class User:
    id: String primary key
    username: string
    email: string
    password: string
"""


def get_uuid():
    return uuid4().hex


class User(sqldb.Model):
    id = sqldb.Column(sqldb.String(32), primary_key=True, unique=True, default=get_uuid)
    username = sqldb.Column(sqldb.String(25), nullable=False)
    email = sqldb.Column(sqldb.String(), nullable=False)
    password = sqldb.Column(sqldb.Text(), nullable=False)

    # def __repr__(self):
    #     return f"<User {self.username}>"

    def save(self):
        sqldb.session.add(self)
        sqldb.session.commit()
