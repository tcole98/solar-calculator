from server import models, db


def create_url(street_number, route, state):
    route_names = route.split(' ')
    route_str = ""

    for name in route_names:
        route_str += str(name + '-')

    # url = 180-tennyson%20street-elwood-vic
    url = str(street_number) + '-' + str(route_str).lower() + str(state).lower()

    return url


def create_new_building(lat=None, lng=None, place_id=None, state=None, country=None,
                        locality=None, postal_code=None, route=None, formatted_address=None,
                        street_number=None):

    url = create_url(street_number=street_number, route=route, state=state)

    building = models.Building(
        lat=lat,
        lng=lng,
        place_id=place_id,
        state=state,
        country=country,
        locality=locality,
        postal_code=postal_code,
        street_number=street_number,
        route=route,
        url=url
    )

    db.session.add(building)
    db.session.commit()

    return building
