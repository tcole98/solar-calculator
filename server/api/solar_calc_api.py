from flask import Blueprint, request, make_response, jsonify, g
from flask.views import MethodView

import math
import json

stc_json_file = open('server/static/stc.json')
stc_json_str = stc_json_file.read()
stc_json_data = json.loads(stc_json_str)

states_solar_data_json_file = open('server/static/states_solar_data.json')
states_solar_data_json_str = states_solar_data_json_file.read()
states_solar_data_json_data = json.loads(states_solar_data_json_str)

solar_calc_blueprint = Blueprint('solar_calc', __name__)


class SolarCalcAPI(MethodView):
    def post(self):

        post_data = request.get_json()

        place_id = post_data.get('place_id')
        formatted_address = post_data.get('formatted_address')
        location_lat = post_data.get('location_lat')
        location_lng = post_data.get('location_lng')
        # TODO: install postGIS to store roof latlng and area data
        roof_lat_lng = post_data.get('roof_lat_lng')
        roof_area = post_data.get('roof_area')
        address_components = post_data.get('address_components')

        # CONSTANTS
        avg_roof_size = 175
        avg_day_time_usage = 0.4
        energy_inflation_rate = 0.0319
        increase_home_value_per_kwh = 6000
        # TODO: Improve this by states
        usable_roof = 0.6
        kg_co2_per_kwh = 0.94

        avg_solar_system_cost = [
            {'avgSolarSystemSize': 10, 'application': "residential", 'lowPrice': 2, 'highPrice': 3},
            {'avgSolarSystemSize': 250, 'application': "commerical", 'lowPrice': 1.5, 'highPrice': 3.5}
        ]

        if post_data is not None:
            state_input = str(address_components["administrative_area_level_1"])

            state_result = list(filter(lambda state: state['state'] == state_input, states_solar_data_json_data))
            print(state_result)

            rebate = 0

            avg_kw_per_meter2 = state_result[0]['annualConsumption'] / avg_roof_size
            avg_yearly_bill = (avg_kw_per_meter2 * roof_area) * state_result[0]['costPerKWatt']

            kwh_per_day = (avg_yearly_bill / state_result[0]['costPerKWatt']) / 365
            daily_solar_production = kwh_per_day * avg_day_time_usage
            system_size = daily_solar_production / state_result[0]['avgDailyKWhPerInstalledKW']

            # TODO: make this better
            system_cost_by_size = list(filter(lambda x: x['avgSolarSystemSize'] > system_size, avg_solar_system_cost))
            estimate_low_price = system_cost_by_size[0]['lowPrice'] * system_size * 1000
            estimate_high_price = system_cost_by_size[0]['highPrice'] * system_size * 1000

            avg_cost = math.floor((estimate_low_price + estimate_high_price) / 2)

            if state_result[0]['country'] == "AU":
                postcode = int(address_components["postal_code"])
                # TODO: ensure this works properly
                stc_result = [item for item in stc_json_data if item['postcodeFrom'] > postcode and item['postcodeTo'] > postcode]

                deeming_period = 14
                stc_price = 38.50
                stc_credits = math.floor(stc_result[0]['Rating'] * deeming_period * system_size)
                # stc_credits = Math.floor(STCresult.Rating * deemingPeriod * systemSize)

                rebate = stc_price * stc_credits

            elif state_result[0]['country'] is "US":
                rebate = math.floor(avg_cost * 0.3)

            avg_cost_with_rebate = avg_cost - rebate

            yearly_bill_with_solar = ((kwh_per_day - daily_solar_production) * state_result[0]['costPerKWatt']) * 365

            yearly_savings = round(avg_yearly_bill - yearly_bill_with_solar)
            years_to_payoff = avg_cost_with_rebate - yearly_savings

            increse_in_home_value = round(increase_home_value_per_kwh * system_size)
            co2_displaced = round((kg_co2_per_kwh * daily_solar_production * 365 * 15) / 1000)

            # 15 year bills without solar
            avg_yearly_bill_over_15_years = []
            for year in range(0,15):
                inflation_cost = avg_yearly_bill * energy_inflation_rate * year
                new_avg_yearly_bill = math.floor(avg_yearly_bill + inflation_cost)
                avg_yearly_bill_over_15_years.append(new_avg_yearly_bill)

            # 15 year bills with solar
            avg_yearly_bill_with_solar_over_15_years = []
            for year in range(0,15):
                inflation_cost_with_solar = yearly_bill_with_solar * energy_inflation_rate * year
                new_avg_yearly_bill_with_solar = math.floor(yearly_bill_with_solar + inflation_cost_with_solar)
                avg_yearly_bill_with_solar_over_15_years.append(new_avg_yearly_bill_with_solar)

            response_object = {
                'status': 'success',
                'message': 'success',
                'solar_calc_outcomes': {
                    'solar_is_better': True if (yearly_savings > 0) else False,
                    'yearly_savings': yearly_savings,
                    'years_to_payoff': years_to_payoff,
                    'estimate_system_cost': avg_cost,
                    'estimate_system_cost_with_rebate': avg_cost_with_rebate,
                    'estimate_rebate': rebate,
                    'avg_yearly_bill_over_15_years': avg_yearly_bill_over_15_years,
                    'avg_yearly_bill_with_solar_over_15_years': avg_yearly_bill_with_solar_over_15_years,
                    'increse_in_home_value': increse_in_home_value,
                    'co2_displaced': co2_displaced,
                }
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
