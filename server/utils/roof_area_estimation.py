from server import db, models


def create_new_roof_area_estimation(building, area, center_latitude, center_longitude, estimation_point_list):
    new_roof_area_estimation = models.RoofAreaEstimation(area=area, center_latitude=center_latitude,
                                                         center_longitude=center_longitude)
    new_roof_area_estimation.building = building

    db.session.add(new_roof_area_estimation)

    db.session.commit()

    return new_roof_area_estimation
