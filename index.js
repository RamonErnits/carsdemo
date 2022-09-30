const { faker } = require("@faker-js/faker");
const app = require("express")();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = require('./docs/swaggers.json');
const mongoose = require("mongoose");
const carmodel = require('./Models/CarModel');
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/carsApiDb")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require("./routes/routes")(app);


const MongoClient = require('mongodb').MongoClient;

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

async function seedDB() {
    // Connection URL
    const uri = "mongodb://localhost:27017/carsApiDb";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("carsApiDb").collection("cars");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 5000; i++) {
            const brand = faker.vehicle.manufacturer();
            const price = faker.finance.amount(25, 100, 2, '$');
            const seller = faker.name.fullName();
            let car = {
              
                    brand: brand,
                    seller,
                    price,
           
            };

            
            timeSeriesData.push(car);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();

/*
const cars = [
    {id: 1, brand: 'Ford', model: 'Fusion Hybrid', year: 2019},
    {id: 2, brand: 'Tesla', model: 'Model S', year: 2019},
    {id: 3, brand: 'Toyota', model: 'Prius', year: 2019},
    {id: 4, brand: 'Honda', model: 'Civic', year: 2019},
];

//Saame autod id kaudu

app.get('/cars/:id', (req, res) => {
    
    if(!(parseInt(req.params.id))){
        res.status(400).send('Id must be a number');
        return;
    }
    let result = cars.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result);

});

app.get('/cars', (req, res) => {
    res.send(cars); 
});

app.post('/car', (req, res) => {
    cars.push({
        id: cars.length + 1,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year
    })

    res.end();
});
*/

// make seeding data
app.get('/seed', (req, res) => {
    const car = [
        {brand: 'Ford', model: 'Fusion Hybrid', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
        {brand: 'Tesla', model: 'Model S', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
        {brand: 'Toyota', model: 'Prius', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
        {brand: 'Honda', model: 'Civic', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
    ];

    carmodel.insertMany(car, (err, docs) => {
        if(err){
            res.status(400).send(err);
        } else{
            res.status(201).send(docs);
        }
    });
});



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`API up at http://localhost:${port}`)
});