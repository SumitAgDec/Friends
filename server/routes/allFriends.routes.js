const { Router } = require('express');
const { getAllFriends } = require('../controllers/friends.controller');
const router = Router();

router.use('/all', getAllFriends);

module.exports = router;