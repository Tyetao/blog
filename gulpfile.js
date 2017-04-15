// 添加引用
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

//这个可以让express启动
gulp.task("node", function() {
    nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: 'node_modules/',
        env: {
            'NODE_ENV': 'development'
        }
    })
});


gulp.task('server', ["node"], function() {
    var files = [
        'server/**/*.*'
    ];

    //gulp.run(["node"]);
    browserSync.init(files, {
        proxy: 'http://localhost:3006',
        browser: 'chrome',
        notify: false,
        open: false,
        port: 3002
    });

    gulp.watch(files).on("change", reload);
});
