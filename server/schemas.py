from marshmallow import Schema, fields


class BuildingSchema(Schema):
    id                          = fields.Int(dump_only=True)
    created                     = fields.DateTime(dump_only=True)

    place_id                    = fields.Str()
    state                       = fields.Str()
    country                     = fields.Str()
    locality                    = fields.Str()
    postal_code                 = fields.Str()
    route                       = fields.Str()
    street_number               = fields.Str()

    url                         = fields.Str()

    roof_area_estimation        = fields.Nested('RoofAreaEstimationSchema')


class RoofAreaEstimationSchema(Schema):
    id                          = fields.Int(dump_only=True)
    created                     = fields.DateTime(dump_only=True)

    area                        = fields.Float()
    center_latitude             = fields.Float()
    center_longitude            = fields.Float()

    estimation_points           = fields.Nested('EstimationPointsSchema')
    solar_calc_results          = fields.Nested('SolarCalcResultsSchema')


class EstimationPointsSchema(Schema):
    id                          = fields.Int(dump_only=True)
    created                     = fields.DateTime(dump_only=True)

    latitude                    = fields.Float()
    longitude                   = fields.Float()


class SolarCalcResultsSchema(Schema):
    id                                          = fields.Int(dump_only=True)
    created                                     = fields.DateTime(dump_only=True)

    yearly_savings                              = fields.Int()
    years_to_payoff                             = fields.Float()
    estimate_system_cost                        = fields.Int()
    estimate_system_cost_with_rebate            = fields.Int()
    estimate_rebate                             = fields.Int()
    increase_in_home_value                      = fields.Int()
    co2_displaced                               = fields.Int()

    solar_is_better                             = fields.Boolean()


building_schema     = BuildingSchema()
buildings_schema    = BuildingSchema(many=True)

solar_calc_results_schema     = SolarCalcResultsSchema()

roof_area_estimation = RoofAreaEstimationSchema()
