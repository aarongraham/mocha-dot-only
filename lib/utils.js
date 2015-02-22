'use strict';
var fs = require('fs');

function traverseObject(object, visitor) {
    var key, child;
    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverseObject(child, visitor);
            }
        }
    }
}


// http://stackoverflow.com/q/5827612/
function walkFolderStructure(dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) {
            return done(err);
        }
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) {
                return done(null, results);
            }
            file = dir + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walkFolderStructure(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        }());
    });
}

module.exports = {
    traverseObject: traverseObject,
    walkFolderStructure: walkFolderStructure
};