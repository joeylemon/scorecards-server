import path from 'path'
import pino from 'pino'

// A custom logger
export const logger = pino()

// Absolute paths to project directories
export const dirs = {
    src: path.resolve('src/'),
    routes: path.resolve('src/routes/'),
    docs: path.resolve('src/routes/docs/')
}
