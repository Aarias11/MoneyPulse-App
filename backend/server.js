const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// Routes
const userRoutes = require('./routes/userRoutes')
const expensesRoutes = require('./routes/expensesRoutes')
require('dotenv').config();
const { MONGODB_URI } = process.env;
const { SECRET_KEY } = process.env.SECRET_KEY

//connect to express app
const app = express()

//connect to mongoDB
mongoose
.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001 and connected to MongoDB')
    })
})
.catch((error) => {
    console.log('Error connecting to MongoDB:', error)
})


// middleware
app.use(express.json())
app.use(cors())


// ROUTES
app.use('/users', userRoutes);
app.use('/expenses', expensesRoutes);
