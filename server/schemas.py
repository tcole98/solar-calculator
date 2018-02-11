from marshmallow import Schema, fields, validate, validates_schema, ValidationError, pre_load, pre_dump, fields
from server import app, models


# Schemas

class UserSchema(Schema):
    id                  = fields.Int(dump_only=True)
    created             = fields.DateTime(dump_only=True)

class OAuthProfileSchema(Schema):
    id                  = fields.Int(dump_only=True)
    created             = fields.DateTime(dump_only=True)

class TenderSchema(Schema):
    id                  = fields.Int(dump_only=True)
    created             = fields.DateTime(dump_only=True)

    sector              = fields.String()
    state               = fields.String()
    city                = fields.String()
    budget              = fields.Int()

    title               = fields.String()
    description         = fields.String()

# Schema Exports

tender_schema       = TenderSchema()
tenders_schema       = TenderSchema(many=True)

user_schema         = UserSchema()
users_schema        = UserSchema(many=True)