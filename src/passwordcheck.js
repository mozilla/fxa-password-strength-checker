/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// A utility to check and log password strength

define(['bloomfilter',
    'bloomdata'
  ],
  function (bloomfilter, bloomdata) {
    'use strict';

    return function (options) {
      // do something awesome with the options here, like set up the URL to fetch the data from, or
      // set the minimum password length.
      options = options || {};
      var minLength = options.minLength || 8;
      var NO_OF_HASHING_FUNCTIONS = options.noOfHashFunctions || 8;
      var bloom = new BloomFilter(BLOOM, NO_OF_HASHING_FUNCTIONS); //eslint-disable-line no-undef

      var MESSAGES = {
        ALL_NUMBERS_LETTERS: 'ALL_NUMBERS_LETTERS',
        BLOOMFILTER_TRIGGERED: 'BLOOMFILTER_TRIGGERED',
        BLOOMFILTER_HIT: 'BLOOMFILTER_HIT',
        BLOOMFILTER_MISS: 'BLOOMFILTER_MISS',
        MISSING_PASSWORD: 'MISSING_PASSWORD',
        PASSWORD_NOT_A_STRING: 'PASSWORD_NOT_A_STRING',
        PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT'
      };

      function strengthCheck(password) {
        // Check for passwords that at least contain a number and an alphabet,
        // or if alphabets, then at least (minLength + 4) characters long
        var regexString = '((?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+ ]{' + minLength + ',' + (minLength + 4) + '})|([A-Za-z0-9!@#$%^&*()_+ ]{' + (minLength + 4) + ',})';
        var regex = new RegExp(regexString);
        return regex.test(password);
      }

      return function (password, callback) {
        if (! password) {
          callback(MESSAGES.MISSING_PASSWORD);
        } else if (typeof password !== 'string') {
          callback(MESSAGES.PASSWORD_NOT_A_STRING);
        } else if (password.length < minLength) {
          callback(MESSAGES.PASSWORD_TOO_SHORT);
        } else {
          // password is non-empty, a string and length greater than minimum length
          // we can start checking for password strength
          var isStrong = strengthCheck(password);
          if (isStrong) {
            // Only if the password has a chance of being strong do we check with the bloom filter
            // else, simply reject the password. This helps us to not store all-alpha or all-numeric passwords
            // on the bloom filter, reducing space.
            var isPasswordFound = bloom.test(password);
            if (isPasswordFound) {
              callback(MESSAGES.BLOOMFILTER_HIT);
            } else {
              callback(MESSAGES.BLOOMFILTER_MISS);
            }
          } else {
            callback(MESSAGES.ALL_NUMBERS_LETTERS);
          }
        }
      };
    };
  });
