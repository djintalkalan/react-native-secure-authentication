/**
 * Mostly a copy of https://github.com/naoufal/react-native-touch-id
 * @providesModule SecureAuthentication
 * @flow
 */
'use strict'

import { NativeModules } from 'react-native'
import PasscodeStatus from 'react-native-passcode-status'
import { createError } from './error'

let NativeSecureAuthentication = NativeModules.RNSecureAuthentication
let SecureAuthentication = {
  hasTouchID() {
    return new Promise(function (resolve, reject) {
      NativeSecureAuthentication.hasTouchID(function (error) {
        if (error) {
          console.log("errora", error);
          return reject(createError(error.message))
        }

        resolve()
      })
    })
  },

  isDeviceSecure() {
    if (!PasscodeStatus.supported) {
      return Promise.reject(new Error('unable to determine'))
    }

    return new Promise((resolve, reject) => {
      PasscodeStatus.get(function (err, status) {
        if (err) return reject(new Error(err))
        if (status === 'unknown') return reject(new Error('unable to determine'))

        resolve(status === 'enabled')
      })
    })
  },

  authenticate(opts) {
    const DEFAULT_OPTIONS = {
      reason: 'This is a secure area, please authenticate yourself',
      description: '',
      fallbackToPasscode: true,
      suppressEnterPassword: false,
    }
    opts = { ...DEFAULT_OPTIONS, ...(opts || {}) }
    return new Promise(function (resolve, reject) {
      NativeSecureAuthentication.authenticate(
        opts.reason || '',
        !!opts.fallbackToPasscode,
        !!opts.suppressEnterPassword,
        function (error) {
          if (error) reject(createError(error.message))
          else resolve()
        }
      )
    })
  }
}

module.exports = SecureAuthentication
