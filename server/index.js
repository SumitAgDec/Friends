const env = require('dotenv')
env.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db.connect');
const { restrictToLoggedInUserOnlt } = require('./middlewares/auth.middlewares');
const authRouters = require('./routes/auth.routes');
const allFriendRoutes = require('./routes/allFriends.routes');

const app = express();
const port = process.env.PORT || 3000;


//DB Connection 
connectDB(process.env.MONGODB_URI);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

//Routes
app.use('/api/friends', authRouters)
app.use('/api', restrictToLoggedInUserOnlt, allFriendRoutes)


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});