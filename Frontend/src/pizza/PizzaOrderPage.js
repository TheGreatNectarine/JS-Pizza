var api = require('../API');
var PizzaCart = require('./PizzaCart');
var cart = PizzaCart.cart;

$('#input_name').on('input', function () {
    var valid_name = validate_name($('#input_name').val());
    if (!valid_name) {
        $('.input-name').addClass('has-error');
        $('.name-help-block').show(0);
    } else {
        $('.input-name').removeClass('has-error');
        $('.input-name').addClass('has-success');
        $('.name-help-block').hide(0);
    }
});

$('#input_phone').on('input', function () {
    var valid_number = validate_number($('#input_phone').val());
    if (!valid_number) {
        $('.input-phone').addClass('has-error');
        $('.phone-help-block').show(0);
    } else {
        $('.input-phone').removeClass('has-error');
        $('.input-phone').addClass('has-success');
        $('.phone-help-block').hide(0);
    }
});

$('#input_address').on('input', function () {
    var valid_address = validate_address($('#input_address').val());
    if (!valid_address) {
        $('.input-address').addClass('has-error');
        $('.address-help-block').show(0);
    } else {
        $('.input-address').removeClass('has-error');
        $('.input-address').addClass('has-success');
        $('.address-help-block').hide(0);
    }
});

$('.go-on-button').click(function () {

    var name = $('#input_name').val();
    var number = $('#input_phone').val();
    var address = $('#input_address').val();
    var valid_name = validate_name(name);
    var valid_number = validate_number(number);
    var valid_address = validate_address(address);
    var valid = valid_number && valid_name && valid_address;
    if (!valid_name) {
        $('.input-name').addClass('has-error');
        $('.name-help-block').show(0);
    } else {
        $('.input-name').removeClass('has-error');
        $('.input-name').addClass('has-success');
        $('.name-help-block').hide(0);
    }
    if (!valid_number) {
        $('.input-phone').addClass('has-error');
        $('.phone-help-block').show(0);
    } else {
        $('.input-phone').removeClass('has-error');
        $('.input-phone').addClass('has-success');
        $('.phone-help-block').hide(0);
    }
    if (!valid_address) {
        $('.input-address').addClass('has-error');
        $('.address-help-block').show(0);
    } else {
        $('.input-address').removeClass('has-error');
        $('.input-address').addClass('has-success');
        $('.address-help-block').hide(0);
    }
    if (valid) {
        var order = {
            cart: cart,
            name: name,
            phone_number: number,
            address: address
        };
        api.createOrder(order, function () {
            console.log("server received order: \n");
            console.log("recipient name: " + order.name + "\nnumber: " + order.phone_number + "\naddress: " + order.address);
            order.cart.forEach(function (pizza) {
                console.log('pizza: ' + pizza.pizza.title + '\tsize: ' + pizza.size + '\tquantity: ' + pizza.quantity);
            });
        });
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
    } else if (!number.startsWith('+') && !number.startsWith('0')) {
        number = '+'.concat(number);
    }
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return regex.test(number);
};

validate_address = function (address) {
    address.replace(/\s/g, '');
    return address.length !== 0;
};