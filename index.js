const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

// middlware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sabbir.0dgpj5g.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const relaseProductCollaction = client.db('carResale').collection('resaleProduct');
        
        app.get('/category', async (req, res) => {
            
            const query = {};
            const category = await relaseProductCollaction.find(query).toArray();
            res.send(category);
        })

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singelCategory = await relaseProductCollaction.findOne(query);
            res.send(singelCategory)
        });   
    }

    finally {

    }
}
run().catch(err => console.error(err));;




app.get('/', async (req, res) => {
    res.send('Car Reasale server is running');
})

app.listen(port, () => console.log(`Car Reasale running is ${port}`))