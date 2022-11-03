# react-native-secure-authentication

As of now react-native-local-auth is not maintained and not working properly. So I forked the project and created this library which supports authenticating users with Touch ID, with optional fallback to passcode (if TouchID is unavailable or not enrolled). Most of the code and documentation are originally from [react-native-local-auth](https://github.com/tradle/react-native-local-auth).

## Why use this library
1. Maintained Library
2. Support autolinking
3. Support Typescript

This project also contained typescript definitions.

## Documentation
- [UI](https://github.com/djintalkalan/react-native-secure-authentication#ui)
- [Install](https://github.com/djintalkalan/react-native-secure-authentication#install)
- [Usage](https://github.com/djintalkalan/react-native-secure-authentication#usage)
- [Errors](https://github.com/djintalkalan/react-native-secure-authentication#errors)
- [License](https://github.com/djintalkalan/react-native-secure-authentication#license)

## UI

If TouchID is supported and enrolled (in this gif, 1st touch fails, 2nd succeeds)

![Touch ID](gifs/touchID.gif)

If TouchID is not supported or not enrolled, you can fallback to device passcode

![fallback to passcode](gifs/fallback%20to%20passcode.gif)

## Install
```
yarn add react-native-secure-authentication
```

### Linking the Library (Auto Linking)
Everything is Autolinked in android. For IOS run npx pod-install.


### Manual Linking IOS using Pods
Add following line in Podfile
```shell
pod 'SecureAuthentication', :path => "../node_modules/react-native-secure-authentication/"
```
### Linking With react-native-link
```shell
npx react-native-link react-native-secure-authentication
```

#### Manual Linking Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import dj.secure.authentication.SecureAuthenticationPackage;` to the imports at the top of the file
  - Add `new SecureAuthenticationPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:

    ```
    include ':react-native-secure-authentication'
    project(':react-native-secure-authentication').projectDir = new File(rootProject.projectDir,   '../node_modules/react-native-secure-authentication/android')
    ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

    ```
      implement project(':react-native-secure-authentication')
    ```

## Usage

```js
import SecureAuthentication, { AuthenticationErrors } from 'react-native-secure-authentication';

const MyComponent : FC () => {
    const _pressHandler = useCallback(() => {
          SecureAuthentication.authenticate({
              reason: 'this is a secure area, please authenticate yourself',
              fallbackToPasscode: true,    // fallback to passcode on cancel
              suppressEnterPassword: true // disallow Enter Password fallback
            })
            .then((success) => {
              alert('Authenticated Successfully')
            })
            .catch((error:AuthenticationErrors) => {
              alert('Authentication Failed', error.message)
            })
        },[])

        return (
          <View>
            ...
            <TouchableHighlight onPress={_pressHandler}>
              <Text>
                Authenticate with Touch ID / Passcode
              </Text>
            </TouchableHighlight>
          </View>
        )
    } 
```

### hasTouchID()
check if Touch ID is supported.
Returns a `Promise` object.

## Errors
There are various reasons why authenticating with Touch ID or device passcode may fail.  Whenever authentication fails, `SecureAuthentication.authenticate` will return an error code representing the reason.

Below is a list of error codes that can be returned:

| Code | Description |
|---|---|
| `LAErrorAuthenticationFailed` | Authentication was not successful because the user failed to provide valid credentials. |
| `LAErrorUserCancel` | Authentication was canceled by the user—for example, the user tapped Cancel in the dialog. |
| `LAErrorUserFallback` | Authentication was canceled because the user tapped the fallback button (Enter Password). |
| `LAErrorSystemCancel` | Authentication was canceled by system—for example, if another application came to foreground while the authentication dialog was up. |
| `LAErrorPasscodeNotSet` | Authentication could not start because the passcode is not set on the device. |
| `LAErrorTouchIDNotAvailable` | Authentication could not start because Touch ID is not available on the device |
| `LAErrorTouchIDNotEnrolled` | Authentication could not start because Touch ID has no enrolled fingers. |
| `RCTTouchIDUnknownError` | Could not authenticate for an unknown reason. |
| `RCTTouchIDNotSupported` | Device does not support Touch ID. |

_More information on errors can be found in [Apple's Documentation](https://developer.apple.com/library/prerelease/ios/documentation/SecureAuthenticationentication/Reference/LAContext_Class/index.html#//apple_ref/c/tdef/LAError)._

## License

ISC. [react-native-local-auth](https://github.com/tradle/react-native-local-auth) license also included.

ISC. [react-native-touch-id](https://github.com/naoufal/react-native-touch-id) license also included.
