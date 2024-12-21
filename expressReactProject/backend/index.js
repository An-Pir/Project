const PORT = 5000
const URLDB = 'mongodb://127.0.0.1:27017'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');
const authRoute = require('./routes/authRoutes')
const productRoute = require('./routes/productRoutes')

const bodyParser = require('body-parser');

const app = express()

app.use(express.json({ limit: '10mb' })); // 10 MB для JSON
app.use(express.urlencoded({ limit: '10mb', extended: true })); // 10 MB для форм-urlencoded
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// В случае, если вы используете body-parser отдельно:
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// Routes
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)


// Backend Server
async function startServer() {
      const PORT = process.env.PORT || 5000
      try {
            await mongoose.connect(URLDB, {authSource: "admin"})

            app.listen(PORT, () => {
                  console.log(`Server running on port ${PORT}`)
            })
      } catch (error) {
            console.error('Error starting server:', error.message)
            process.exit(1)
      }
}

startServer()
