//Crea la lista per la dropdownlist prendendola dalla matrice (vedi matrixLavaggio.js)
listCreate = function(Y){
	
		var lista1 = [];
		var lista2 = [];
		lista1.push('<option class="disabled viax" selected=true disabled>Via...</option>');
		lista2.push('<option class="disabled viax" selected=true disabled>Via...</option>');;

		lista1.push("<optgroup label='Preferiti:'>")
		var savedPref = localStorage.preferiti;
		if (savedPref == null || savedPref  == '[]'){
			lista1.push("<option disabled>--vuoto--</option>");
		}else{
		//lista preferiti...
			var prefs = [];
			prefs = JSON.parse(localStorage["preferiti"]);
			l = prefs.length;
			for (i=0;i<l;i++){
					lista1.push("<option>" + prefs[i] + "</option>");
			}
		}
		lista1.push("</optgroup>");
		lista1.push("<optgroup label='Lista strade:'>")
		var lungh = matrixLavaggio.length;
		for(l=0; l<lungh; l++){
			lista1.push("<option>"+ matrixLavaggio[l].viaGoogle + "</option>");
			lista2.push("<option>"+ matrixLavaggio[l].viaGoogle + "</option>");
		}
		lista1.push("</optgroup>");


	var listaMain = document.getElementById('id_via');
	var listaPref = document.getElementById('toAdd');
	listaMain.innerHTML = lista1;
	if (Y == 'X'){
		listaPref.innerHTML = lista2;
	}	
}