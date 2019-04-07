const express = require('express');

const { playersController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * /players:
 *    get:
 *      description: This should return all players
 *      tags:
 *          - users
 *      summary: A list of players
 *      responses:
 *          '200':
 *              description: player info
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Player'
 *          '400':
 *              description: bad input parameter
 *          '404':
 *              $ref: '#/components/responses/404NotFound'
 */
router.get('/', async (req, res) => {
    const players = await playersController.getPlayers();
    res.status(200).send(players);
});

/**
 * @swagger
 * /players/{id}:
 *    get:
 *      tags:
 *          - users
 *      summary: A single player
 *      parameters:
 *          - in: path
 *            name: id
 *            # description: pass a required player id
 *            required: true
 *            schema:
 *                $ref: '#/components/schemas/ID'
 *      responses:
 *          '200':
 *              description: player info
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Player'
 *          '404':
 *              $ref: '#/components/responses/404NotFound'
 */
router.get('/:id', async (req, res) => {
    const playerName = req.params.id;
    const player = await playersController.getPlayer(playerName);
    if (!player) {
        res.status(404).send(`player ${playerName} not found`);
    } else {
        res.status(200).send(player);
    }
});

module.exports = router;
