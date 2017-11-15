/**
 * Created by chaika on 02.02.16.
 */
var Storage = require('../LocalStorage');

var Templates = require('../Templates');

var API = require('../API');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var cart = Storage.get('cart');
if (!cart)
    cart = [];

//HTML едемент куди будуть додаватися піц
var $cart = $(".cart");

var order_count = cart.length;

// order_count++; //to make it integer

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    var is_new = true;
    cart.forEach(function (item) {
        if (item.pizza.id === pizza.id && item.size === size) {
            is_new = false;
        }
    });
    if (is_new) {
        cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    } else {
        cart.forEach(function (item) {
            if (item.pizza.id === pizza.id && item.size === size) {
                item.quantity++;
            }
        });
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var before = cart.slice(0, cart.indexOf(cart_item));
    var after = cart.slice(cart.indexOf(cart_item) + 1, cart.length);
    cart = before.concat(after);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzasInCart() {
    //Повертає піци які зберігаються в кошику
    return cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    order_count = cart.length;
    $(".order-count").html(order_count);
    //TODO
    if (cart.length === 0) {
        $(".no-order-text").append("<div class=\"no-order-text\">empty</div>");
    } else {
        $(".no-order-text").remove();
    }
    //Очищаємо старі піци в кошику
    $cart.html("");
    if (cart.length === 0) {
        $("#place-order").prop("disabled", true);
        $cart.html("<div class=\"attraction\">\n" +
            "           what a time<br>to order some pizza" +
            "      </div>");
    } else {
        $("#place-order").prop("disabled", false);
    }

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {

        var html_code = "";

        if (window.location.href === "http://localhost:5050/#") {

            html_code = Templates.PizzaCart_OneItem(cart_item);

        } else if (window.location.href === "http://localhost:5050/order.html") {
            html_code = Templates.PizzaCart_OneItem_Order(cart_item);
        }

        var $node = $(html_code);


        action($node, ".plus", function () {
            //Збільшуємо кількість замовлених піц
            increment(cart_item);
            order_count++;
            //Оновлюємо відображення
            updateCart();
        });

        action($node, ".minus", function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            var removed = false;
            if (cart_item.quantity < 1) {
                removeFromCart(cart_item);
                removed = true;
            }
            if (!removed)
            //Оновлюємо відображення
                updateCart();
        });

        action($node, ".count-clear", function () {
            removeFromCart(cart_item);
        });

        $(".clear-order").click(function () {
            cart = [];
            updateCart();
        });

        $cart.append($node);

    }


    cart.forEach(showOnePizzaInCart);
    update_total_price(cart);

    Storage.set('cart', cart);

}

function action(html, element_class, act) {
    html.find(element_class).click(act);
}

function increment(cart_item) {
    cart_item.quantity += 1;
}

function update_total_price(cart) {
    $(".total-price").html(total_price(cart) === 0 ? 'cart is empty' : total_price(cart) + "UAH");
    $(".total-price-title").html(total_price(cart) === 0 ? '' : 'total price');
}

function total_price(cart) {
    var res = 0;
    for (var i = 0; i < cart.length; i++) {
        res += cart[i].pizza[cart[i].size].price * cart[i].quantity;
    }
    console.log(res);
    return res;
}

function createOrder(callback) {
    API.createOrder({
        name: $('#input_name').val(),
        phone: $('#input_phone').val(),
        address: $('#input_address').val(),
        order: cart
    }, function (err, result) {
        if (err) {
            return callback(err)
        } else {
            callback(null, result);
        }
    });
}
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.createOrder = createOrder;

exports.cart = cart;

exports.getPizzaInCart = getPizzasInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;