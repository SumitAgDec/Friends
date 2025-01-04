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

        console.log("Friend added:", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Friend added successfully", friends: updatedUser.friends });
    } catch (error) {
        res.status(500).json({ message: "Error adding friend", error });
    }
};

const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const currentUserId = req.user._id;

        // Remove the friendId from the allFriends array
        const updatedUser = await Friends.findByIdAndUpdate(
            currentUserId,
            { $pull: { allFriends: friendId } },
            { new: true }
        );

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Friend removed:", updatedUser);

        // Send back the updated list of friends (allFriends array)
        res.status(200).json({ message: "Friend removed successfully", allFriends: updatedUser.allFriends });
    } catch (error) {
        console.error("Error removing friend:", error);
        res.status(500).json({ message: "Error removing friend", error });
    }
};


const selectedFriends = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const user = await Friends.findById(currentUserId).populate('allFriends', 'name email');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ friends: user.allFriends });
    } catch (error) {
        res.status(500).json({ message: "Error fetching friends", error });
    }
};

module.exports = {
    getAllFriends,
    addFriend,
    selectedFriends,
    removeFriend
}