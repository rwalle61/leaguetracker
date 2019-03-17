const express = require('express');

const root = require('./default.route');

const router = express.Router();

router.use(root);

module.exports = router;
