//***********************************************
//	Vertical lookup function
//	Si utilizza per trovare le due colonne date in input la prima
//***********************************************
Array.prototype.vlookup = function(needle,index,exactmatch){
    index = index || 0;
    exactmatch = exactmatch || false;
    for (var i = 0; i < this.length; i++){
        var row = this[i];
 
        if ((exactmatch && row[0]===needle) || row[0].toLowerCase().indexOf(needle.toLowerCase()) != -1)
            return (index < row.length ? row[index] : row[0]);
    }
    return null;
}

//***********************************************
//	Riordina gli elementi in un array
//  sposta l'elemento dal vecchio indice al nuovo indice
//	da old index to new index
//***********************************************
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};