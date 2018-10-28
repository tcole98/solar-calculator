from server import db, models


def create_new_estimation_points(roof_area_estimation, estimation_point_list):
    for estimation_point in estimation_point_list:
        lat_lng = estimation_point.split(',')

        lat = float(lat_lng[0])
        lng = float(lat_lng[1])

        new_estimation_points = models.EstimationPoints(latitude=lat, longitude=lng)
        new_estimation_points.roof_area_estimation = roof_area_estimation

        db.session.add(new_estimation_points)
        db.session.commit()

