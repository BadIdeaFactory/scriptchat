const config = {
  ...require("@snowpack/app-scripts-react/jest.config.js")(),
}

// `lodash-es` doesn't work in Jest, so we install `lodash` just in devDependencies
// and map `lodash-es` to it
config.moduleNameMapper = config.moduleNameMapper || {}
config.moduleNameMapper["^lodash-es$"] = "lodash"

module.exports = config
