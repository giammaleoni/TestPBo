//disabilita la UI, viene riabilitata quando l'app è pronta (init-app.js) -->
// di default la UI è lanciata in automatico qui la si disabilita
//$.ui.autoLaunch = false;

//nasconde il backbutton --> da testare
//$.ui.showBackButton=false

//abilita lo scroll
$.feat.nativeTouchScroll=true;

function homeButton() {
  navigator.Backbutton.goHome(function() {
    console.log('back in home --> homeButton')
  }, function() {
    console.log('fail homeButton')
  });
}
