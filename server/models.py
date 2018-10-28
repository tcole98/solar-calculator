from server import db
import datetime


class ModelBase(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class Building(ModelBase):
    """
        Establishes a building in the database.
        lat, lng, place_id, state etc. are all pulled from Google maps
    """
    __tablename__ = 'building'

    lat                      = db.Column(db.Float())
    lng                      = db.Column(db.Float())

    place_id                 = db.Column(db.String())
    state                    = db.Column(db.String())
    country                  = db.Column(db.String())
    locality                 = db.Column(db.String())
    postal_code              = db.Column(db.String())
    route                    = db.Column(db.String())
    street_number            = db.Column(db.String())

    url                      = db.Column(db.String())

    roof_area_estimation     = db.relationship('RoofAreaEstimation', backref='building',
                                               lazy='dynamic', foreign_keys='RoofAreaEstimation.building_id')


class RoofAreaEstimation(ModelBase):
    """
        Roof area estimation tied to a specific building.
        Estimated lat & lng stored to 5 decimal points
    """
    __tablename__ = 'roof_area_estimation'

    area                    = db.Column(db.Float())
    center_latitude         = db.Column(db.Float())
    center_longitude        = db.Column(db.Float())

    building_id             = db.Column(db.Integer, db.ForeignKey("building.id"))

    estimation_points       = db.relationship('EstimationPoints', backref='roof_area_estimation',
                                              lazy='dynamic', foreign_keys='EstimationPoints.roof_area_estimation_id')


class EstimationPoints(ModelBase):
    """
        We store the paths of a polygon submitted by the user here
        These make up the roof area estimation area
    """
    __tablename__ = 'estimation_points'

    latitude                    = db.Column(db.Float())
    longitude                   = db.Column(db.Float())

    roof_area_estimation_id     = db.Column(db.Integer, db.ForeignKey('roof_area_estimation.id'))
