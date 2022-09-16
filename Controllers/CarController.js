const mongoose = require('mongoose');
const CarAd = mongoose.model('cars');


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
    
};

exports.editById = function(req, res) {
    
};

exports.deleteById = function(req, res) {
    
};