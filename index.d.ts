// Type definitions for react-native-secure-authentication 1.0.0
// Project: https://github.com/djintalkalan/secure-authentication
// Definitions by: Deepak Jaglan <https://github.com/djintalkalan>

declare module 'react-native-secure-authentication' {

    export type AuthenticationErrorsCodes = 'LAErrorAuthenticationFailed' | 'LAErrorUserCancel' | 'LAErrorUserFallback' | 'LAErrorSystemCancel' | 'LAErrorPasscodeNotSet' | 'LAErrorTouchIDNotAvailable' | 'LAErrorTouchIDNotEnrolled' | 'LAErrorTouchIDLockout' | 'RCTTouchIDUnknownError' | 'RCTTouchIDNotSupported' | 'SecureAuthenticationError'


    export interface AuthenticationErrors {
        name: AuthenticationErrorsCodes
        message: string
        details: any
    }

    export interface AuthenticationOptions {
        reason?: string,
        description?: string,
        fallbackToPasscode?: boolean, // fallback to passcode on cancel
        suppressEnterPassword?: boolean,
    }

    interface SecureAuthentication {
        hasTouchID: () => Promise<boolean>
        isDeviceSecure: () => Promise<boolean>
        authenticate: (options?: AuthenticationOptions) => Promise<boolean>
    }


    const SecureAuthentication: SecureAuthentication;

    export default SecureAuthentication;

}