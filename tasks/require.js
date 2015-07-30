/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.config('requirejs', {
    options: {
      baseUrl: '.',
      name: 'src/passwordcheck',
      paths: {
        jquery:'bower_components/jquery/dist/jquery',
        bloomfilter: 'src/bloomfilter',
        bloomdata: 'src/bloomdata_short_pwd',
        passwordcheck: 'src/passwordcheck'
      },
      waitSeconds: 1
    },
    prod: {
      options: {
        out: 'build/fxa-password-strength-checker.js'
      }
    }
  });
};
