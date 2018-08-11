from flask import render_template, Flask, send_from_directory, request, make_response
import os
from json import dumps, loads

app = Flask(__name__)

@app.route("/vendor/<path:p>")
def vendor_handle(p):
    return send_from_directory("vendor", p)

@app.route("/css/<path:p>")
def css_handle(p):
    return send_from_directory("css", p)

@app.route("/js/<path:p>")
def js_handle(p):
    return send_from_directory("js", p)

@app.route("/include/<path:p>")
def include_handle(p):
    return send_from_directory("include", p)

@app.route("/fonts/<path:p>")
def fonts_handle(p):
    return send_from_directory("fonts", p)

@app.route("/images/<path:p>")
def images_handle(p):
    return send_from_directory("images", p)

@app.route("/third-party-scripts/<path:p>")
def third_party_scripts_handle(p):
    return send_from_directory("third-party-scripts", p)

dishes_list = {
    1: { "title": "Борщ", "cost": 49.99, "url": "/public/tomato_soup.png" },
    2: { "title": "Суп", "cost": 14.99, "url": "/public/soup.png"},
    3: { "title": "Харчо", "cost": 99.99, "url": "/public/harcho.png" },
    4: { "title": "Солянка", "cost": 124.99, "url": "/public/solianka.png" },
    5: { "title": "Рассольник", "cost": 30.00, "url": "/public/rassolnik.png" },
    6: { "title": "Сухари", "cost": 69.99, "url": "/public/suhari.png"},
    7: { "title": "Картошка по селянски", "cost": 79.99, "url": "/public/potato_1.png"},
    8: { "title": "Картошка жареная", "cost": 19.99, "url": "/public/potato_2.png" },
    9: { "title": "Сосики охотничьи", "cost": 24.99, "url": "/public/sousages.png" },
    10: { "title": "Лаваш", "cost": 49.99, "url": "/public/lavash.png" }
}

dish_blocks = [
    {
        "title": "Первые блюда",
        "label": "first_cources",
        "dishes": [1, 2, 3, 4, 5]
    },
    {
        "title": "Закуски",
        "label": "snacks",
        "dishes": [5, 6, 7, 8, 9, 10]
    },
]

@app.route("/index.html")
def index_handle():
    dishes_list_json=dumps(dishes_list)
    return render_template("index.html", 
        dish_blocks=dish_blocks, 
        dishes_list=dishes_list, 
        dishes_list_json=dishes_list_json)

@app.route("/cart.html")
def cart_handle():
    in_cart = {}
    try:
        in_cart = loads(list(request.cookies.keys())[0])
        in_cart_new = {}
        for key in in_cart.keys():
            in_cart_new[int(key)] = in_cart[key]
        in_cart = in_cart_new
    except Exception as _:
        pass
    
    return render_template("cart.html",
        in_cart_dishes=in_cart,
        dishes_list=dishes_list)

app.run(host="0.0.0.0", port=80, debug=True)