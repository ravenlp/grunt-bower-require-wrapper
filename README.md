# grunt-bower-require-wrapper

Wraps files with [requireJS headers](http://requirejs.org/docs/whyamd.html#definition) for modules definition using bower installed dependencies or user specified ones.

## Getting Started

This is a grunt task. Please refer to the [Grunt documentation](https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md) for more information on how to use this task.

To install this particular plugin use:

```shell
npm install grunt-bower-require-wrapper --save-dev
```

Or register it as a dependency on your `package.json` and run `nom install`

## Basic dependency requirement header wrapping

The following example read the content of `originPath.js` and wraps it in a [typical requireJs header](http://requirejs.org/docs/whyamd.html#definition) specifying each dependency.

```js
grunt.initConfig({
	bowerRequireWrapper: {
		target: {
          files : {
              'destPath.js' : ['originPath.js']
          }
          modules: {
              'jQuery' : '$',
              'underscore' : '_'
          },
          exports: '$'
      }	}
});

grunt.registerTask('default', ['bowerRequireWrapper']);
```

The `destPath.js` file then contains:

```js
/* File generated */
define(["jQuery", "underscore"], function ($, _){

/* Original code from originPath.js */

return $;
});
```



## Example usage with bower

```js
grunt.initConfig({
	bowerRequireWrapper: {
		target: {
          files : {
              'destPath.js' : ['originPath.js']
          }
          modules: {
              'jQuery' : '$',
              'underscore' : '_',
              'angular' : 'angular'
          },
          exports: 'angular'
          bower: true,
          banner: '/* File generated */'
      }	}
});

grunt.registerTask('default', ['bowerRequireWrapper']);
```

This example *loads all the bower installed dependencies names*, then merges it with the modules array to specify the variable name exported for each dependency.

The `destPath.js` file content:

```js
/* File generated */
define(["jQuery", "underscore", "angular"], function ($, _, angular){

/* Original code from originPath.js */

return angular;
});
```



## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
