module.exports = function(app){
    var crawlingController = require('../controller/crawlingController');

    app.route('/daum/dramaInfo').get(crawlingController.daumDramaInfo);
}