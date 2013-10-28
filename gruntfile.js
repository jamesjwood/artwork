
var sizes = [29,40,57,60,50,72,76, 58, 80,114,120,100,144,152];
var shell = {
  stage:{
        command: 'rm -R stage; mkdir stage;',
        stdout: true,
        stderr: true,
        failOnError: true
  }
};
var tasks = ['shell:stage'];

sizes.map(function(size){
  var command = 'qlmanage -t -s '+ size.toString() +' -o ./stage/ icon.svg; mv stage/icon.svg.png stage/icon'+ size.toString() +'.png';
  shell['i' +size.toString()] = {
        command: command,
        stdout: true,
        stderr: true,
        failOnError: true
  };
  tasks.push('shell:i' + size.toString());
});

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
    shell: shell
  });



grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('install', tasks);
grunt.registerTask('default', tasks);
};