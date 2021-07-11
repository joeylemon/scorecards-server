const HTTP_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
}

/**
 * @apiDefine SuccessResponse
 * @apiSuccessExample Success Response:
 * {
 *     "name": "Success",
 *     "id": 1,
 *     "code": 200,
 *     "message": "..."
 * }
 */
export class SuccessResponse {
    constructor (message = '200 OK', name = 'Success', code = HTTP_CODE.OK, id = 1) {
        this.message = message
        this.name = name
        this.code = code
        this.id = id
    }

    toJSON () {
        return {
            name: this.name,
            id: this.id,
            code: this.code,
            message: this.message
        }
    }

    toString () {
        return JSON.stringify(this.toJSON())
    }
}

/**
 * @apiDefine DatabaseError
 * @apiError DatabaseError 500 - An error occurred with the database
 */
export class RequestError extends Error {
    constructor (desc, name, code, id) {
        super(desc)
        this.name = name
        this.code = code
        this.id = id
    }

    toJSON () {
        return {
            name: this.name,
            id: this.id,
            code: this.code,
            message: this.message
        }
    }

    toString () {
        return JSON.stringify(this.toJSON())
    }
}

export class InternalServerError extends RequestError {
    constructor (desc = 'Something within the server has gone wrong. Try again later.', name = 'Internal Server Error', code = HTTP_CODE.INTERNAL_SERVER, id = 2) {
        super(desc, name, code, id)
    }
}

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError 401 - The request presents invalid authentication values
 */
export class UnauthorizedError extends RequestError {
    constructor (desc, name = 'Unauthorized Error', code = HTTP_CODE.UNAUTHORIZED, id = 3) {
        super(desc, name, code, id)
    }
}

/**
 * @apiDefine BadRequestError
 * @apiError BadRequestError 400 - The request has missing or invalid parameters
 */
export class BadRequestError extends RequestError {
    constructor (desc, name = 'Bad Request Error', code = HTTP_CODE.BAD_REQUEST, id = 4) {
        super(desc, name, code, id)
    }
}

/**
 * @apiDefine UndefinedRouteError
 * @apiError UndefinedRouteError 404 - The route/method doesn't exist
 */
export class UndefinedRouteError extends RequestError {
    constructor (desc = 'You have possibly forgotten to specify a url parameter, used the wrong method (POST, GET), or tried to access a route that does not exist', name = 'Undefined Route Error', code = HTTP_CODE.BAD_REQUEST, id = 5) {
        super(desc, name, code, id)
    }
}
