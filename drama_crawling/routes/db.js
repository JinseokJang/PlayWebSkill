module.exports = function(app){
    var dbController = require('../controller/db');
    /**
     * input peopleName => output peoInfo
     * @param {String} peopleName
     */
    app.route('/db/peopleInfo').get(dbController.getPeopleInfo);
    app.route('/db/peopleInfo').post(dbController.postPeopleInfo);
}