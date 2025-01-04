const { Schema, model } = require('mongoose');

const friendsSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Age is required"],
        min: [3, "Email must be at least 3 characters long"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [3, "Password must be at least 3 characters long"]
    },
    allFriends: [{
        type: Schema.Types.ObjectId,
        ref: 'Friends'
    }]
}, { timestamps: true });

const Friends = model('Friends', friendsSchema);

module.exports = Friends;