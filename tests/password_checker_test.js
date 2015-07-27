/**
 * Created by schandramouli on 7/29/15.
 */
(function() {
  /*global chai, passwordcheck */
  'use strict';
  var assert = chai.assert;
  describe('Password validation with regex', function () {
    it('returns MISSING_PASSWORD when no password is passed', function () {
      passwordcheck('', function (res) {
        assert.equal('MISSING_PASSWORD', res);
      });
    });

    it('returns PASSWORD_TOO_SHORT when password is lower than minLength', function () {
      passwordcheck('124as', function (res) {
        assert.equal('PASSWORD_TOO_SHORT', res);
      });
    });

    it('returns ALL_LETTERS_NUMBERS when password is all numbers', function () {
      passwordcheck('12456789', function (res) {
        assert.equal('ALL_NUMBERS_LETTERS', res);
      });
    });

    it('returns ALL_LETTERS_NUMBERS when password is all letters', function () {
      passwordcheck('dragondrag', function (res) {
        assert.equal('ALL_NUMBERS_LETTERS', res);
      });
    });
  });
})();
