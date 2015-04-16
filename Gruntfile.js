module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // concat: {
      //     files: {
      //         // 元ファイルの指定。
      //         src : 'public/js/src/*.js',
      //         // 出力ファイルの名前・パス指定
      //         dest: 'public/js/logic.js'
      //     }
      // },
      uglify: {
          // dist: {
          //     files: {
          //         // 出力ファイル: 元ファイル
          //         'public/js/*.min.js': 'public/js/*.js'
          //     }
          // }
          my_target: {
              files: [{
                  expand: true,
                  cwd: 'public/js/src',
                  src: '*.js',
                  dest: 'public/js/',
                  ext: '.min.js'
              }]
          }
      },
      watch: {
          js: {
              files: 'public/js/src/*.js', // 監視対象ファイル
//              tasks: ['concat', 'uglify'] // 実行させるタスク
              tasks: ['uglify'] // 実行させるタスク
          }
      }
  });

  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //grunt.registerTaks('default', ['concat']);
  grunt.registerTask('default', ['uglify']);

  };

