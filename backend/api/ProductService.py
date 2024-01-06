from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request
from models.product_model import Product

product_ns = Namespace("product", description="A namespace for Recipes")


product_model = product_ns.model(
    "product",
    {"id": fields.Integer(), "title": fields.String(), "description": fields.String()},
)


@product_ns.route("/product")
class ProductResource(Resource):
    @product_ns.marshal_list_with(product_model)
    def get(self):
        """Get all product"""

        product = Product.query.all()

        return product

    @product_ns.marshal_with(product_model)
    @product_ns.expect(product_model)
    def post(self):
        """Create a new product"""

        data = request.get_json()

        new_recipe = Product(
            title=data.get("title"), description=data.get("description")
        )

        new_recipe.save()

        return new_recipe, 201


@product_ns.route("/recipe/<int:id>")
class RecipeResource(Resource):
    @product_ns.marshal_with(product_model)
    def get(self, id):
        """Get a product by id"""
        product = Product.query.get_or_404(id)

        return product

    @product_ns.marshal_with(product_model)
    def put(self, id):
        """Update a product by id"""

        product_to_update = Product.query.get_or_404(id)

        data = request.get_json()

        product_to_update.update(data.get("title"), data.get("description"))

        return product_to_update

    @product_ns.marshal_with(product_model)
    def delete(self, id):
        """Delete a product by id"""

        product_to_delete = Product.query.get_or_404(id)

        product_to_delete.delete()

        return product_to_delete
