/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// A utility to check and log password strength

define([
  'bloomfilter',
  'bloomdata-top100k'
], function (BloomFilter, bloomdata) {
  'use strict';

  return function (options) {
    options = options || {};
    var minLength = options.minLength || 8;

    var numberOfHashes = bloomdata.numberOfHashes;
    var bloomFilterData = bloomdata.bloomFilterData;
    var bloom = new BloomFilter(bloomFilterData, numberOfHashes);

    var MESSAGES = {
      BLOOMFILTER_HIT: 'BLOOMFILTER_HIT',
      BLOOMFILTER_MISS: 'BLOOMFILTER_MISS',
      MISSING_PASSWORD: 'MISSING_PASSWORD',
      NOT_STRONG_ENOUGH: 'NOT_STRONG_ENOUGH',
      PASSWORD_NOT_A_STRING: 'PASSWORD_NOT_A_STRING',
      PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT'
    };

    function isAllLetters(password) {
      return /^[a-zA-Z]+$/.test(password);
    }

    function isAllNumbers(password) {
      return /^[0-9]+$/.test(password);
    }

    function isWeakPassword(password) {
      // Check for passwords that consist of only numbers
      // or only alphabets, and are of length less than (minlength + 4)
      if (password.length >= (minLength + 4)) {
        return false;
      } else if (isAllLetters(password)) {
        return true;
      } else if (isAllNumbers(password)) {
        return true;
      }

      return false;
    }

    return function (password, callback) {
      if (! password) {
        callback(MESSAGES.MISSING_PASSWORD);
      } else if (typeof password !== 'string') {
        callback(MESSAGES.PASSWORD_NOT_A_STRING);
      } else if (password.length < minLength) {
        callback(MESSAGES.PASSWORD_TOO_SHORT);
      // password is non-empty, a string and length greater
      // than minimum length we can start checking
      // for password strength
      } else if (isWeakPassword(password)) {
        callback(MESSAGES.NOT_STRONG_ENOUGH);
      // Only if the password has a chance of being
      // strong do we check with the bloom filter
      // else, simply reject the password. This
      // helps us to not store all-alpha or
      // all-numeric passwords.
      } else if (bloom.test(password)) {
        callback(MESSAGES.BLOOMFILTER_HIT);
      } else {
        callback(MESSAGES.BLOOMFILTER_MISS);
      }
    };
  };
});
