//disabilita la UI, viene riabilitata quando l'app è pronta (init-app.js) -->
// di default la UI è lanciata in automatico qui la si disabilita
//$.ui.autoLaunch = false;

//nasconde il backbutton --> da testare
//$.ui.showBackButton=false

//abilita lo scroll
$.feat.nativeTouchScroll=true;

// // HomeButton
// cordova.define("cordova/plugin/homebutton", function (require, exports, module) {
//     var exec = require("cordova/exec");
//     module.exports = {
//         show: function (win, fail) {
//             exec(win, fail, "HomeButton", "show", []);
//         }
//     };
// });
//
// // HomeButton
// function homeButton() {
//     var home = cordova.require("cordova/plugin/homebutton");
//     home.show(
//         function () {
//             console.info("PhoneGap Plugin: HomeButton: callback success");
//         },
//         function () {
//             console.error("PhoneGap Plugin: HomeButton: callback error");
//         }
//     );
// }
