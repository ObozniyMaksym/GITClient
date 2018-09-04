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

var add_to_cart = function(dish_id) 
{
    try {
        cookie = JSON.parse(document.cookie);
    } catch (err) {
        cookie = {};
    }

    if(!cookie[dish_id]) {
        cookie[dish_id] = 1;
    }
    else {
        cookie[dish_id]++;
    }

    document.cookie = JSON.stringify(cookie)
    update_dropdown()
}

var delete_from_cart = function(dish_id)
{
    try {
        cookie = JSON.parse(document.cookie);
    } catch (err) {
        return;
    }

    delete cookie[dish_id];
    document.cookie = JSON.stringify(cookie)
    update_dropdown();
}

var update_dropdown = function()
{
    var cookie = {}
    try {
        cookie = JSON.parse(document.cookie);   
    } catch (err) {
        null   
    }
    dropdown = document.getElementById("cart-dropdown-main");
    dropdown.innerHTML = "";

    var summary = 0.0

    if(Object.keys(cookie).length == 0)
    {
        dropdown.innerHTML += "Ваша корзина пустая";
    }

    Object.keys(cookie).forEach(function(key) {
        dropdown.innerHTML +=
        `
        <li class="header-cart-item">
            <div class="header-cart-item-img" onclick="delete_from_cart(${key})">
				<img src="http://localhost:5000${dishes_list[key].url}" alt="IMG">
			</div>

			<div class="header-cart-item-txt">
				<a href="#" class="header-cart-item-name">
					${dishes_list[key].title}
				</a>

                <span class="header-cart-item-info">
                    ${cookie[key]} x ₴${dishes_list[key].cost}
                </span>
			</div>
		</li>
        `

        summary += dishes_list[key].cost * cookie[key]
    });

    document.getElementById("cart-dropdown-summary").innerHTML = "Итог: ₴" + summary.toFixed(2)
    document.getElementById("cart-size").innerHTML = Object.keys(cookie).length
}

window.onload = function() {
    update_dropdown();
}