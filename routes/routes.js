const carsList = require('../Controllers/MockCarsController');

module.exports = function(app) {
    app.route('/cars')
        .get(carsList.getAll)
        .post(carsList.createNew);         //Create

    app.route('/cars/:id')
        .get(carsList.getById)            //Read
        .put(carsList.editById)            //Update
        .delete(carsList.deleteById);      //Delete
}