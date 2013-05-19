/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: grunt.file.readJSON('./.jshintrc.js'),
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/**/build'],
        },

        // Configuration to be run (and then tested).
        {%= short_name %}: {
            normal: {
                options: {
                },

                files: [
                    {
                        expand: true,                       // Enable dynamic expansion.
                        cwd: 'test/normal/fixtures/',       // Src matches are relative to this path.
                        src: ['**/*'],                   // Actual pattern(s) to match.
                        dest: 'test/normal/build/',                // Destination path prefix.
                        // ext: '.js',                         // Dest filepaths will have this extension.
                    },
                ],
            },
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', '{%= short_name %}', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
