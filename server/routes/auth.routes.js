const { Router } = require('express');
const { createFreind, getFriend } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', createFreind)
router.post('/login', getFriend)

module.exports = router;