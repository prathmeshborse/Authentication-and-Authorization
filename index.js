const express = require('express');

const router = express.Router();
const userRoutes = require('./routes/userController');
const connectDB = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});