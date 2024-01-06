import os
from os import environ
import redis

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class Config:
    SECRET_KEY = environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATION = environ.get("SQLALCHEMY_TRACK_MODIFICATION")


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "dev.db")
    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProdConfig(Config):
    pass


class TestConfig(Config):
    pass
