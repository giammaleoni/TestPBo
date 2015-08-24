cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/com.admob.plugin/www/AdmobPlugin.js",
        "id": "com.admob.plugin.AdmobAd",
        "clobbers": [
            "window.admob"
        ]
    },
    {
        "file": "plugins/com.badrit.Backbutton/www/Backbutton.js",
        "id": "com.badrit.Backbutton.Backbutton",
        "clobbers": [
            "navigator.Backbutton"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "android.support.v4": "21.0.1",
    "cordova-plugin-geolocation": "1.0.1-dev",
    "cordova-plugin-network-information": "1.0.1-dev",
    "cordova-plugin-statusbar": "1.0.1-dev",
    "cordova-plugin-whitelist": "1.0.0",
    "de.appplant.cordova.common.registerusernotificationsettings": "1.0.1",
    "de.appplant.cordova.plugin.local-notification": "0.8.1",
    "nl.x-services.plugins.toast": "2.0.5",
    "org.apache.cordova.splashscreen": "1.0.0",
    "com.admob.plugin": "5.0.4",
    "com.badrit.Backbutton": "0.1.0",
    "org.apache.cordova.device": "0.3.0"
}
// BOTTOM OF METADATA
});