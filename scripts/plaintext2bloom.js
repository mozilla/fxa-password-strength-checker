
var fs = require('fs');
// do an npm i bloomfilter first
var bf = require('bloomfilter');

var inputFilename = process.argv[2];
var outputFilename = process.argv[3];
var numberOfHashes = process.argv[4] || 8;

if (! (inputFilename && outputFilename)) {
  console.error('usage: node plaintext2bloom.js <input filename> <output filename> [<number of hashes>]');
  return 1;
}

fs.readFile(inputFilename, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var s = data.split('\n');
  var bloom = new bf.BloomFilter(
    10 * s.length,  // number of bits to allocate per item
    numberOfHashes  // number of hash functions.
  );

  s.forEach(function(pwd){
    bloom.add(pwd);
  });

  var array = [].slice.call(bloom.buckets);

  // ensure the output file has the necessary requirejs constructs.
  var output = 'define([], function () {\n';
  output += '  return ' + JSON.stringify({
    numberOfHashes: numberOfHashes,
    bloomFilterData: array
  }) + ';\n';
  output += '});';

  fs.writeFile(outputFilename, output);
});
