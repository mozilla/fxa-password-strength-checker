(function() {
  /*global chai, passwordcheck */
  'use strict';
  var assert = chai.assert;
  describe('Bloomfilter', function () {
    var goodPasswords = ['notinyourdictionary!', 'imaynotbetheretoo', 'thisisagoodcleanpassword', 'combo1234$#@'];
    for (var goodPass in goodPasswords) {
      it('returns BLOOMFILTER_MISS when password is not in bloom filter', function () {
        passwordcheck(goodPasswords[goodPass], function (res) {
          assert.equal('BLOOMFILTER_MISS', res);
        });
      });
    }
    var badPasswords = ['hooters1', 'charlie2', '!ILO9VEYOU', 'hate_you1990'];
    for (var badPass in badPasswords) {
      it('returns BLOOMFILTER_HIT when password is in bloomfilter', function () {
        passwordcheck(badPasswords[badPass], function (res) {
          assert.equal('BLOOMFILTER_HIT', res);
        });
      });
    }
  });
})();
