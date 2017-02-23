// Load Grunt
module.exports = function (grunt) {
  'use strict';

  // Record grunt task execution times. Must be first.
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Tasks
    clean: {
      html: ['dist/*.html'],
      css: ['dist/css/*'],
      js: ['dist/js/*'],
      img: ['dist/img/*']
    },
    // copy: {
    //   js: {
    //     expand: true,
    //     cwd: 'src/js/',
    //     src: '**/*.js',
    //     dest: 'dist/js/'
    //   }
    // },
    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      // options: {
      //   report: 'gzip'
      // },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['**/*.css', '!**/*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    autoprefixer: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['**/*.css', '!**/*.min.css'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'src/index.html'      // 'destination': 'source'
        }
      }
    },
    imagemin: {                                    // Task
      dist: {                                      // Target
        options: {                                 // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true,                            // Enable dynamic expansion
          cwd: 'src/img',                          // Src matches are relative to this path
          src: ['**/*.{png,jpg,jpeg,gif}'],        // Actual patterns to match
          dest: 'dist/img'              // Destination path prefix
        }]
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      files: ['Gruntfile.js', 'src/**/*.js']        // 'destination': 'source'
    },
    sass: {                                         // Task
      dist: {                                       // Target
        options: {                                  // Target options
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['**/*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'dist/js/',
          ext: '.min.js'
        }]
      }
    },
    watch: {
      dist: {
        files: ['src/scss/**/*.scss', '<%= jshint.files %>', 'src/*.html'],
        tasks: ['compile']
      },
      options: {
        livereload: true       // Start a livereload listener on the default port 35729.
      }
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Grunt tasks
  // Register the "img" task.
  grunt.registerTask('img', ['clean:img', 'imagemin']);
  // Register the "css" task.
  grunt.registerTask('html', ['clean:html', 'htmlmin']);
  // Register the "css" task.
  grunt.registerTask('css', ['clean:css', 'sass', 'autoprefixer', 'cssmin']);
  // Register the "js" task.
  grunt.registerTask('js', ['clean:js', 'jshint', 'uglify']);
  // Alias the "compile" task to run "css" and "js".
  grunt.registerTask('compile', ['img', 'html', 'css', 'js']);
  // Alias the "default" task to "compile".
  grunt.registerTask('default', ['compile']);
};
