from flask import Blueprint, request, make_response, jsonify, g
from flask.views import MethodView

from server import models, schemas
from server.schemas import solar_calc_results_schema, building_schema

from server.utils.building import create_new_building
from server.utils.solar_calc import calculate_solar_results
from server.utils.roof_area_estimation import create_new_roof_area_estimation
from server.utils.estimation_points import create_new_estimation_points

solar_calc_blueprint = Blueprint('solar_calc', __name__)


class SolarCalcAPI(MethodView):
    def post(self):

        post_data = request.get_json()

        place_id = post_data.get('place_id')
        formatted_address = post_data.get('formatted_address')
        location_lat = post_data.get('location_lat')
        location_lng = post_data.get('location_lng')
        estimation_point_list = post_data.get('roof_lat_lng')
        roof_area = post_data.get('roof_area')
        address_components = post_data.get('address_components')

        if post_data is not None:

            building = create_new_building(
                lat=location_lat,
                lng=location_lng,
                place_id=place_id,
                state=address_components['administrative_area_level_1'],
                country=address_components['country'],
                locality=address_components['locality'],
                postal_code=address_components['postal_code'],
                route=address_components['route'],
                street_number=address_components['street_number']
            )

            roof_area_estimation = create_new_roof_area_estimation(
                building=building, area=roof_area,
                center_latitude=None, center_longitude=None,
                estimation_point_list=estimation_point_list
            )

            create_new_estimation_points(roof_area_estimation=roof_area_estimation,
                                         estimation_point_list=estimation_point_list)

            solar_results = calculate_solar_results(building=building, roof_area_estimation=roof_area_estimation)

            response_object = {
                'message': 'success',
                'building': building_schema.dump(building),
                'solar_calc_outcomes': solar_calc_results_schema.dump(solar_results)
            }

            return make_response(jsonify(response_object)), 201

        else:
            # return no data
            response_object = {
                'status': 'Error',
                'message': 'You did not provide data for calc',
            }

            return make_response(jsonify(response_object)), 201


# add Rules for API Endpoints
solar_calc_blueprint.add_url_rule(
    '/solar_calc/',
    view_func=SolarCalcAPI.as_view('solar_calc_view'),
    methods=['POST']
)
