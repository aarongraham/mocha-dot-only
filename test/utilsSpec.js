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
            var results = [],

                callback = function(item) {
                    results.push(item);
                };

            utils.traverseObject(undefined, callback);

            expect(results).to.deep.equal([undefined]);
        });
    });

    describe('walkFolderStructure', function() {
        it('should return all file paths in the nested folder structure', function(done) {
            var folder = 'test/files/folder1',
                expectedAnswer = [
                    'test/files/folder1/flatfile',
                    'test/files/folder1/folder2/nestedfile'
                ];

            utils.walkFolderStructure(folder, function(err, result) {
                expect(err).to.be.null;
                expect(result).to.deep.equal(expectedAnswer);
                done();
            });
        });

        it('should return files paths in flat folder structure', function(done) {
            var folder = 'test/files/folder1/folder2',
                expectedAnswer = [
                    'test/files/folder1/folder2/nestedfile'
                ];

            utils.walkFolderStructure(folder, function(err, result) {
                expect(err).to.be.null;
                expect(result).to.deep.equal(expectedAnswer);
                done();
            });
        });

        it('should return error if folder does not exist', function(done) {
            var folder = 'test/files/folderNotThere';

            utils.walkFolderStructure(folder, function(err) {
                expect(err).to.not.be.null;
                done();
            });
        });
    });
});