#!/usr/bin/env node

//Script usato per copiare le immagini dalla cartella principale a quella specifica del progetto android
//    DA: \res\notification
//     A: \platforms\android\res\drawable


//
// This hook copies various resource files
// from our version control system directories
// into the appropriate platform specific location
//


// configure all the files to copy.
// Key of object is the source file,
// value is the destination location.
// It's fine to put all platforms' icons
// and splash screen files here, even if
// we don't build for all platforms
// on each developer's box.

 console.log("<-- INIZIO COPIA FILE --> ");

//basta inserire altri file nell'array
var filestocopy = [{
    "res/notification/ic_directions_car_white_24dp.png":
    "platforms/android/res/drawable/ic_directions_car_white_24dp.png"
},];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);

        console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
               fs.createWriteStream(destfile));
        }
    });
});

console.log("<-- FINE COPIA FILE --> ");
