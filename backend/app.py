from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_restx import Api

from api.ProductService import product_ns
from config.env_config import DevConfig
from models.product_model import Product
from database.sql import sqldb
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_cors import CORS

from models.user_model import User
from util.auth import auth_ns

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevConfig)
    CORS(app)

    sqldb.init_app(app)
    migrate = Migrate(app, sqldb)
    JWTManager(app)

    api = Api(app, doc="/docs")

    api.add_namespace(product_ns)
    api.add_namespace(auth_ns)

    @app.route("/")
    def index():
        return jsonify({"status": "ok"}), 200

    @app.errorhandler(404)
    def not_found(err):
        return jsonify({"error": err})

    # model (serializer)
    @app.shell_context_processor
    def make_shell_context():
        return {"db": sqldb, "Product": Product, "user": User}

    return app

