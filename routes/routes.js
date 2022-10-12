const car = require('../Controllers/CarController');
const mainController = require("../controllers/mainController");
const User = require('../Models/userModel');

module.exports = function(app) {
    app.route('/cars')
        .get(car.getAll)
        .post(car.createNew);         //Create

    app.route('/cars/:id')
        .get(car.getById)            //Read
        .put(car.editById)            //Update
        .delete(car.deleteById);      //Delete


    app.route('/register')
    .get(mainController.getRegisterPage)
    .post(mainController.postRegister);
 
    app.route('/login')
    .get(mainController.getLoginPage)
    .post(mainController.postLogin);


}