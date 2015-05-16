//  LISTA VIA CITTA' DI BOLOGNA
//
//	Questo file contiene la lista delle strade così come viene preso da Google
//
// matrice con colonne: via|settimana|giorno
//	settimana --> 1 = prima sett. del mese
//  giorno	  --> 1 = lunedì

//**** La gestione della matrice ora viene assegnata ad uno script online
// 	la prima volta che viene eseguita l'app si deve essere connessi ad internet per 
//	eseguire lo script updateMatrixLavaggio.js e quindi scrivere per la prima volta sul local storage
// 	else gestisce 

if (localStorage.elencoLavaggi){
	var matrixLavaggio = JSON.parse(localStorage["matrixLavaggioLocal"]);
}else{

//il problema di questa lista è che non è compatibile con google
//e non vi sono tutte le giornate dei lavaggi per le vie lunghe
	var matrixLavaggio = [	
["A.COSTA (VIA)",4,2],
["A.RIGHI (VIA)",4,3],
["ABBADIA (VIA)",1,2],
["ACRI (VIA)",3,3],
["ALBIROLI (VIA)",3,2],
["da Piazzetta Prendiparte a via Goito",3,2],
["ALESSANDRINI (VIA)",1,4],
["ALTABELLA (VIA)",3,2],
["ALTASETA (VIA)",2,2],
["AMENDOLA (VIA)",2,3],
["ANDALO' (VIA)",2,4],
["ARIENTI (VIA)",4,5],
["ARTIERI (VIA)",2,5],
["AVESELLA (VIA)",1,3],
["AZZARITA (P.ZZA)",2,2],
["AZZO GARDINO (VIA)",1,2],
["BARACCANO (P.ZZA)",4,3],
["BARBAZZI (VIA)",4,5],
["BARBERIA (VIA)",2,2],
["BAROZZI (VIA)",2,3],
["BATTISTELLI (VIA)",2,2],
["BEGATTO (VIA)",3,3],
["BELFIORE (VIA)",3,5],
["BELLE ARTI (VIA)",1,4],
["BELMELORO (VIA)",1,4],
["BELVEDERE (VIA)",3,5],
["BENEDETTO XIV (VIA)",1,4],
["BERTI PICHAT (V.LE)",1,3],
["BERTIERA (VIA)",3,3],
["BERTOLONI (VIA)",1,4],
["BIANCHETTI (V.LO)",4,5],
["BIBBIENA (VIA)",1,4],
["BOCCA DI LUPO (VIA)",1,5],
["BOLDRINI (VIA)",1,2],
["BOLOGNETTI (V.LO)",3,3],
["BORGONUOVO (VIA)",4,5],
["BOVI CAMPEGGI (VIA)",4,4],
["BRAINA (VIA)",2,5],
["BROCCAINDOSSO (VIA)",2,4],
["BRUGNOLI (VIA)",1,3],
["C.BATTISTI (VIA)",3,3],
["CA' SELVATICA (VIA)",2,5],
["CAIROLI (VIA)",1,3],
["CALARI (VIA)",3,3],
["CALDERINI (P.ZZA)",1,5],
["CALORI (VIA)",1,3],
["CALZOLERIE (VIA)",2,4],
["CANE (VIA)",4,5],
["CAPO DI LUCCA (VIA)",1,3],
["CAPRAMOZZA (VIA)",4,5],
["CAPRERIE (VIA)",2,4],
["CARBONESI (VIA)",2,2],
["CARDUCCI (V.LE)",2,4],
["CARTOLERIE (VIA)",4,5],
["CASTAGNOLI (VIA)",3,2],
["CASTELFIDARDO (VIA)",1,5],
["CASTIGLIONE (VIA)",1,5],
["CENTOTRECENTO (VIA)",1,2],
["CERVELLATI (VIA)",1,3],
["CHIUDARE (VIA)",4,5],
["COLLEGIO DI SPAGNA (VIA)",3,5],
["D'AZEGLIO (VIA)",3,5],
["DANTE (VIA)",3,5],
["DE' COLTELLI (VIA)",2,5],
["DE' MARCHI (VIA)",3,3],
["DEGLI ANGELI (VIA)",2,4],
["DEI MARTIRI (P.ZZA)",1,2],
["DEI MILLE (VIA)",2,3],
["DEL BORGO (VIA)",1,2],
["DEL CESTELLO (VIA)",2,4],
["DEL FRANCIA (P.ZZA)",2,5],
["DEL MONTE (VIA)",3,2],
["DEL PALLONE (VIA)",2,3],
["DEL PIOMBO (VIA)",4,3],
["DEL PORTO (VIA)",2,3],
["DEL PRATELLO (VIA)",3,2],
["DEL RONDONE (VIA)",2,5],
["DELL'ORO (VIA)",4,5],
["DELL'UNIONE (VIA)",3,3],
["DELLA GRADA (VIA)",1,2],
["DELLA RONDINE (VIA)",1,5],
["DELLA ZECCA (VIA)",3,3],
["DELLE OCHE (VIA)",3,3],
["DOLFI (VIA)",2,3],
["DON MINZONI (VIA)",4,3],
["DONZELLE (VIA)",3,2],
["ERCOLANI (VIA)",2,3],
["F.LLI ROSSELLI (VIA)",2,3],
["FALCONE (VIA)",3,4],
["FALEGNAMI (VIA)",1,2],
["FARINI (VIA)",2,2],
["FICO (VIA)",3,2],
["FILIPPO RE (VIA)",1,4],
["FINELLI (VIA)",2,3],
["FONDAZZA (VIA)",4,3],
["FOSCOLO (VIA)",1,5],
["FOSSATO (VIA)",1,5],
["FRASSINAGO (VIA)",1,5],
["GALLIERA (VIA)",1,2],
["GARIBALDI (VIA)",3,4],
["GOITO (VIA)",3,2],
["GRABINSKI (VIA)",1,5],
["GRAMSCI (VIA)",1,3],
["GRAZIANO (VIA)",2,2],
["GRIMALDI (VIA)",2,5],
["GUERRAZZI (VIA)",4,5],
["GUIDO RENI (VIA)",1,4],
["INDIPENDENZA (VIA)",1,2],
["IRNERIO (VIA)",1,2],
["IV NOVEMBRE (VIA)",3,3],
["LAME (VIA)",1,2],
["LENZI (VIA)",2,2],
["LEOPARDI (VIA)",1,3],
["LIBERTA' (VIA)",3,5],
["MAJANI (VIA)",1,5],
["MAJORANA (VIA)",1,2],
["MALAGUTI (VIA)",2,3],
["MALCONTENTI (VIA)",3,3],
["MALPERTUSO (VIA)",4,5],
["MALPIGHI (P.ZZA)",1,2],
["MARCONI (VIA)",3,5],
["MARISCOTTI (VIA)",4,5],
["MARONCELLI (VIA)",4,3],
["MARSALA (VIA)",1,4],
["MASCARELLA (VIA)",2,3],
["MASINI (V.LE)",1,4],
["MASSARENTI (VIA)",4,4],
["MATTUIANI (VIA)",4,5],
["MAZZINI (VIA)",4,4],
["MENARINI (VIA)",4,3],
["MENOTTI (VIA)",2,3],
["MENTANA (VIA)",3,2],
["MERCANZIA (P.ZZA)",1,5],
["MILAZZO (VIA)",1,2],
["MINGHETTI (P.ZZA)",2,5],
["MIRAMONTE (VIA)",3,4],
["MIRASOLE (VIA)",3,4],
["MOLINE (VIA)",3,2],
["MONTEBELLO (VIA)",1,3],
["MONTEGRAPPA (VIA)",1,3],
["MORANDI (P.ZZETTA)",4,3],
["MORANDI (VIA)",4,5],
["MORGAGNI (VIA)",1,5],
["MURRI (VIA)",4,4],
["da v. Dagnini a v.le Carducci",4,4],
["NANNETTI (VIA)",2,2],
["NAZARIO SAURO (VIA)",3,3],
["NOSADELLA (VIA)",3,5],
["OBERDAN (VIA)",1,4],
["OREFICI (VIA)",2,5],
["ORFEO (VIA)",4,5],
["OTTO COLONNE (VIA)",1,2],
["P.TA CASTIGLIONE (MURA)",2,4],
["P.TA CASTIGLIONE (P.ZZA)",2,2],
["P.TA D'AZEGLIO (MURA)",3,4],
["P.TA GALLIERA (MURA)",3,4],
["P.TA MAGGIORE (P.ZZA)",4,3],
["P.TA MASCARELLA (P.ZZA)",2,3],
["P.TA S.DONATO (P.ZZA)",3,3],
["P.TA S.FELICE (P.ZZA)",2,2],
["P.TA S.MAMOLO (P.ZZA)",2,4],
["P.TA S.STEFANO (P.ZZA)",2,4],
["P.TA S.VITALE (P.ZZA)",4,3],
["P.TA SARAGOZZA (MURA)",1,5],
["P.TA SARAGOZZA (P.ZZA)",4,4],
["PAGLIETTA (VIA)",3,4],
["PALESTRO (VIA)",2,2],
["PARIGI (VIA)",4,5],
["PASCOLI (VIA)",2,4],
["PASTRENGO (VIA)",3,5],
["PEPOLI (V.LE)",4,2],
["PETRONI (VIA)",1,5],
["PIELLA (VIA)",3,3],
["PIETRALATA (VIA)",2,2],
["PIETRAMELLARA (V.LE)",4,2],
["POETI (VIA)",2,5],
["POLESE (VIA)",3,3],
["PRENDIPARTE (PIAZZETTA)",3,2],
["PUNTONI (P.ZZA)",1,4],
["RANZANI (VIA)",4,2],
["REMORSELLA (VIA)",3,2],
["RESPIGHI (LARGO)",3,2],
["RIALTO (VIA)",2,4],
["RISMONDO (VIA)",3,3],
["RIVA RENO (VIA)",1,2],
["ROOSVELT (P.ZZA)",1,5],
["ROSSINI (P.ZZA)",1,4],
["RUBBIANI (VIA)",2,4],
["S.ALO' (VIA)",3,2],
["S.CARLO (VIA)",1,3],
["S.CATERINA",2,5],
["S.CROCE (VIA)",2,3],
["S.DOMENICO (VIA)",4,5],
["S.DONATO (VIA)",1,4],
["S.FELICE (VIA)",2,2],
["S.FRANCESCO (P.ZZA)",3,3],
["S.GERVASIO (VIA)",1,5],
["S.GIACOMO (VIA)",3,2],
["S.GIORGIO (VIA)",1,3],
["S.GIULIANO (VIA)",3,4],
["S.ISAIA (VIA)",3,4],
["S.LORENZO (VIA)",1,2],
["S.LUCIA (VIA)",4,5],
["S.MAMOLO (VIA)",3,5],
["da via Bagni di Mario a via Roncrio",3,5],
["da via Roncrio a lato opposto via Bagni di Mario",4,2],
["da lato opposto via Bagni di Mario a piazza di P.ta S.Mamolo",4,2],
["S.MARGHERITA (VIA)",3,5],
["S.MICHELE (P.ZZA)",3,2],
["S.PETRONIO VECCHIO (VIA)",1,5],
["S.PROCOLO (VIA)",3,5],
["S.ROCCO (VIA)",2,3],
["S.SIGISMONDO (VIA)",1,4],
["S.STEFANO (VIA)",2,2],
["S.VALENTINO (VIA)",2,3],
["S.VITALE (VIA)",1,4],
["SAFFI (VIA)",4,2],
["SARAGOZZA (VIA)",3,4],
["SAVENELLA (VIA)",1,5],
["SELMI (VIA)",3,2],
["SENZANOME (VIA)",3,5],
["SILVANI (V.LE)",4,2],
["SOLFERINO (VIA)",2,5],
["SORBELLI (VIA)",2,5],
["STRADA MAGGIORE",2,4],
["STRADELLACCIO (VIA)",1,5],
["STRAZZACAPPE (VIA)",1,3],
["TAGLIAPIETRE (VIA)",3,4],
["TANARI VECCHIA (VIA)",1,3],
["TERRIBILIA (VIA)",3,3],
["TESSITORI (VIA)",2,2],
["TESTONI (VIA)",3,5],
["TODARO (VIA)",1,3],
["TOFFANO (VIA)",2,4],
["TORLEONE (VIA)",1,4],
["TOVAGLIE (VIA)",3,4],
["TRIBUNALI (P.ZZA)",3,4],
["TROMBETTI (LARGO)",1,4],
["URBANA (VIA)",2,5],
["VAL D'APOSA (VIA)",3,5],
["VASCELLI (VIA)",2,4],
["VENEZIAN (VIA)",3,3],
["VENTURINI (VIA)",4,3],
["VERDI (P.ZZA)",1,4],
["VICINI (V.LE)",4,2],
["VII NOVEMBRE (P.ZZA)",4,2],
["VINAZZETTI (VIA)",3,3],
["XII GIUGNO (V.LE)",1,5],
["XX SETTEMBRE (P.ZZA)",3,4],
["ZAMBONI (VIA)",1,4],
["ZANARDI (VIA)",4,2],
["ZANOLINI (VIA)",4,2],
["ZAPPOLI (VIA)",2,3],
["ZUCCHINI (VIA)",2,3],
]};