module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
            },

            dist: {

                src: ['build-templates/header.js','cryptico.min.js', 'encryption.js', 'base64.js', 'md5.min.js', 'cache.js','keykeeper.js', 'vk-wrapper.js', 'vk-privacy.js','build-templates/tail.js'],
                dest: 'dist/vk-privacy.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);

};