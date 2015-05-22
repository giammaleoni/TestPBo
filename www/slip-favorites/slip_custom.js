//data definition
var ol = document.getElementById('slippylist');
var preferiti = [];
var pref = localStorage.preferiti;


//retrieve data from the local starage to rebuilt the list (executed on fisrt load)
initList = function(){
	entries = preferiti.length;
	for (i=0;i<entries;i++){
		var newcontent = document.createElement('li');
		newcontent.innerHTML = preferiti[i] + "<span class='instant'></span>";
		ol.appendChild(newcontent);
		
		//appendo anche al div dei preferiti lista preferiti della select
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
	var del = e.target.innerText;
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
	var content = document.getElementById("toAdd").value
	var childrenCount = ol.childElementCount;
	if (content != 'Via...'){
		for(i=0;i<childrenCount;i++){
			var children = ol.children[i].innerText;
			if (content == children){
				//alert("Preferito già esistente");
				infoMsg("Preferito già esistente. Aggiunta impossibile.");
				var cancel = "X";
				break;
			}
		}
		//aggiungo il preferito se non già presente
		if (cancel != "X"){
			newcontent.innerHTML = content + "<span class='instant'></span>";
			ol.appendChild(newcontent);
			preferiti.push(content);
			localStorage.preferiti = JSON.stringify(preferiti);
			listCreate();
			aggiornaPreferiti("add", document.getElementById("toAdd").value);
		}
	}
}
//fine parte custom