const DEBUG_ENABLED = 1

// eslint-disable-next-line no-console
const logger = string => console.log(string)

const debug = string => (DEBUG_ENABLED ? logger(string) : null)

module.exports = {
  debug
}
