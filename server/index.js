const env = require('dotenv')
env.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db.connect');

const authRouters = require('./routes/auth.routes');

const app = express();
const port = process.env.PORT || 3000;

//DB Connection 
connectDB(process.env.MONGODB_URI);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());

//Routes
app.use('/api/friends', authRouters)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});