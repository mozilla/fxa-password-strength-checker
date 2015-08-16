# Password strength checker for Firefox Accounts
[![Build Status](https://travis-ci.org/mozilla/fxa-password-strength-checker.svg?branch=master)](https://travis-ci.org/mozilla/fxa-password-strength-checker)
* Maintains a bloom filter with list of common/leaked passwords
* Checks for the presence of common passwords 

## Usage:
* Create a new instance of the password checker, like so:
  ` var checkpassword = new PasswordCheck(options); `
  where options can be:
  ```
  options: {
    minLength : integer, // minimum length of password, default 8
    noOfHashFunctions: integer // no of hash functions to use for the bloom filter, default 8
    // do not change noOfHashFunctions unless you also change it in the bloomfilter file.
  }
  ```
* Call the checkpassword with a callback, like so:
  ```
  checkpassword(password, callback);
  ```