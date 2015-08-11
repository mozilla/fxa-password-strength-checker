var fs = require('fs');
// do an npm i bloomfilter first
var bf = require('bloomfilter');

var bloom = new bf.BloomFilter(
  10 * 54000, // number of bits to allocate.
  8        // number of hash functions.
);
fs.readFile('human-ans-shorter.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var s = data.split('\n');
  s.forEach(function(pwd){
    bloom.add(pwd);
  });
  var array = [].slice.call(bloom.buckets),
    json = JSON.stringify(array);
  // make sure the file exists before running this
  fs.writeFile('bloomdata_short_pwd.js',json);
});
