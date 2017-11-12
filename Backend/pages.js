/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function (req, res) {
    res.render('mainPage', {
        pageTitle: 'kmizza.com'
    });
};

exports.orderPage = function (req, res) {
    res.render('orderPage', {
        pageTitle: 'Confirm order'
    });
};