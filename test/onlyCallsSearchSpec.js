var expect = require('chai').expect;
var searcher = require('../lib/onlyCallsSearch.js');

describe('searcher', function() {
    it('should return empty array if no .only calls are present', function() {
        expect(searcher.checkFolder('no-only-calls')).to.deep.equal([]);
    });

    it.skip('should return an item if an it.only call is present', function() {
        expect(searcher.checkFolder('one-only-call')).to.deep.equal(['something']);
    });
});