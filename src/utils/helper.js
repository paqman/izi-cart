const path = require('path')

const URL_PREFIX = 'http://localhost:3000'

/**
 * Handle 404 not found response
 * @param res The response object
 * @param message The message to add to the response
 */
const notFound = (res, message) => res.status(404).send({ message })

/**
 * Format an URL to match the domain where the API is exposed
 * todo: this belongs to a config file or an environment variable
 * @param queryPath path part of the URL
 */
const getUrl = queryPath => path.join(URL_PREFIX, queryPath)

module.exports = {
  notFound,
  getUrl
}
