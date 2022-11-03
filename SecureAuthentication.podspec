require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "SecureAuthentication"
  s.version      = package['version']
  s.summary      = "A React Native library for authenticating users with Local Authentication"
  s.homepage     = "https://github.com/djintalkalan/react-native-secure-authentication"
  s.license      = "MIT"
  s.author       = { "Naoufal Kadhom" => "naoufalkadhom@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/djintalkalan/react-native-secure-authentication.git" }
  s.source_files  = "*.{h,m}"
  s.dependency "React"
end