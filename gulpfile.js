var gulp = require('gulp');
var mist = require('minimist');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
// var px2rem = require('gulp-px2rem-plugin');
var px2rem = require('gulp-px3rem');
var autoprefixer = require('gulp-autoprefixer');
var reload = browserSync.reload;
var replace = require('gulp-replace');
var inlinesource = require('gulp-inline-source');
var imagemin = require('gulp-imagemin');
var del = require('del');

// 设置命令行变量参数 
var folder = {
  string: 'dir',
  // default: { env: process.env.NODE_ENV || 'production' }
};
var folders = mist(process.argv.slice(2), folder);


// 调试命令

gulp.task('less', function () {
  return gulp.src('./src/' + folders.dir + "/css.less")
    .pipe(less())
    // .pipe(px2rem({
    //   baseDpr: 2,             // base device pixel ratio (default: 2)
    //   threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
    //   remVersion: true,       // whether to generate rem version (default: true)
    //   remUnit: 100,            // rem unit value (default: 75)
    //   remPrecision: 6         // rem precision (default: 6)
    // }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: false //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('./src/' + folders.dir))
    .pipe(reload({ stream: true }));
});

// 静态服务器 + 监听 less/html 文件
gulp.task('serve', ['less'], function () {

  browserSync.init({
    // server: "./app"
    server: {
      baseDir: "./src",
      directory: true
    },
    browser: "chrome"
  });

  gulp.watch('./src/' + folders.dir + "/*.less", ['less']);
  gulp.watch('./src/' + folders.dir + "/*.htm").on('change', reload);
});

gulp.task('default', ['serve']);



// 产出命令
gulp.task('inline', function () {
  return gulp.src('./src/' + folders.dir + '/*.htm')
    .pipe(inlinesource())
    .pipe(replace('<style>', '<style mip-custom>'))
    .pipe(replace('images/', 'https://m.hddszx.com/templets/zhuanti/' + folders.dir + '/images/'))
    .pipe(gulp.dest('./dist/' + folders.dir));
  return stream;
});
gulp.task('image', ['inline'], function () {
  gulp.src('./src/' + folders.dir + '/images/*.{png,jpg,gif,svg}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./dist/' + folders.dir + '/images'));
  // return stream;
});
gulp.task('del', ['image'], function (cb) {
  del([
    './src/' + folders.dir + '/css.debug.css',
    // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    // 'dist/mobile/**/*',
    // 我们不希望删掉这个文件，所以我们取反这个匹配模式
    // '!dist/mobile/deploy.json'
  ], cb);
});
gulp.task('out', ['del']);