const mongoose = require('mongoose');
const CarAd = mongoose.model('cars');

//get all car ads
exports.getAll = function(req, res) {
    cars.find({},(err, car) => {
        if (err) {
            res.send(err);
        }
        res.json(car);
    });
};

// create new add
exports.createNew = function(req, res) {
    const newCar = new cars(req.body);
    newCar.save((err, car) => {
        if (err) {
            res.status(400).send(err);
        } else{
            res.status(201).json(car);
        }
    });
};

exports.getById = function(req, res) {
    // get car by id
    cars.findById(req.params.carId, (err, car) => {
        if (err) {
            res.send(err);
        }
        res.json(car);
    });
};

exports.editById = function(req, res) {
    // edit car by id
    cars.findOneAndUpdate({_id: req.params.carId}, req.body, {new: true}, (err, car) => {
        if (err) {
            res.send(err);
        }
        res.json(car);
    });
    
};

exports.deleteById = function(req, res) {
    // delete car by id
    cars.remove({
        _id: req.params.carId
    }, (err, car) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Car deleted successfully' });
    });

};