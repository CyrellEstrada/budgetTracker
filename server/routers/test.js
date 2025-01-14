const express = require('express');
const router = express.Router();
const { testDb } = require('../controllers/test'); // if you put it in test.js

router.get('/test', testDb); // GET /users/test or GET /test/test if you prefer

module.exports = router;