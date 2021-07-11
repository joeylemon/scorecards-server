import express from 'express'

import { RequestError, UndefinedRouteError, InternalServerError } from './utils/errors.js'
import { getRequestInformation } from './utils/utils.js'
import { logger } from './utils/constants.js'

import docs from './routes/docs/router.js'
import games from './routes/games/games.controller.js'

const router = express.Router()
const app = express()

/**
 * Documentation endpoint
 */
router.use('/docs', docs)

/**
 * @apiDefine GameGroup Games
 * These endpoints define CRUD routes for the list of games in the database
 */
router.use('/', games)

// Parse the request body to get req.body parameters
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// All endpoints fall under /api/v1 path
app.use('/api/v1', router)

// Error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof RequestError) {
        logger.child({ request: getRequestInformation(req), error: err }).error()
        return res.status(err.code).json(err)
    }

    const internalErr = new InternalServerError()
    internalErr.message = err.toString()
    logger.child({ request: getRequestInformation(req), error: internalErr }).error()
    res.status(500).json(internalErr)
})

// Unknown routes
app.all('*', (req, res) => {
    const err = new UndefinedRouteError()
    res.status(err.code).json(err)
})

const server = app.listen(6155, function () {
    logger.info('Listening on port %d', server.address().port)
})
