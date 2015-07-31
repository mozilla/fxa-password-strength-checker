/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.config('requirejs', {
    options: {
      baseUrl: 'src/',
      name: 'passwordcheck',
      paths: {
        jquery:'../bower_components/jquery/dist/jquery',
        bloomfilter: 'bloomfilter',
        bloomdata: 'bloomdata_short_pwd'
      },
      waitSeconds: 1
    },
    prod: {
      options: {
        out: 'build/fxa-password-strength-checker.min.js'
      }
    },
    debug: {
      options: {
        out: 'build/fxa-password-strength-checker.js',
        optimize: 'none',
        preserveLicenseComments: true
      }
    }
  });
};
