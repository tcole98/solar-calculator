from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from rq import Queue
from rq.job import Job
# from server import worker

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from .api.building_api import building_blueprint
from .api.solar_calc_api import solar_calc_blueprint
from .views.index import index_view

app.register_blueprint(building_blueprint, url_prefix='/api')
app.register_blueprint(solar_calc_blueprint, url_prefix='/api')
app.register_blueprint(index_view)

# q = Queue(connection=worker.conn)
