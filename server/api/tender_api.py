from flask import Blueprint
from flask_restful import Api, Resource, abort, reqparse, fields, marshal

from server import db, app
from server.models import Tender
from server.schemas import tenders_schema
from server.utils.auth import requires_auth

tender_api = Api(Blueprint('tender_api', __name__))

@tender_api.resource('/tender/')
class TenderAPI(Resource):

    @requires_auth
    def get(self):

        tenders = Tender.query.all()
        result = tenders_schema.dump(tenders)

        return {'tenders': result}


    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, required = True,)

        super().__init__()