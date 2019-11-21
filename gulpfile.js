const gulp = require('gulp'); // src dest series
const less = require('gulp-less');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


async function delPreBuild() {
    await del.sync('build');
}


function lessTask() {
    return gulp.src('src/**/*')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'Firefox > 20'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build'));
}


async function finishTask() {
    await console.log('done!');
}


let taskSeries = gulp.series(delPreBuild, lessTask, finishTask);

function watch () {
    const watcher = gulp.watch('src/**/*', taskSeries);
    watcher.on('change', event => {
        console.log(event);
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
}

taskSeries = gulp.parallel(watch, taskSeries);

exports.default = taskSeries;

