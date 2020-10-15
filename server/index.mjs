import express from 'express';
import getProducts, { getProduct } from './dao/products.mjs';
import getOptions, { getOption } from './dao/options.mjs';
const app = express();
const port = 3001;

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', (req, res) => {
    res.json(getProducts());
});

app.get('/products/:product', (req, res) => {
    res.json(getProduct(parseInt(req.params.product, 10)));
});

app.get('/options', (req, res) => {
    res.json(getOptions());
});

app.get('/options/:option', (req, res) => {
    res.json(getOption(parseInt(req.params.option, 10)));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});