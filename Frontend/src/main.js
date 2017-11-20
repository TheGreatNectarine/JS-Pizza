/**
 * Created by chaika on 25.01.16.
 */

$(function () {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');
    var PizzaOrderPage = require('./pizza/PizzaOrderPage');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    if (window.location.href.contains('order_description')) {
        PizzaOrderPage.init_map_vars();
        PizzaOrderPage.initialize_maps();
        PizzaOrderPage.init_order_page();
    }


});