/*
 * grunt-bower-require-wrapper
 *
 * Copyright (c) 2013 Jorge Condomi
 * Licensed under the BSD license.
 */


/**
 * Example usage:

 * requireJsWrapper: {
 *     target: {
 *         files : {
 *             'destPath.js' : ['originPath.js']
 *         }
 *         modules: {
 *             'jQuery' : '$',
 *             'underscore' : '_',
 *             'angular' : 'angular'
 *         },
 *         exports: 'angular',
 *         camelCase: true,
 *         bower: true,
 *         banner: '// File generated //'
 *     }
 *
 * }
 */

'use strict';

var fs = require('fs');

module.exports = function (grunt) {
    grunt.registerMultiTask('bowerRequireWrapper', 'Wraps files with requirejs headers using the registered bower dependencies', function () {
        var options = grunt.util._.defaults(this.data || {}, {
                exports: 'app',
                camelCase: true,
                bower: false,
                banner: '',
                modules: []
            }),
            files = this.files,
            done = this.async();

        if(!options.bower && options.modules.length === 0){
            noOp();
            done();
            return;
        }

        if(!options.bower) {
            setTimeout(function () {
                wrapFiles(options, files, options.modules);
                done();
            }, 100);
        } else {
            // requesting bower registered dependencies.
            require('bower').commands.list({paths: true})
                .on('data', function (data) {
                    for(var dep in data){
                        if (data.hasOwnProperty(dep)){
                            if (options.modules.hasOwnProperty(dep)){
                                data[dep] = options.modules[dep];
                                delete options.modules[dep];
                            } else {
                                data[dep] = dep;
                            }
                        }
                    }
                    data = grunt.util._.defaults(data || {}, options.modules);
                    if(data.length === 0){
                        noOp();
                        done();
                        return;
                    }
                    wrapFiles(options, files, data);
                    done();
                })
                .on('error', function (err) {
                    grunt.warn(err.message);
                    done();
                });
            }
    });


    /*
     *  Helper functions
     */

    var saveFile = function (filepath, content){
        try{
            grunt.file.write(filepath, content);
            grunt.log.writeln('File "' + filepath + '" wrapped and saved.');
        } catch (err){
            grunt.fail.fatal(err);
        }
    };

    var wrappedContent = function (moduleName, moduleVars, sep, content, exports, banner){
        var header = banner + 'define(' + JSON.stringify(moduleName) + ', function (' + moduleVars.join(', ') + '){' + sep;
        return header + sep + content + sep + 'return ' + exports + ';' + sep + '});';
    };

    var wrapFiles = function (options, files, modules){
        var sep = grunt.util.linefeed,
            formalName = [],
            actualName = [];
        for(var m in modules){
            formalName.push(m);
            if (options.camelCase) {
                actualName.push(sanitizeName(modules[m]));
            } else {
                actualName.push(modules[m]);
            }
        }
        files.forEach(function (file) {
            var src = file.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }
                return true;
            });
            var content = wrappedContent(formalName, actualName, sep, grunt.file.read(src), options.exports, options.banner);
            //grunt.log.writeln(content);
            saveFile(file.dest, content);
        });
    };

    var sanitizeName = function (name){
        return name.replace(/-([a-z])/g, function (w) { return w[1].toUpperCase(); });
    };

    var noOp = function(){
        grunt.log.writeln("No modules specified to wrap. No op.");
    };

};