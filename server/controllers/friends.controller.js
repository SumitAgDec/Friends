const Friends = require("../models/friends.model");

const getAllFriends = async (req, res) => {
    const friends = await Friends.find();
    return res.status(200).json({ friends });
}

module.exports = {
    getAllFriends
}