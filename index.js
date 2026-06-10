const express = require('express');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/database');
require('dotenv').config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});