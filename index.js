const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// middlware start
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sabbir.0dgpj5g.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const relaseProductCollaction = client.db('carResale').collection('resaleProduct');
        const bookingCollection = client.db('carResale').collection('booking');
        const usersCollection = client.db('carResale').collection('users');
        
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
        
        app.get('/bookings', async(req, res) =>{
            const email = req.query.email;
            const query = {email: email};
            const bookings = await bookingCollection.find(query).toArray();
            res.send(bookings);
        })

        app.get('/users', async(req, res) =>{
            const userRol = req.query.userRol;
            const query = {userRol};
            const allusers = await usersCollection.find(query).toArray();
            res.send(allusers);
        })


        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isAdmin: user?.userRol === 'admin' });
        })

        app.get('/users/saller/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isSaller: user?.userRol === 'Seller' });
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.post('/booking', async(req, res) =>{
            const booking = req.body;
            // console.log(booking)
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })

      
    }

    finally {

    }
}
run().catch(err => console.error(err));;




app.get('/', async (req, res) => {
    res.send('Car Reasale server is running');
})

app.listen(port, () => console.log(`Car Reasale running is ${port}`))