  
      var id = 1, dialog;

      callback = function () {
          cordova.plugins.notification.local.getIds(function (ids) {
              showToast('IDs: ' + ids.join(' ,'));
          });
      };

      showToast = function (text) {
          setTimeout(function () {
              if (device.platform != 'windows') {
                  window.plugins.toast.showShortBottom(text);
              } else {
                  showDialog(text);
              }
          }, 100);
      };

      showDialog = function (text) {
          if (dialog) {
              dialog.content = text;
              return;
          }

          dialog = new Windows.UI.Popups.MessageDialog(text);

          dialog.showAsync().done(function () {
              dialog = null;
          });
      };

  

  <!-- permission -->
  
      hasPermission = function () {
          cordova.plugins.notification.local.hasPermission(function (granted) {
              showToast(granted ? 'Yes' : 'No');
          });
      };

      registerPermission = function () {
          cordova.plugins.notification.local.registerPermission(function (granted) {
              showToast(granted ? 'Yes' : 'No');
          });
      };
  

  <!-- schedule -->
  
      schedule = function () {
          cordova.plugins.notification.local.schedule({
              id: 1,
              text: 'Test Message 1',
              icon: 'http://www.optimizeordie.de/wp-content/plugins/social-media-widget/images/default/64/googleplus.png',
			  smallIcon: 'file://ic_directions_car_white_24dp.png',
              sound: null,
              data: { test: id }
          });
      };

      scheduleMultiple = function () {
          cordova.plugins.notification.local.schedule([{
              id: 1,
              text: 'Multi Message 1'
          }, {
              id: 2,
              text: 'Multi Message 2'
          }, {
              id: 3,
              text: 'Multi Message 3'
          }]);
      };

      scheduleDelayed = function () {
          var now = new Date().getTime(),
              _5_sec_from_now = new Date(now + 5 * 1000);

          var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';

          cordova.plugins.notification.local.schedule({
              id: 1,
              title: 'Scheduled with delay',
              text: 'Test Message 1',
              at: _5_sec_from_now,
              sound: sound,
              badge: 12
          });
      };

      scheduleMinutely = function () {
          var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';

          cordova.plugins.notification.local.schedule({
              id: 1,
              text: 'Scheduled every minute',
              every: 'minute',
              sound: sound
          });
      };
  

  <!-- update -->
  
      update = function () {
          cordova.plugins.notification.local.update({
              id: 1,
              text: 'Updated Message 1',
              json: { updated: true }
          });
      };

      updateInterval = function () {
          cordova.plugins.notification.local.update({
              id: 1,
              text: 'Updated Message 1',
              every: 'minute'
          });
      };
  

  <!-- clear -->
  
      clearSingle = function () {
          cordova.plugins.notification.local.clear(1, callback);
      };

      clearMultiple = function () {
          cordova.plugins.notification.local.clear([2, 3], callback);
      };

      clearAll = function () {
          cordova.plugins.notification.local.clearAll(callback);
      };
  

  <!-- cancel -->
  
      cancel = function () {
          cordova.plugins.notification.local.cancel(1, callback);
      };

      cancelMultiple = function () {
          cordova.plugins.notification.local.cancel([2, 3], callback);
      };

      cancelAll = function () {
          cordova.plugins.notification.local.cancelAll(callback);
      };
  

  <!-- presence -->
  
      isPresent = function () {
          cordova.plugins.notification.local.isPresent(id, function (present) {
              showToast(present ? 'Yes' : 'No');
          });
      };

      isScheduled = function () {
          cordova.plugins.notification.local.isScheduled(id, function (scheduled) {
              //showToast(scheduled ? 'Yes' : 'No');
			  return (scheduled ? 'Yes' : 'No')
          });
      };

      isTriggered = function () {
          cordova.plugins.notification.local.isTriggered(id, function (triggered) {
              showToast(triggered ? 'Yes' : 'No');
          });
      };
  

  <!-- IDs -->
  
      var callbackIds = function (ids) {
          showToast(ids.length === 0 ? '- none -' : ids.join(' ,'));
      };

      getIds = function () {
          cordova.plugins.notification.local.getIds(callbackIds);
      };

      getScheduledIds = function () {
          cordova.plugins.notification.local.getScheduledIds(callbackIds);
      };

      getTriggeredIds = function () {
          cordova.plugins.notification.local.getTriggeredIds(callbackIds);
      };
  

  <!-- notifications -->
  
      var callbackOpts = function (notifications) {
          showToast(notifications.length === 0 ? '- none -' : notifications.join(' ,'));
      };

      get = function () {
          cordova.plugins.notification.local.get(1, callbackOpts);
      };

      getMultiple = function () {
          cordova.plugins.notification.local.get([1, 2], callbackOpts);
      };

      getAll = function () {
          cordova.plugins.notification.local.getAll(callbackOpts);
      };

      getScheduled = function () {
          cordova.plugins.notification.local.getScheduled(callbackOpts);
      };

      getTriggered = function () {
          cordova.plugins.notification.local.getTriggered(callbackOpts);
      };
  

  <!-- defaults -->
  
      setDefaultTitle = function () {
          cordova.plugins.notification.local.setDefaults({
              title: 'New Default Title'
          });
      };
  

  <!-- callbacks -->
  
      document.addEventListener('deviceready', function () {

          cordova.plugins.notification.local.on('schedule', function (notification) {
              console.log('onschedule', arguments);
              //showToast('scheduled: ' + notification.id);
          });

          cordova.plugins.notification.local.on('update', function (notification) {
              console.log('onupdate', arguments);
              //showToast('updated: ' + notification.id);
          });

          cordova.plugins.notification.local.on('trigger', function (notification) {
              console.log('ontrigger', arguments);
              //showToast('triggered: ' + notification.id);
          });

          cordova.plugins.notification.local.on('click', function (notification) {
              console.log('onclick', arguments);
              //showToast('clicked: ' + notification.id);
			  
			  //Visualizzo la popup
			  $("#notCLicked").removeClass(nascosto);

          });

          cordova.plugins.notification.local.on('cancel', function (notification) {
              console.log('oncancel', arguments);
              //showToast('canceled: ' + notification.id);
          });

          cordova.plugins.notification.local.on('clear', function (notification) {
              console.log('onclear', arguments);
              //showToast('cleared: ' + notification.id);
          });

          cordova.plugins.notification.local.on('cancelall', function () {
              console.log('oncancelall', arguments);
              //showToast('canceled all');
          });

          cordova.plugins.notification.local.on('clearall', function () {
              console.log('onclearall', arguments);
              //showToast('cleared all');
          });
      }, false);
  	

