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
      MISSING_PASSWORD: 'MISSING_PASSWORD',
      NOT_STRONG_ENOUGH: 'NOT_STRONG_ENOUGH',
      PASSWORD_NOT_A_STRING: 'PASSWORD_NOT_A_STRING',
      PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT',
      SUCCESS: 'SUCCESS'
    };

    function isAllLetters(password) {
      return /^[a-zA-Z]+$/.test(password);
    }

    function isAllNumbers(password) {
      return /^[0-9]+$/.test(password);
    }

    function isTooShort(password) {
      return password.length < minLength;
    }

    function isLongEnough(password) {
      return password.length >= (minLength + 4);
    }

    return function (password, callback) {
      if (! password) {
        callback(MESSAGES.MISSING_PASSWORD);
      } else if (typeof password !== 'string') {
        callback(MESSAGES.PASSWORD_NOT_A_STRING);
      } else if (isTooShort(password)) {
        callback(MESSAGES.PASSWORD_TOO_SHORT);
      } else if (isLongEnough(password)) {
        // password is long enough, it's automatically good.
        callback(MESSAGES.SUCCESS);
      // password is non-empty, a string and length greater
      // than minimum length, shorter than the strong length.
      } else if (isAllLetters(password)) {
        callback(MESSAGES.NOT_STRONG_ENOUGH);
      } else if (isAllNumbers(password)) {
        callback(MESSAGES.NOT_STRONG_ENOUGH);
      // Only if the password has a chance of being
      // strong, but not too strong, is the bloom filter
      // checked. All the above tests mean the bloomfilter
      // data set can be shrunk significantly.
      } else if (bloom.test(password)) {
        callback(MESSAGES.BLOOMFILTER_HIT);
      } else {
        callback(MESSAGES.SUCCESS);
      }
    };
  };
});
