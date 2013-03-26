'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        nodeunit: {
            tests: ['test/*-test.js']
        },
        clean: {
            test: ['tmp']
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true
            },
            globals: {}
        },
        bowerRequireWrapper: {
            custom_options: {
                files: {
                    'tmp/customSettings.js' : ['test/fixtures/file1.js']
                },
                modules: {
                    'jQuery' : 'jQuery'
                },
                bower: false,
                exports: 'jQuery',
                banner: '/* TEST File generated */\n'
            },
            default_options: {
                files: {
                    'tmp/defaultSettings.js' : ['test/fixtures/file1.js']
                }
            },
            dashed_options: {
                files: {
                    'tmp/dashedSettings.js' : ['test/fixtures/file1.js']
                },
                modules: {
                    'jQuery' : 'jQuery-dashed'
                }
            }
        }
    });

    // Load local tasks.
    grunt.loadTasks('tasks');


    // Contrib tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Test task
    grunt.registerTask('test', ['clean', 'bowerRequireWrapper', 'nodeunit']);

    // Default task.
    grunt.registerTask('default', ['jshint', 'test']);
};