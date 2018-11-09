var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch');

gulp.task('sass', function() {
    gulp.src('./css/scss/**/*.scss')
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        port: 1234,
        root: './build',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('assets', function() {
    gulp.src('./assets/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/assets/'))
});

gulp.task('js', function() {
    gulp.src('./js/**/*.js')
        .pipe(gulp.dest('./build/js/'))
});

gulp.task('watch', function() {
    gulp.watch(['./*.html'], ['html'])
    gulp.watch('./css/scss/**/*.scss', ['sass'])
    gulp.watch('./assets/**/*.*', ['images'])
    gulp.watch('./js/**/*.js', ['js'])
});

gulp.task('default', ['connect', 'sass', 'html', 'js', 'assets', 'watch']);
