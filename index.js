const express = require('express');
const app = express();
const carmodel = require('./Models/CarModel');
const port = 3000;


app.use(express.json());



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swaggers.json');

const yamljs = require('yamljs');
const { default: mongoose } = require('mongoose');
const swaggerDocumentYaml = yamljs.load('./docs/swagger.yaml');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CarAdsApiDb');

require("./routes/routes")(app);

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API up at http://localhost:${port}`)
});