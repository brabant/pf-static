const child = require('child_process');
const gulp = require('gulp');
const shell = require('gulp-shell');
const replace = require('gulp-replace');
const fs = require('fs');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const sass = require('gulp-sass');

const jekyllLogger = (buffer) => {
    buffer.toString()
        .split(/\n/)
        .forEach((message) => gutil.log('Jekyll: ' + message));
};

function onError(err) {
    console.log(err);
    this.emit('end');
}

/*gulp.task('serve', () => {
    const jekyll = child.spawn('bundle', [
        'exec',
        'jekyll',
        'serve',
        '--incremental'
    ]);
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});*/

// DEV TASKS

gulp.task('scss', function () {
    return gulp.src('assets/css/_sass/app.scss')
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest('assets/css/'))
});

gulp.task('js', () =>
    gulp.src('assets/js/_scripts/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
);

gulp.task('jekyll-serve', function () {
    gulp.watch("assets/css/_sass/**/*.scss", ["scss"]);
    gulp.watch("assets/js/_scripts/**/*.js", ["js"]);
    const jekyllServe = child.spawn('bundle', [
        'exec',
        'jekyll',
        'serve',
        '--incremental'
    ]);
    jekyllServe.stdout.on('data', jekyllLogger);
    jekyllServe.stderr.on('data', jekyllLogger);
});
