var toastCount = 0;

//***********************************************
// Popup informativa
//***********************************************
infoMsg = function(messaggio, titolo){
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
          "timeOut": "2000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		
	$toast = toastr.info(messaggio, titolo);
    $toastlast = $toast;
}