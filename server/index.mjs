import express from 'express';
import jwt from 'jsonwebtoken';
import getProducts, { getProduct } from './dao/products.mjs';
import getPrice from './dao/price.mjs';
import getUser from './dao/users.mjs';

// replace with a secret key from some sort of KMS
const ACCESS_TOKEN_SECRET = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

const app = express();
const port = 3001;
app.use(express.json({ type: "*/*" }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

function generateAccessToken(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

// auth middleware
function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401) // if there isn't any token
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
}

app.post('/authenticate', async (req, res) => {
    let user;
    try {
        user = await getUser(req.body.username);
        if (user.password === req.body.password) {
            const token = generateAccessToken(req.body);
            res.json({...user, token});
        } else {
            throw new Error('User not found');
        }
    } catch (e) {
        res.status(403);
        res.send({msg: e.message});
    }
});

app.get('/products', authenticateToken, async (req, res) => {
    const products = await getProducts();
    res.json(products.map(({ name, id, thumb }) => ({ name, id, thumb })));
});

app.get('/products/:product', authenticateToken, async (req, res) => {
    const product = await getProduct(parseInt(req.params.product, 10));
    if (!product) {
        res.status(404);
        res.send();
    } else {
        res.json(product);
    }
});

app.post('/products/:type/price', authenticateToken, async (req, res) => {
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