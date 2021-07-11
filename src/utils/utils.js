import { logger } from './constants.js'

if (!process.env.SCORECARDS_CONFIG) {
    logger.error('missing SCORECARDS_CONFIG environment variable')
    process.exit(1)
}

export const config = JSON.parse(process.env.SCORECARDS_CONFIG)

/**
 * Extract the useful information from a request object
 * @param {Request} req The request object
 * @example
 *     logger.child({ request: getRequestInformation(req) }).info()
 */
export function getRequestInformation (req) {
    if (req.body.password) delete req.body.password
    return { path: req.url, method: req.method, body: req.body, src: req.headers['x-forwarded-for'], agent: req.headers['user-agent'] }
}
