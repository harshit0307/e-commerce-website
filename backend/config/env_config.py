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
    SESSION_COOKIE_SECURE = environ.get("SESSION_COOKIE_SECURE")
    SESSION_COOKIE_HTTPONLY = environ.get("SESSION_COOKIE_HTTPONLY")
    SESSION_TYPE = environ.get("SESSION_TYPE")
    SESSION_PERMANENT = environ.get("SESSION_PERMANENT")
    SESSION_USER_SIGNER = environ.get("SESSION_USER_SIGNER")
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")


class ProdConfig(Config):
    pass


class TestConfig(Config):
    pass
