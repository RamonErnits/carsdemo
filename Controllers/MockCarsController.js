//import {faker} from '@faker-js/faker';
const { faker } = require('@faker-js/faker');
const { modelNames } = require('mongoose');

const cars = [
    {id: 1, brand: 'Ford', model: 'Fusion Hybrid', year: 2019},
    {id: 2, brand: 'Tesla', model: 'Model S', year: 2019},
    {id: 3, brand: 'Toyota', model: 'Prius', year: 2019},
    {id: 4, brand: 'Honda', model: 'Civic', year: 2019},
    {id: 5, brand: 'BMW', model: 'X5', year: 2019},
    {id: 6, brand: 'Audi', model: 'A6', year: 2019},
    {id: 7, brand: 'Mercedes', model: 'S500', year: 2019},
    {id: 8, brand: 'Volvo', model: 'XC90', year: 2019},
    {id: 9, brand: 'Volkswagen', model: 'Golf', year: 2019},
    {id: 10, brand: 'Nissan', model: 'Leaf', year: 2019},
];

for (let i = 0; i < 20; i++) {
    const randomName = faker.vehicle.manufacturer();
    const price = faker.finance.amount(25, 100, 2, '$');
    const seller = faker.name.fullName();
    const location = faker.address.country();
    console.log(randomName, price, "k","\n", "Seller:", seller, "\n", "Location:", location, "\n");
}


// Language: javascript

exports.getAll = function(req, res) {
    res.send(cars);
};

exports.createNew = function(req, res) {    //Create
    const length = cars.push(req.body);
    cars[length - 1] = {id : cars[length-2].id+1, ...cars[length - 1]};
    res.status(201).json(cars[length - 1]);
};

exports.getById = function(req, res) {      //Read
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a positive integer');
        return;
    }
    let result = cars.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result);
};

exports.editById = function(req, res) {     //Update
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a number');
        return;
    }
    const index = cars.findIndex(x => x.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    cars[index] = {...cars[index], ...req.body};

    res.status(200).json(cars[index]);
    
};

exports.deleteById = function(req, res) {    //Delete
    if(!(parseInt(req.params.id))){
        res.status(400).send('Id must be a number');
        return;
    }
    let result = cars.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    const index = cars.indexOf(result);
    cars.splice(index, 1);
    res.status(200).json(result);
        
};
    