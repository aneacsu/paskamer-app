# Paskamer Native

## Prerequisites
This application uses the [Cordova CLI](http://docs.phonegap.com/en/edge/guide_cli_index.md.html) to perform all necessary operations. So, you'll need that:

`npm install -g cordova`

To start the iOS emulator from command line, you'll also need:

`npm install -g ios-sim`


## First run
Depending on which platform you want to build for, you'll need to install it. From now on, we'll show commands for iOS, but the same sequences are also valid for an Android build - just substitute 'ios' with 'android' in the various commands.

`cordova platform add ios`

`cordova build ios`

`cordova emulate ios`
