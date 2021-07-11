import mysql from 'mysql2'
import { config } from '../utils/utils.js'

const pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.db
})

/**
 * Transform an object with keys such as {"a.b": 1} into a nested object with
 * keys such as {"a": {"b": 1}}
 * @param {Object} obj The object
 * @returns A nested object
 */
function objectify (obj) {
    // Skip non-object values
    if (obj === null || obj === undefined || (obj.constructor !== Object && obj.constructor.name !== 'TextRow')) return obj

    const tmp = {}

    for (const key of Object.keys(obj)) {
        const childValue = objectify(obj[key])
        if (key.includes(".")) {
            const split = key.split(".")
            split.reduce((o, n) => {
                if (!o[n]) o[n] = {}

                if (n === split[split.length - 1])
                    o[n] = childValue
        
                return o[n]
            }, tmp)
        } else {
            tmp[key] = childValue
        }
    }

    return tmp
}

/**
 * Perform a query on the database
 * @param {string} query The SQL query to perform
 * @param {array} params The list of parameters to inject in the query
 * @param {function} mapFunction The mapping function to perform on the result set
 */
export function query (query, params, mapFunction) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) reject(err)

            con.query(query, params, (err, results) => {
                con.release()
                if (err) return reject(err)

                if (mapFunction) { 
                    resolve(results.map(mapFunction)) 
                } else { 
                    for (let i = 0; i < results.length; i++) {
                        results[i] = objectify(results[i])
                        // console.log(results[i])
                    }
                    resolve(results) 
                }
            })
        })
    })
}
