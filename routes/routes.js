const car = require('../Controllers/CarController');

module.exports = function(app) {
    app.route('/cars')
        .get(car.getAll)
        .post(car.createNew);         //Create

    app.route('/cars/:id')
        .get(car.getById)            //Read
        .put(car.editById)            //Update
        .delete(car.deleteById);      //Delete

}