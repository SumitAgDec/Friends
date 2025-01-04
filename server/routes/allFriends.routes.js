const { Router } = require('express');
const { getAllFriends, addFriend, selectedFriends, removeFriend } = require('../controllers/friends.controller');
const { restrictToLoggedInUserOnlt } = require('../middlewares/auth.middlewares');
const router = Router();

router.get('/all', restrictToLoggedInUserOnlt, getAllFriends);
router.post('/add', restrictToLoggedInUserOnlt, addFriend);
router.get('/selectedFriends', restrictToLoggedInUserOnlt, selectedFriends);
router.post('/removeFriend', restrictToLoggedInUserOnlt, removeFriend);


module.exports = router;