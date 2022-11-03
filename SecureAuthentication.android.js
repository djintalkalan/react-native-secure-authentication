/**
 * Mostly a copy of https://github.com/naoufal/react-native-touch-id
 * @providesModule SecureAuthentication
 * @flow
 */
'use strict'

import { NativeModules } from 'react-native'
import { createError } from './error'

const { RNSecureAuthentication } = NativeModules

module.exports = {
  hasTouchID() {
    return Promise.reject(createError('RCTTouchIDNotSupported'))
  },

  isDeviceSecure() {
    return RNSecureAuthentication.isDeviceSecure()
  },

  authenticate(opts) {
    const DEFAULT_OPTIONS = {
      reason: 'This is a secure area, please authenticate yourself',
      description: '',
      fallbackToPasscode: true,
      suppressEnterPassword: false,
    }
    return RNSecureAuthentication.authenticate({ ...DEFAULT_OPTIONS, ...(opts || {}) })
      .catch(err => {
        err.name = err.code
        throw err
      })
  }
}
