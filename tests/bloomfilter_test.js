(function(){
  /*global chai, bloom */
  'use strict';
  var assert = chai.assert;
  describe('Bloomfilter', function(){
    var goodPasswords = ['notinyourdictionary!', 'imaynotbetheretoo', 'thisisagoodcleanpassword', 'combo1234$#@'];
    for(var goodPass in goodPasswords) {
      it('returns false when password is not in bloom filter', function(){
        assert.isFalse(bloom.test(goodPasswords[goodPass]));
      });
    }
    var badPasswords = ['hooters1', 'charlie2', '!ILO9VEYOU', 'hate_you1990'];
    for(var badPass in badPasswords) {
      it('returns true when password is in bloomfilter', function () {
        assert.isTrue(bloom.test(badPasswords[badPass]));
      });
    }
  });
})();
