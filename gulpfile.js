const gulp = require('gulp');
const less = require('gulp-less');


function lessTask() {
    return gulp.src('src/**/*.less')
            .pipe(less())
            .pipe(gulp.dest('build'));

}

function defaultTask() {
    return gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('build2'));

}

exports.default = gulp.series(lessTask, defaultTask);