
var bottomColour = '#39fc8e';
var topColour = '#36fffb';

var newBottomColour = '#39fc8e';
var newTopColour = '#36fffb';


module.exports = function(grunt) {
  "use strict";
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['./icon.svg'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      }
    },
    shell: {
      stage:{
        command: 'rm -R stage; mkdir stage;',
        options:{
          failOnError: true
        }
      },
      png:{
        command: '/Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-png stage/icon.png -w 1024 -h 1024 stage/icon.svg;',
        options:{
          failOnError: true
        }
      }
    },
    replace:{
      colours:{
        src: ['*.svg'],
        dest: ['stage/'],
        replacements: [
          {from: bottomColour, to: newBottomColour},
          {from: topColour, to: newTopColour},
        ]
      }
    },
    bump: {
        options: {},
        files: [ 'package.json']
    }
  });

require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

grunt.registerTask('default', ['shell:stage', 'replace:colours', 'shell:png']);
grunt.registerTask('test', ['default', 'bump']);
};