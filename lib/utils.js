'use strict';

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

module.exports = {
    traverseObject: traverseObject
};