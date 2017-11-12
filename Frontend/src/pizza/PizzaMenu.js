/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
// var API = require('../API');
// var Pizza_List = {};
var Pizza_List = require("../Pizza_List")
//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

$("li").click(function () {
    $("li").removeClass("active");
    $(this).addClass("active");
    var id = $(this).attr("id");
    filterPizza(id);
});

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}


function filterPizza(filter_id) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    Pizza_List.forEach(function (pizza) {
        switch (filter_id) {
            case 'all-pizza':
                pizza_shown.push(pizza);
                break;
            case 'premium':
                if (premium(pizza)) pizza_shown.push(pizza);
                break;
            case 'mozzarella':
                if (mozzarella(pizza)) pizza_shown.push(pizza);
                break;
            case 'pineapples':
                if (pineapples(pizza)) pizza_shown.push(pizza);
                break;
            case'meat':
                if (meat(pizza)) pizza_shown.push(pizza);
                break;
            case'vega':
                if (vega(pizza)) pizza_shown.push(pizza);
                break;
        }

    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function premium(pizza) {
    return 'ocean' in pizza['content'];

}

function mozzarella(pizza) {
    return pizza['content']['cheese'].pizza_contains('mozzarella');
}

function pineapples(pizza) {
    return pizza['content'].hasOwnProperty('pineapple');
}

function meat(pizza) {
    return pizza['type'] === 'meat pizza';
}

function vega(pizza) {
    return pizza['type'] === 'vega';
}

Array.prototype.pizza_contains = function (val) {
    var found = false;
    this.forEach(function (t) {
        if (t === val)
            found = true;
    });
    return found;
};


function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;