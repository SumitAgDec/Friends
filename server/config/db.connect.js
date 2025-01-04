const mongoose = require('mongoose');

const connectDB = async (url) => {
    await mongoose.connect(url)
        .then(() => console.log("Database connected"))
        .catch(err => console.log("Database Connection Error", err));
}

module.exports = {
    connectDB
}