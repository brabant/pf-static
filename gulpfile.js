const child = require('child_process');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const mincss = require('gulp-minify-css');

const jekyllLogger = (buffer) => {
    buffer.toString()
        .split(/\n/)
        .forEach((message) => util.log('Jekyll: ' + message));
};

function onError(err) {
    console.log(err);
    this.emit('end');
}

//////////////////////// DEV ////////////////////////

gulp.task('scss', function () {
    return gulp.src('assets/css/_sass/app.scss')
        .pipe(sass())
        .on('error', onError)
        .pipe(autoprefixer())
        .pipe(mincss({keepBreaks: false}))
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

gulp.task('develop', function () {
    gulp.watch("assets/css/_sass/**/*.scss", ["scss"]);
    gulp.watch("assets/js/_scripts/**/*.js", ["js"]);
    const jekyllServe = child.spawn('bundle', ['exec', 'jekyll', 'serve']);
    jekyllServe.stdout.on('data', jekyllLogger);
    jekyllServe.stderr.on('data', jekyllLogger);
});


//////////////////////// BUILD ////////////////////////

gulp.task('clean', function () {
    const jekylClean = child.spawn('bundle', ['exec', 'jekyll', 'clean']);
    jekylClean.stdout.on('data', jekyllLogger);
    jekylClean.stderr.on('data', jekyllLogger);
});

gulp.task('build', ['js', 'scss', 'clean'], function () {
    const jekyllServe = child.spawn('bundle', ['exec', 'jekyll', 'build']);
    jekyllServe.stdout.on('data', jekyllLogger);
    jekyllServe.stderr.on('data', jekyllLogger);
});