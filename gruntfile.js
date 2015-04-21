module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
            },

            dist: {
                src: ['build-templates/header.js','cryptico.min.js', 'encryption.js', 'vk-privacy.js','build-templates/tail.js'],
                dest: 'dist/vk-privacy.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);

};