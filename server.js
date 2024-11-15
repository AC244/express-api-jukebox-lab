const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(methodOverride('_method'))

// Routes
app.use('/api', require('./routes/tracks'))

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
