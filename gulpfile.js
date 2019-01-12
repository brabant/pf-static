const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () =>
    gulp.src('_scripts/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('assets/js'))
);