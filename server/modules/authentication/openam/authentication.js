/* global WIKI */

// ------------------------------------
// OpenAM Server
// ------------------------------------

const OpenAMStrategy = require('passport-openam').Strategy
const _ = require('lodash')

module.exports = {
  init (passport, conf) {
    passport.use('openam',
      new OpenAMStrategy({
        openAmBaseUrl: conf.baseURL,
        openAmCookieName: conf.cookieName,
        callbackUrl: conf.callbackURL
      }, async (_token, profile, cb) => {
        try {
          const user = await WIKI.models.users.processProfile({
            profile: {
              ...profile,
              picture: _.get(profile, '_json.profile', '')
            },
            providerKey: 'openam'
          })
          cb(null, user)
        } catch (err) {
          cb(err, null)
        }
      })
    )
  }
}
