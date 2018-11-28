module.exports = function(app){
    var dbController = require('../controller/db');
    /**
     * input peopleName => output peoInfo
     * @param {String} peopleName
     */
    app.route('/db/peopleInfo').get(dbController.retrievePeopleInfo);
    app.route('/db/peopleInfo').post(dbController.createPeopleInfo);
    app.route('/db/dramaInfo').post(dbController.createDramaInfo);
}