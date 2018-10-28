from flask import Blueprint, request, make_response, jsonify, g
from flask.views import MethodView

from server import db
from server.models import Building, RoofAreaEstimation
from server.schemas import building_schema

building_blueprint = Blueprint('building', __name__)


class BuildingAPI(MethodView):
    def get(self):

        # ?place_id=ChIJa584nxWUj4ARUOQ7cQEjOHI

        place_id = request.args.get('place_id')

        if place_id:
            building = Building.query.filter_by(place_id=place_id)

            result = building_schema.dump(building)

            response_object = {
                'message': 'Successfully Loaded.',
                'data': {
                    'building': result.data
                }
            }
            return make_response(jsonify(response_object)), 201

        else:
            response_object = {
                'message': 'No existing building found.',
            }

            return make_response(jsonify(response_object)), 400


# add Rules for API Endpoints
building_blueprint.add_url_rule(
    '/building/',
    view_func=BuildingAPI.as_view('building_view'),
    methods=['GET'],
)