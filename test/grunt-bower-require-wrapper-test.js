'use strict';
/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var grunt = require('grunt');

exports.bowerRequireWrapper = {
    /*
    default_options: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default_options');
        var expected = grunt.file.read('test/expected/default_options');
        test.equal(actual, expected, 'should describe what the default behavior is.');

        test.done();
    },
    */
    custom_options: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/customSettings.js');
        var expected = grunt.file.read('test/expected/custom-settings.js');
        test.equal(actual, expected, 'Should wrap with user specified dependencies and a little banner.');

        test.done();
    },
    default_options: function(test) {
        test.expect(1);

        var actual = grunt.file.exists('tmp/defaultSettings.js');
        test.equal(actual, false, 'Should abort operation, not creating this file.');
        test.done();
    },
    dashed_options: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/dashedSettings.js');
        var expected = grunt.file.read('test/expected/dashed-settings.js');
        test.equal(actual, expected, 'The dependency should have the name camelCased');

        test.done();
    }
};