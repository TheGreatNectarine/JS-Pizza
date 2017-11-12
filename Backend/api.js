/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function (req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function (req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    var cart = {};
    order_info.order.forEach(function (e) {
        cart[e] = e.title;
    });

    res.send({
        name: order_info.name,
        phone: order_info.phone,
        address: order_info.address,
        order: cart,
        success: true
    });
};