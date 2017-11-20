var f_api = require('../FRONT_API');
var PizzaCart = require('./PizzaCart');
var cart = PizzaCart.cart;
var crypto = require('crypto');

function init_order_page() {

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

        var input_address = $('#input_address');
        var address = input_address.val();
        if (address) {
            geocodeAddress(address, function (error, coordinates) {
                if (!error) {
                    home_marker.setPosition(coordinates);
                    geocodeLatLng(coordinates, function (err, data) {
                        if (!err) {
                            $('#delivery-address').text(data);
                        } else {
                            console.log(err);
                        }
                    })
                }
            });
            calculateRoute(directionsDisplay, marker.position, home_marker.position, function (err, data) {
                if (!err) {
                    $('#delivery-time').val(data.duraion);
                    //settime
                }
            });
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
            f_api.createOrder(order, function (err, data) {
                if (!err) {
                    LiqPayCheckout.init({
                        data: order,
                        signature: data.signature,
                        embedTo: "#liqpay",
                        mode: "popup"	//	embed	||	popup
                    }).on("liqpay.callback", function (data) {
                        console.log(data.status);
                        console.log(data);
                    }).on("liqpay.ready", function (data) {
//	ready
                    }).on("liqpay.close", function (data) {
//	close
                    });
                }
            });

        } else {
            return this;
        }
    });

    var validate_name = function (name) {
        var regex = /^[a-zA-Zа-яА-Я \-]{2,30}$/;
        return regex.test(name);
    };

    var validate_number = function (number) {
        if (number.startsWith('0')) {
            number = '+38'.concat(number);
        } else if (!number.startsWith('+') && !number.startsWith('0')) {
            number = '+'.concat(number);
        }
        var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return regex.test(number);
    };

    var validate_address = function (address) {
        address.replace(/\s/g, '');
        return address.length !== 0;
    };

    if (home_marker) {

    }
}

function init_map_vars() {
    html_element = document.getElementById("googleMap");
    mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 11
    };
    map = new google.maps.Map(html_element, mapProp);
    var point = new google.maps.LatLng(50.464379, 30.519131);
    marker = new google.maps.Marker({
        position: point,
        map: map
        // icon: "../../www/assets/images/map-icon.png"
    });
    home_marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
    });
    directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    });
}

var html_element;
var map;
var mapProp;
var home_marker;
var marker;
var directionsDisplay;

function initialize() {
//Тут починаємо працювати з картою
    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;
        home_marker.setPosition(coordinates);
        geocodeLatLng(coordinates, function (err, address) {
            if (!err) {
                $('#input_address').val(address);
                $('#delivery-address').text(address);
                calculateRoute(directionsDisplay, marker.position, coordinates, function (err, data) {
                    if (!err) {
                        $('#delivery-time').text(data.duration.text);
                    } else {
                        //log
                    }
                })
            } else {
                console.log("Немає адреси")
            }
        })
    });


}

function geocodeLatLng(latlng, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var adress = results[1].formatted_address;
            callback(null, adress);
        } else {
            callback(new Error("Can't	find	address"));
        }
    });
}


function geocodeAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            home_marker.setPosition(coordinates);
            calculateRoute(directionsDisplay, marker.position, home_marker.position, function (err, data) {
                if (!err) {
                    $('#delivery-time').text(data.duration.text);
                    console.log(data.duration)
                }
            });
            callback(null, coordinates);
        } else {
            callback(new Error("Can	not	find the address"));
        }
    });
}

function calculateRoute(renderer, A_latlng, B_latlng, callback) {
    // home_marker.setPosition(B_latlng);
    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            renderer.setDirections(response);
            var leg = response.routes[0].legs[0];
            callback(null, {
                duration: leg.duration
            });
        } else {
            callback(new Error("Can'	not	find	direction"));
        }
    });
}

function base64(str) {
    return new Buffer(str).toString('base64');
}


function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

exports.initialize_maps = initialize;
exports.init_order_page = init_order_page;
exports.init_map_vars = init_map_vars;
exports.base64 = base64;
exports.sha1 = sha1;