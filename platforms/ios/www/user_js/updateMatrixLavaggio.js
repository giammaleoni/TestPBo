// Questo script non è caricato dalla cartella ma è online (da decidere su quale sito)
// 		se la connessione è disponibile lo script si carica e aggiorna i dati sulla local storage che contiene
//		tutti i dati di tutte le vie di Bologna.

var versioneMatrice = '0.4';
var versioneOld = localStorage.matriceVersione;


if (versioneOld != versioneMatrice) {
	console.log ('Nuova versione matrice aggiornata: ' + versioneMatrice);
	localStorage.matriceVersione = versioneMatrice;

	var matrixLavaggioNew = [
{id:1,	idHera:555,	viaHera:"A.COSTA (VIA)",	dettaglioHera:"da v.le Vicini a via Breventani",	viaGoogle:"Via Andrea Costa",	minDisp:1,	minPari:2,	maxDisp:69,	maxPari:50,	day:2,	week:4},
{id:2,	idHera:555,	viaHera:"A.COSTA (VIA)",	dettaglioHera:"da via Breventani a via Montefiorino",	viaGoogle:"Via Andrea Costa",	minDisp:71,	minPari:52,	maxDisp:141,	maxPari:200,	day:4,	week:4},
{id:3,	idHera:617,	viaHera:"A.RIGHI (VIA)",	dettaglioHera:"da via Moline a via Indipendenza",	viaGoogle:"Via Augusto Righi",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:4},
{id:4,	idHera:508,	viaHera:"ABBADIA (VIA)",	dettaglioHera:"da via Riva Reno a via Otto Colonne",	viaGoogle:"Via dell'Abbadia",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:1},
{id:5,	idHera:609,	viaHera:"ACRI (VIA)",	dettaglioHera:"da largo Trombetti a via Bibbiena",	viaGoogle:"Via Francesco Acri",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:3},
{id:6,	idHera:541,	viaHera:"ALBIROLI (VIA)",	dettaglioHera:"da Piazzetta Prendiparte a via Goito, da via Marsala a via Goito",	viaGoogle:"Via Albiroli",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:3},
{id:7,	idHera:643,	viaHera:"ALESSANDRINI (VIA)",	dettaglioHera:null,	viaGoogle:"Via Alessandrini",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:1},
{id:8,	idHera:539,	viaHera:"ALTABELLA (VIA)",	dettaglioHera:"da via Fossalta a via Oberdan",	viaGoogle:"Via Altabella",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:3},
{id:9,	idHera:519,	viaHera:"ALTASETA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Altaseta",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:2},
{id:10,	idHera:577,	viaHera:"AMENDOLA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Giovanni Amendola",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:2},
{id:11,	idHera:653,	viaHera:"ANDALO' (VIA)",	dettaglioHera:null,	viaGoogle:"Via Loderingo Degli Andalò",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:2},
{id:12,	idHera:731,	viaHera:"ARIENTI (VIA)",	dettaglioHera:null,	viaGoogle:"Via Arienti",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:4},
{id:13,	idHera:741,	viaHera:"ARTIERI (VIA)",	dettaglioHera:null,	viaGoogle:"Via degli Artieri",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:2},
{id:14,	idHera:566,	viaHera:"AVESELLA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Avesella",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:1},
							];

	localStorage.matrixLavaggioLocal = JSON.stringify(matrixLavaggioNew);
	localStorage.matriceAggiornataAl = new Date();
}
