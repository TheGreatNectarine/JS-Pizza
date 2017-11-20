/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function (req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function (req, res) {
    var order_info = req.body;


    var str_order = '';
    var sum = 0;
    order_info.order.forEach(function (e) {
        var str = e.quantity + 'x ' + e.title + '[' + e.size + '];        ';
        str_order += str;
        sum += e.price
    });
    str_order += 'Total: ' + sum + ' UAH ';

    var order = {
        name: order_info.name,
        phone: order_info.phone,
        address: order_info.address,
        order: str_order,
        success: true
    };

    console.log("Creating Order", order);

    res.send(order);
};