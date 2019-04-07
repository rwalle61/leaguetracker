const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /:
 *    get:
 *      tags:
 *          - users
 *      summary: health endpoint
 *      responses:
 *          '200':
 *              description: app running
 */
router.get('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
