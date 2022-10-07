const mongoose = require('mongoose');
const CarDTO = require('../Models/CarsDTO');
const car = mongoose.model('cars');

//get all car ads
exports.getAll = function(req, res) {
    car.find({},(err, car) => {
        if (err) {
            res.send(err);
        } 
        res.json(car);
    });
};

// create new add
exports.createNew = function(req, res) {
    const newCar = new car(req.body);
    newCar.save((err, car) => {
        if (err) {
            res.status(400).send(err);
        } else{
            res.status(201).json(car);
        }
    });
};

exports.getById = function(req, res) {

    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    car.findOne({_id:(req.params.id)},(err,car)=>{
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json(new CarDTO(car))
        }
    })      
    return
};

exports.editById = function(req, res) {
    // edit car by id
    car.updateOne({_id: req.params.carId},{$set: req.body}, null, (err, car) => {
        if (err) {
            res.send(err);
        } else{
            console.log(car);
            res.status(200).json(car);
        }
        
    });

    
};

exports.deleteById = function(req, res) {
    // delete car by id
    car.deleteOne({
        _id: req.params.carId
    }, (err, car) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Car deleted successfully' });
    });

};