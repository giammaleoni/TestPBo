//data definition
var ol = document.getElementById('slippylist');
var preferiti = [];
var pref = localStorage.preferiti;


//retrieve data from the local starage to rebuilt the list (executed on fisrt load)
initList = function(){
	for (j=0;j<preferiti.length;j++){
		var newcontent = document.createElement('li');
		if (matrixLavaggio.getObjectById(preferiti[j]).dettaglioHera) {
			newcontent.innerHTML = matrixLavaggio.getObjectById(preferiti[j]).viaGoogle + ", " + matrixLavaggio.getObjectById(preferiti[j]).dettaglioHera + "<span class='instant'></span>";
		} else {
			newcontent.innerHTML = matrixLavaggio.getObjectById(preferiti[j]).viaGoogle + "<span class='instant'></span>";
		}

		newcontent.id = preferiti[j];
		ol.appendChild(newcontent);
	}


};
if (pref != undefined){
	preferiti = JSON.parse(localStorage["preferiti"]);
	initList();
}
//fine parte custom executed on app_load

ol.addEventListener('slip:beforereorder', function(e){
    if (/demo-no-reorder/.test(e.target.className)) {
        e.preventDefault();
    }
}, false);

ol.addEventListener('slip:beforeswipe', function(e){
    if (e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className)) {
        e.preventDefault();
    }
}, false);

ol.addEventListener('slip:beforewait', function(e){
    if (e.target.className.indexOf('instant') > -1) e.preventDefault();
}, false);

ol.addEventListener('slip:afterswipe', function(e){
	//allo swipe devo eliminare il valore dall'array
	//cerco l'innerHTML di e.target poi faccio il for sull'array e poi splice sull'index
	var del = e.target.id;
	var lung = preferiti.length;
	for (i=0;i<lung;i++){
		if (preferiti[i] == del){
			preferiti.splice(i,1);
			localStorage.preferiti = JSON.stringify(preferiti);
			break;
		}
	}
	listCreate();
	//fine parte custom

// riappende lo swipe in fondo
//    e.target.parentNode.appendChild(e.target);

//elimina lo swipe
    e.target.parentNode.removeChild(e.target);

}, false);

ol.addEventListener('slip:reorder', function(e){
	//al reorder devo riordinare l'array e ripassarlo al localStorage
	var oldi = event.detail.originalIndex
	var newi = event.detail.spliceIndex
	preferiti.move(oldi,newi);
	localStorage.preferiti = JSON.stringify(preferiti);
	listCreate();
	//fine parte custom


    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
    return false;
}, false);

new Slip(ol);

//aggiunta preferito
addFavorite = function() {
	var newcontent = document.createElement('li');
	var content = document.getElementById("toAdd").selectedOptions[0];
	var childrenCount = ol.childElementCount;
	if (content.innerText != 'Via...'){
		for(i=0;i<childrenCount;i++){
			var children = ol.children[i].id;
			if (content.value == children){
				//alert("Preferito già esistente");
				infoMsg("Preferito già esistente. Aggiunta impossibile.");
				var cancel = "X";
				break;
			}
		}
		//aggiungo il preferito se non già presente
		if (cancel != "X"){
			newcontent.innerHTML = content.innerHTML + "<span class='instant'></span>";
			newcontent.id = content.value;
			ol.appendChild(newcontent);
			preferiti.push(content.value);
			localStorage.preferiti = JSON.stringify(preferiti);
			listCreate();
			aggiornaPreferiti("add", content.value);
		}
	}
};
//fine parte custom


// aggiorna i preferiti in base alla stellina dell'InfoWindow
inPreferiti = function(storageUpdate){
	var preferiti = localStorage.preferiti ? JSON.parse(localStorage.preferiti) : null ;
	var puntatoreId = localStorage.puntatoreId ? localStorage.puntatoreId : null ;
	var puntatoreIsPreferito;
	var puntatoreVia = localStorage.puntatoreVia ? localStorage.puntatoreVia : null;

	if (puntatoreId == "null" || puntatoreVia == "null") {
		$("#star").addClass("nascosto");
		//console.log("Via non presente: stella nascosta");
		return;
	}else {
		$("#star").removeClass("nascosto");
	}

	puntatoreIsPreferito = preferiti.indexOf(puntatoreId);
	if (puntatoreIsPreferito != -1) {
		if (storageUpdate){
			// è già preferito --> lo devo togliere
			preferiti.splice(puntatoreIsPreferito);								//rimuove il preferito
			localStorage.preferiti = JSON.stringify(preferiti);		//aggiorna il localStorage

			console.log ("via rimossa dai preferiti id: " + puntatoreId);
			infoMsg(puntatoreVia + " rimossa dai preferiti");

			$("#star").addClass("grayscale");											//grigia la stella
      aggiornaPreferiti(puntatoreId, "remove");							//rimuove l'oggetto preferito
			listCreate();																					//ricrea la dropdown
			$("#id_via").val(puntatoreId);												//preseleziona la dropdown valore cliccato della mappa
		}else{
			// Clicco su una nuova via già preferita
			$("#star").removeClass("grayscale");
		}

	} else {

		if(storageUpdate){
		// aggiungo ai preferiti
			preferiti.push(puntatoreId);													//aggiunge il preferito
			localStorage.preferiti = JSON.stringify(preferiti);		//aggiorna il localStorage

			console.log ("via aggiunta ai preferiti id: " + puntatoreId);
			infoMsg(puntatoreVia + " aggiunta ai preferiti");

			$("#star").removeClass("grayscale");									//stella gialla
      aggiornaPreferiti(puntatoreId, "add");								//crea l'oggetto preferito
			listCreate();																					//ricrea la dropdown
			$("#id_via").val(puntatoreId);												//preseleziona la dropdown valore cliccato della mappa
		}else{
			// Clicco su una nuova via non preferita
			$("#star").addClass("grayscale");
		}

	}
}
