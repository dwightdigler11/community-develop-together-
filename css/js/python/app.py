from flask import Flask, jsonify

app = Flask(__name__)


# =====================================
# PROPERTY DATA
# =====================================

properties = [

    {
        "id": 1,
        "name": "Modern Kampala Villa",
        "type": "sale",
        "location": "Kampala",
        "price": 450000000
    },

    {
        "id": 2,
        "name": "Lake View Family Home",
        "type": "rent",
        "location": "Entebbe",
        "price": 4500000
    },

    {
        "id": 3,
        "name": "Prime Residential Land",
        "type": "land",
        "location": "Naalya",
        "price": 180000000
    }

]


# =====================================
# HOME
# =====================================

@app.route("/")
def home():

    return "Eoto Properties Management Server"


# =====================================
# GET PROPERTIES
# =====================================

@app.route("/api/properties")
def get_properties():

    return jsonify(properties)


# =====================================
# GET ONE PROPERTY
# =====================================

@app.route("/api/properties/<int:property_id>")
def get_property(property_id):

    for property in properties:

        if property["id"] == property_id:

            return jsonify(property)


    return jsonify({
        "error": "Property not found"
    }), 404


# =====================================
# RUN SERVER
# =====================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )