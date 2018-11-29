module.exports = function(app){
    var dbController = require('../controller/db');
    /**
     * input peopleName => output peoInfo
     * @param {String} peopleName
     */
    app.route('/db/peopleInfo').get(dbController.retrievePeopleInfo);
    app.route('/db/peopleInfo').post(dbController.createPeopleInfo);
    app.route('/db/dramaInfo').get(dbController.retrieveDramaInfo);
    app.route('/db/dramaInfo').post(dbController.createDramaInfo);
    // app.route('/db/relation').get(dbController.retrieveRelation);
    app.route('/db/relation').post(dbController.createRelation);
}