module.exports = function(grunt) {

  grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      concat: {
          files: {
              // 元ファイルの指定。
              src : 'public/src/js/*.js',
              // 出力ファイルの名前・パス指定
              dest: 'public/src/js/client.js'
          }
      },
      uglify: {
          dist: {
              files: {
                  // 出力ファイル: 元ファイル
                  'public/js/client.min.js': 'public/src/js/client.js'
              }
          }
      },
      watch: {
          js: {
              files: 'public/src/js/*.js', // 監視対象ファイル
              tasks: ['concat', 'uglify'] // 実行させるタスク
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify']);
};

