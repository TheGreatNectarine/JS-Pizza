/**
 * Created by diana on 12.01.16.
 */

var pizza_info = [
    {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        title: "impreza",
        type: 'meat pizza',
        content: {
            meat: ['snood', 'salami'],
            chicken: ['chicken'],
            cheese: ['mozzarella', 'rockford'],
            pineapple: ['pineapples'],
            additional: ['tomato paste', 'parsley']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,
        is_popular:true

    },
    {
        id:2,
        icon:'assets/images/pizza_2.jpg',
        title: "bbq",
        type: 'meat pizza',
        content: {
            meat: ['hunter\'s sausage', 'pepperoni', 'ham'],
            cheese: ['gouda'],
            mushroom: ['white mushroom'],
            additional: ['parsley', 'olives']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id:3,
        icon:'assets/images/pizza_1.jpg',
        title: "mixy polo",
        type: 'meat pizza',
        content: {
            meat: ['snood', 'smoked chicken'],
            cheese: ['mozzarella'],
            pineapple: ['pineapples'],
            additional: ['corn', 'parsley', 'tomato sauce']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id:4,
        icon:'assets/images/pizza_5.jpg',
        title: "sicilliano",
        type: 'meat pizza',
        content: {
            meat: ['snood', 'salami'],
            cheese: ['mozzarella'],
            mushroom: ['white mushrooms'],
            additional: ['bell pepper',  'tomato sauce']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id:17,
        icon:'assets/images/pizza_3.jpg',
        title: "margherita",
        type: 'vega',
        content: {
            cheese: ['mozzarella', 'gouda'],
            tomato: ['tomatoes'],
            additional: ['basil', 'olive oil', 'tomato sauce']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id:43,
        icon:'assets/images/pizza_6.jpg',
        title: "flavour mix",
        type: 'meat pizza',
        content: {
            meat: ['hunter\'s sausages'],
            cheese: ['mozzarella'],
            mushroom: ['white mushrooms'],
            pineapple: ['pineapples'],
            additional: ['crimean onion', 'pickles', 'mustard']
        },
        small_size:{
            weight: 470,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id:90,
        icon:'assets/images/pizza_8.jpg',
        title: "dolce mare",
        type: 'seafood pizza',
        content: {
            ocean: ['tiger shrimps', 'mussels', 'red caviar', 'salmon fillet'],
            cheese: ['mozzarella'],
            additional: ['olive oil', 'cream']
        },
        big_size:{
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id:6,
        icon:'assets/images/pizza_4.jpg',
        title: "rosso gusto",
        type: 'seafood pizza',
        content: {
            ocean: ['red caviar', 'smoked salmon'],
            cheese: ['mozzarella'],
            additional: ['olive oil', 'cream']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 189
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299
        }
    }
];

module.exports = pizza_info;