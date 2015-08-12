/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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

    it('returns NOT_STRONG_ENOUGH when password is all numbers', function () {
      passwordcheck('124567890', function (res) {
        assert.equal('NOT_STRONG_ENOUGH', res);
      });
    });

    it('returns NOT_STRONG_ENOUGH when password is all letters', function () {
      passwordcheck('dragondrag', function (res) {
        assert.equal('NOT_STRONG_ENOUGH', res);
      });
    });
  });
})();
