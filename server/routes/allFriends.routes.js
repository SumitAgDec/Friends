const { Router } = require('express');
const { getAllFriends, addFriend } = require('../controllers/friends.controller');
const { restrictToLoggedInUserOnlt } = require('../middlewares/auth.middlewares');
const router = Router();

router.get('/all', restrictToLoggedInUserOnlt, getAllFriends);
router.post('/add', restrictToLoggedInUserOnlt, addFriend);

module.exports = router;