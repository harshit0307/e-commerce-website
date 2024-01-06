from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_restx import Resource, Namespace, fields

from flask import Flask, request, jsonify, make_response, session
from werkzeug.security import generate_password_hash, check_password_hash

from models.user_model import User

auth_ns = Namespace("auth", description="A namespace for our Authentication")


signup_model = auth_ns.model(
    "SignUp",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    },
)


login_model = auth_ns.model(
    "Login", {"id": fields.String(), "email": fields.String()}
)

protected_model = auth_ns.model(
    "Protected", {"message": fields.String()}
)


@auth_ns.route("/sign-up")
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()

        email = data.get("email")

        db_user = User.query.filter_by(email=email).first()

        if db_user is not None:
            return jsonify({"message": f"User with username {email} already exists"})

        new_user = User(
            username=data.get("username"),
            email=data.get("email"),
            password=generate_password_hash(data.get("password")),
        )

        new_user.save()

        return make_response(jsonify({"message": "User created successfully"}), 201)


@auth_ns.route("/login")
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        db_user = User.query.filter_by(email=email).first()

        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.id)
            session["user_id"] = db_user.id
            id = db_user.id
            email = db_user.email

            return jsonify(access_token=access_token)
        else:
            return jsonify({"error": "Invalid email or password"})


@auth_ns.route("/protected")
class Protected(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=session.get("user_id")).first()
        return jsonify({'user_id': current_user, 'email': user.email})
