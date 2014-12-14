[![Circle CI](https://circleci.com/gh/sue445/azusaar_js/tree/gh-pages.svg?style=svg)](https://circleci.com/gh/sue445/azusaar_js/tree/gh-pages)

# Files
- product code
 - src/ : source script
 - lib/ : libraries for product code (ex. jquery)
- test code
 - test/ : QUnit tests (xxxx_test.js, xxxx_test.html)
 - testlib/ : libraries for test code (ex. qunit-tap, sinon, etc)
 - t/ : script for prove
 - template/ : template file (product and test)

# Run Test
- run 1 test
 - ./test/phantomjs_test.sh xxxx_test
- run all tests
 - ./test/phantomjs_test.sh alltests
 - prove

# QUnit tests
http://sue445.github.io/azusaar_js/index.html
