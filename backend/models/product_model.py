from uuid import uuid4

from database.sql import sqldb

"""
class Product:
    id: String primary key
    title: str
    description: str (text)
"""


def get_uuid():
    return uuid4().hex


class Product(sqldb.Model):
    id = sqldb.Column(sqldb.String(32), primary_key=True, unique=True, default=get_uuid)
    title = sqldb.Column(sqldb.String(), nullable=False)
    description = sqldb.Column(sqldb.String(), nullable=False)

    # def __repr__(self):
    #     return f"<Product {self.title}>"

    def save(self):
        sqldb.session.add(self)
        sqldb.session.commit()

    def delete(self):
        sqldb.session.delete(self)
        sqldb.session.commit()

    def update(self, title, description):
        self.title = title
        self.description = description
        sqldb.session.commit()

