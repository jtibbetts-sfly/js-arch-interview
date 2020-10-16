import express from 'express';
import getProducts, { getProduct } from './dao/products.mjs';
import getPrice from './dao/price.mjs';

const app = express();
const port = 3001;
app.use(express.json({ type: "*/*" }));
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/products', async (req, res) => {
    const products = await getProducts();
    res.json(products.map(({ name, id, thumb }) => ({ name, id, thumb })));
});

app.get('/products/:product', async (req, res) => {
    const product = await getProduct(parseInt(req.params.product, 10));
    if (!product) {
        res.status(404);
        res.send();
    } else {
        res.json(product);
    }
});

app.post('/products/:type/price', async (req, res) => {
    const options = req.body;
    const price = await getPrice({...options, type: req.params.type});
    res.json({
        productId: req.params.product,
        price: price
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});