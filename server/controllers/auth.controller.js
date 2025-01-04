const Friends = require("../models/friends.model");
const bcrypt = require('bcrypt');

const createFreind = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Friends.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "Friend created successfully" });
}

const getFriend = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await Friends.findOne({ email });

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }


}

module.exports = {
    createFreind,
    getFriend
}