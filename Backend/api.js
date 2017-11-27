/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var crypto = require('crypto');

var private_key = "1J88kEHdZvhzQ9H4aW2XOQ9KAvTzMVl24g9uFeRl";
var public_key = "i31075679794";

exports.getPizzaList = function (req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function (req, res) {
    var order_info = req.body;

    var order = {
        version: 3,
        public_key: public_key,
        action: "pay",
        amount: order_info.amount,
        currency: "UAH",
        description: order_info.description,
        order_id: Math.random(),
        sandbox: 1
    };

    var data = base64(JSON.stringify(order));
    var signature = sha1(private_key + data + private_key);

    res.send({
        signature: signature,
        data: data,
        success: true
    });
};

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function base64(str) {
    return new Buffer(str).toString('base64');
}