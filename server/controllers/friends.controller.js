const Friends = require("../models/friends.model");

const getAllFriends = async (req, res) => {
    const friends = await Friends.find();
    return res.status(200).json({ friends });
}

const addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const currentUserId = req.user._id;
        // console.log("Current User ID:", currentUserId);

        if (currentUserId === friendId) {
            return res.status(400).json({ message: "You cannot add yourself as a friend" });
        }

        const updatedUser = await Friends.findByIdAndUpdate(
            currentUserId,
            { $addToSet: { allFriends: friendId } },
            { new: true }
        )
        // .populate('name', 'email');
        console.log("Friend added:", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Friend added successfully", friends: updatedUser.friends });
    } catch (error) {
        res.status(500).json({ message: "Error adding friend", error });
    }
};

module.exports = {
    getAllFriends,
    addFriend
}