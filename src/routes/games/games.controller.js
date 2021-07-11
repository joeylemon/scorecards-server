import express from 'express'

import * as GameService from './games.service.js'

const router = express.Router()

/**
 * @api {get} /games 1. List of games
 * @apiDescription Retrieve a list of all previous games
 * @apiName get_games
 * @apiGroup GameGroup
 *
 * @apiSampleRequest /games
 */
router.get('/games', async (req, res, next) => {
    try {
        res.status(200).json(await GameService.getGameList())
    } catch (err) {
        next(err)
    }
})

export default router
