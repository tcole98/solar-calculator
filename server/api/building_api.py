from flask import Blueprint, request, make_response, jsonify, g
from flask.views import MethodView

from server import db
from server.utils.solar_calc import calculate_solar_results
from server.models import Building, RoofAreaEstimation
from server.schemas import building_schema

building_blueprint = Blueprint('building', __name__)


class BuildingAPI(MethodView):
    def get(self):

        # ?place_id=ChIJa584nxWUj4ARUOQ7cQEjOHI

        place_id = request.args.get('place_id')
        url = request.args.get('url')

        building = None
        origin = None

        if place_id:
            origin = 'place_id'
            building = Building.query.filter_by(place_id=place_id).first()

        if url:
            origin = 'url'
            building = Building.query.filter_by(url=url).first()

        if building:
            roof_area_estimation = db.session.query(RoofAreaEstimation).filter_by(building_id=building.id).order_by(RoofAreaEstimation.id.desc()).first()

            solar_results = calculate_solar_results(building=building, roof_area_estimation=roof_area_estimation)

            response_object = {
                'message': 'success',
                'building': building_schema.dump(building),
                'solar_calc_outcomes': solar_results
            }
            return make_response(jsonify(response_object)), 201

        if building is None and url or place_id:
            response_object = {
                'message': 'No existing building found!',
                'origin': origin,
            }

            return make_response(jsonify(response_object)), 201

        else:
            response_object = {
                'message': 'No existing building found.',
                'origin': origin,
            }

            return make_response(jsonify(response_object)), 400


# add Rules for API Endpoints
building_blueprint.add_url_rule(
    '/building/',
    view_func=BuildingAPI.as_view('building_view'),
    methods=['GET'],
)