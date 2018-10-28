from marshmallow import Schema, fields


class BuildingSchema(Schema):
    lat                         = fields.Float()
    lng                         = fields.Float()

    place_id                    = fields.Str()
    formatted_address           = fields.Str()

    url                         = fields.Str()


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


building_schema     = BuildingSchema()
buildings_schema    = BuildingSchema(many=True)

roof_area_estimation = RoofAreaEstimationSchema()
