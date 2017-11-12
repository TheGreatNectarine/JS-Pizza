var api = require('../API');
var PizzaCart = require('./PizzaCart');
var cart = PizzaCart.cart;

$('.go-on-button').click(function () {

    var name = $('#input_name').val();
    var number = $('#input_phone').val();
    var address = $('#input_address').val();
    var valid_name = validate_name(name);
    var valid_number = validate_number(number);
    var valid_address = validate_address(address);
    if (!valid_address) {
        $('#input_address').addClass('is-invalid');
        $('.address-help-block').show(0);
    } else {
        $('#input_address').removeClass('is-invalid');
        $('.address-help-block').hide(0);
    }

    if (!valid_name) {
        $('#input_name').addClass('is-invalid');
        $('.name-help-block').show(0);
    } else {
        $('#input_name').removeClass('is-invalid');
        $('.name-help-block').hide(0);
    }

    if (!valid_number) {
        $('#input_phone').addClass('is-invalid');
        $('.phone-help-block').show(0);
    } else {
        $('#input_phone').removeClass('is-invalid');
        $('.phone-help-block').hide(0);
    }
    var valid = valid_number && valid_name && valid_address;
    if (valid) {
        var order = {
            cart: cart,
            name: name,
            phone_number: number,
            address: address
        };
        api.createOrder(order, function () {
            console.log(order);
        })
    } else {
        return this;
    }
});

validate_name = function (name) {
    var regex = /^[a-zA-Zа-яА-Я \-]{2,30}$/;
    return regex.test(name);
};

validate_number = function (number) {
    if (number.startsWith('0')) {
        number = '+38'.concat(number);
    }
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return regex.test(number);
};

validate_address = function (address) {
    address.replace(/\s/g, '');
    return address.length !== 0;
};