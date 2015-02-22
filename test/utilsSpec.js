var expect = require('chai').expect;
var utils = require('../lib/utils.js');

describe('utils', function() {
    describe('traverseObject', function() {
        it('should call the callback with each node in the object', function() {
            var results = [],
                object = {
                    node1: {
                        node2: {
                            item: 'foo'
                        }
                    },
                    item2: 'bar'
                },

                callback = function(item) {
                    results.push(item);
                };

            utils.traverseObject(object, callback);

            expect(results).to.deep.equal([
                {
                    node1: {
                        node2: {
                            item: 'foo'
                        }
                    },
                    item2: 'bar'
                },
                {
                    node2: {
                        item: 'foo'
                    }
                },
                {
                    item: 'foo'
                }
            ]);
        });

        it('should call the callback once with an empty object', function() {
            var results = [],
                object = {},

                callback = function(item) {
                    results.push(item);
                };

            utils.traverseObject(object, callback);

            expect(results).to.deep.equal([{}]);
        });

        it('should call the callback once if called with undefined', function() {
            var results = [];

                callback = function(item) {
                    results.push(item);
                };

            utils.traverseObject(undefined, callback);

            expect(results).to.deep.equal([undefined]);
        });
    });
});