
var path = require('path');
var fs = require('fs');

var inputFilename = process.argv[2];
if (! inputFilename) {
  console.error('usage: node analyze.js <input filename>');
  return 1;
}

var fileToAnalyzePath = path.join(__dirname, inputFilename);

var passwords = fs.readFileSync(fileToAnalyzePath, 'utf8').split('\n').filter(function (password) { return password && password.length; });

var allNumCount = passwords.reduce(function (accumulator, password) {
  if (/^\d+$/.test(password)) {
    return accumulator++;
  }
  return accumulator;
}, 0);

var allAlphaCount = passwords.reduce(function (accumulator, password) {
  if (/^[a-zA-Z]+$/.test(password)) {
    return accumulator++;
  }
  return accumulator;
}, 0);

var shortestWord;
var minLength = passwords.reduce(function (accumulator, password) {
  if (password.length < accumulator) {
    shortestWord = password;
    return password.length;
  }
  return accumulator;
}, Infinity);

var longestWord;
var maxLength = passwords.reduce(function (accumulator, password) {
  if (password.length > accumulator) {
    longestWord = password;
    return password.length;
  }
  return accumulator;
}, 0);

console.log('total: %d, min length %d (%s), max length: %d (%s), all alpha: %d, all num: %d',
    passwords.length, minLength, shortestWord, maxLength, longestWord, allAlphaCount, allNumCount);

