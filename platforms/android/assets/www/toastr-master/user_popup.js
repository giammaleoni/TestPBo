var toastCount = 0;

//***********************************************
// Popup informativa
//***********************************************
infoMsg = function(messaggio, titolo, top){
	var toastIndex = toastCount++;
	toastr.options = {
          "closeButton": false,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-bottom-center",
          "preventDuplicates": true,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "3000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}

	if (top) {
		toastr.options = {"positionClass": "toast-top-center"}
	}

	$toast = toastr.info(messaggio, titolo);
    $toastlast = $toast;
}
