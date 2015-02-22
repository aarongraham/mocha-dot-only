#! /usr/bin/env node

var searcher = require('../index.js');

var answer = searcher.checkFolder(process.argv.slice(2));

console.log(answer);