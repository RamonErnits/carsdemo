const app = require('express')();
const port = 8080;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swaggers.json');


app.get('/cars', (req, res) => {
    res.send('Audi a5, BMW 3, Mercedes C' ); 
});

app.get('/post', (req, res) => {
    res.send('Post 1, Post 2, Post 3' );
    });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API up at http://localhost:${port}`)
});