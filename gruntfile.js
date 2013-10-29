

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
        stdout: true,
        stderr: true,
        failOnError: true
      },
      png:{
        command: '/Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-png stage/icon.png -w 1024 -h 1024 icon.svg;  /Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-png stage/splash.png -w 6400 -h 11360 splash.svg;/Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-png stage/splashShort.png -w 640 -h 960 splashShort.svg;',
        stdout: true,
        stderr: true,
        failOnError: true
      }
    },
    replace:{
      splash:{
        src: ['icon.svg'],
        dest: ['stage/gen_splash.svg'],
        replacements: [
          {from: 'width="2510"', to: 'width="634"'},
          {from: 'height="2510"', to: 'height="1136"'},
          {from: 'icon.svg', to: 'gen_splash.svg'},
          {from: 'inkscape:cx="-168.01321"', to: 'inkscape:cx="295.57909"'},
          {from: 'inkscape:zoom="0.14"', to: 'inkscape:zoom="0.3959798"'},
          {from: 'gradientUnits="userSpaceOnUse"', to: 'gradientUnits="userSpaceOnUse" gradientTransform="matrix(0.25498005,0,0,0.45258958,4782.9983,4015.2554)"'}
        ]
      }
    }

  });


grunt.loadNpmTasks('grunt-text-replace');

grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('default', ['shell:stage']);
};