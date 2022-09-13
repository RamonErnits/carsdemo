const app = require('express')();
const port = 3000;

const cars = [
    {id: 1, make: 'Ford', model: 'Fusion Hybrid', year: 2019},
    {id: 2, make: 'Tesla', model: 'Model S', year: 2019},
    {id: 3, make: 'Toyota', model: 'Prius', year: 2019}
];

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swaggers.json');

const yamljs = require('yamljs');
const swaggerDocumentYaml = yamljs.load('./docs/swagger.yaml');

//Saame autod id kaudu
app.get('/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) res.status(404).send('The car with the given ID was not found.');
    res.send(car);
});

app.get('/cars', (req, res) => {
    res.send(cars); 
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API up at http://localhost:${port}`)
});