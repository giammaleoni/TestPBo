//Crea la lista per la dropdownlist prendendola dalla matrice (vedi matrixLavaggio.js)
listCreate = function(Y){
	
		var lista1 = [];
		var lista2 = [];
		lista1.push('<option class="disabled viax" selected=true disabled>Via...</option>');
		lista2.push('<option class="disabled viax" selected=true disabled>Via...</option>');

		lista1.push("<optgroup label='Preferiti:'>");
		var savedPref = localStorage.preferiti;
		if (savedPref == null || savedPref  == '[]'){
			lista1.push("<option disabled>--vuoto--</option>");
		}else{
		//lista preferiti...
			var prefs = [];
			prefs = JSON.parse(localStorage["preferiti"]);
			l = prefs.length;
			for (j=0;j<l;j++){
				if(matrixLavaggio.getObjectById(prefs[j]).dettaglioHera){
					lista1.push("<option value='" + prefs[j] + "'>" + matrixLavaggio.getObjectById(prefs[j]).viaGoogle + ", " + matrixLavaggio.getObjectById(prefs[j]).dettaglioHera  +  "</option>");
				}else{
					lista1.push("<option value='" + prefs[j] + "'>" + matrixLavaggio.getObjectById(prefs[j]).viaGoogle +  "</option>");
				}
			}
		}
		lista1.push("</optgroup>");
		lista1.push("<optgroup label='Lista strade:'>");
		var lungh = matrixLavaggio.length;
		for(l=0; l<lungh; l++){
			if(matrixLavaggio[l].dettaglioHera){
				lista1.push("<option value='" + matrixLavaggio[l].id + "'>"+ matrixLavaggio[l].viaGoogle +  ", "+ matrixLavaggio[l].dettaglioHera  + "</option>");
				lista2.push("<option value='" + matrixLavaggio[l].id + "'>"+ matrixLavaggio[l].viaGoogle +  ", "+ matrixLavaggio[l].dettaglioHera  + "</option>");
			}else{
				lista1.push("<option value='" + matrixLavaggio[l].id + "'>"+ matrixLavaggio[l].viaGoogle + "</option>");
				lista2.push("<option value='" + matrixLavaggio[l].id + "'>"+ matrixLavaggio[l].viaGoogle + "</option>");
			}
		}
		lista1.push("</optgroup>");


	var listaMain = document.getElementById('id_via');
	var listaPref = document.getElementById('toAdd');
	listaMain.innerHTML = lista1;
	if (Y == 'X'){
		listaPref.innerHTML = lista2;
	}	
};


// *********************************************************************************************
// Crea la lista per la configurazione del tipo mezzo di trasporto da usare nel marker parcheggio
// selectMezzo
// *********************************************************************************************

listCreateMarker = function () {
	// var mezzi --> la matrice è globale (matrixLavaggio.js)
	var lista = [];
	
	for (l = 0; mezzi[l] != undefined ; l++ ) {
		lista.push("<option value='" + l + 
				   "'>" +
				   mezzi[l].name + "</option>");			// style=\"background-image:url(" + mezzi[l].path + ")\"
	}
	
	$("#selectMezzo").html(lista);
};