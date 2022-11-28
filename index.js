const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

// middlware
app.use(cors());
app.use(express.json());






app.get('/', async (req, res) => {
    res.send('Car Reasale server is running');
})

app.listen(port, () => console.log(`Car Reasale running is ${port}`))