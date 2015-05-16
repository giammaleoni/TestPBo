// Questo script non è caricato dalla cartella ma è online (da decidere su quale sito)
// 		se la connessione è disponibile lo script si carica e aggiorna i dati sulla local storage che contiene
//		tutti i dati di tutte le vie di Bologna.

var matrixLavaggioNew = [	["Via Test",				1,	4],
							["Via Ciao Ciao",			4,	4],
							["Via Righi Augusto", 		4,	3],
							["Via Bertiera",			3,  3],
							["Via Piella",				3,  3],
							["Via Alessandrini",		1,  4],
							["Via Federico Venturini",	4,  3],
							["Via Pietro Maroncelli",	4,  3],
							["Via Ciro Menotti",		2,  3],
							["Via Agamennone Zappoli",	2,  3],
							["Via Galliera",			1,  2],
							["Via Indipendenza",		1,  2],
							["Via Marsala",				1,  4],
							["Via Guglielmo Oberdan",	1,  4],
							["Via Riva Reno",			1,  2],
							["Via Volturno",			1,  4]
							];
							
localStorage.matrixLavaggioLocal = JSON.stringify(matrixLavaggioNew);
localStorage.matriceAggiornataAl = new Date();