(function(){
  'use strict';
  var assert = chai.assert; //eslint-disable-line no-undef
  describe('Bloomfilter', function(){
    var goodPasswords = ['notinyourdictionary!', 'imaynotbetheretoo', 'thisisagoodcleanpassword', 'combo1234$#@'];
    for(var goodPass in goodPasswords) {
      it('returns false when password is not in bloom filter', function(){
        assert.isFalse(bloom.test(goodPasswords[goodPass])); //eslint-disable-line no-undef
      });
    }
    var badPasswords = ['hooters1', 'charlie2', '!ILO9VEYOU', 'hate_you1990'];
    for(var badPass in badPasswords) {
      it('returns true when password is in bloomfilter', function () {
        assert.isTrue(bloom.test(badPasswords[badPass])); //eslint-disable-line no-undef
      });
    }
  });
})();
