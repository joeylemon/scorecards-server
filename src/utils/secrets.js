import { logger } from './constants.js'

if (!process.env.SCORECARDS_CONFIG) {
    logger.error('missing SCORECARDS_CONFIG environment variable')
    process.exit(1)
}

const config = JSON.parse(process.env.SCORECARDS_CONFIG)

// The connection details for accessing the MySQL database
export const MYSQL_CONNECTION = config.MYSQL_CONNECTION
