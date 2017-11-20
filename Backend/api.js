/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var base64 = require('../Frontend/src/pizza/PizzaOrderPage.js').base64;
var sha1 = equire('../Frontend/src/pizza/PizzaOrderPage.js').sha1;

exports.getPizzaList = function (req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function (req, res) {
    var order_info = req.body;

    var str_order = '';
    var sum = 0;
    order_info.forEach(function (e) {
        var str = e.quantity + 'x ' + e.title + '[' + e.size + '];        ';
        str_order += str;
        sum += e.price
    });
    str_order += 'Total: ' + sum + ' UAH ';

    var order_inf = {
        name: order_info.name,
        phone: order_info.phone,
        address: order_info.address,
        order_description: str_order,
        total: order_info.price,
        currency: 'UAH',
        order_id: Math.random(),

        success: true
    };

    var order = {
        version: 3,
        public_key: 'i31075679794',
        action: "pay",
        amount: order_info.price,
        currency: "UAH",
        description: str_order,
        order_id: Math.random(),
        sandbox: 1
    };

    console.log("Creating Order", order_inf);

    var data = base64(JSON.stringify(order));
    var signature = sha1('i31075679794' + data + '1J88kEHdZvhzQ9H4aW2XOQ9KAvTzMVl24g9uFeRl');

    res.send({
        data: data,
        signature: signature
    });
};