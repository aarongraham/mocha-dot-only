var expect = require("chai").expect;
var searcher = require('../lib/only-calls-search.js');

describe('searcher', function() {
    it('should return the args that are passed in', function() {
        expect(searcher.checkFolder('foo')).to.be.equal('foo');
    });
});