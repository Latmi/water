const fileinclude = require('gulp-file-include');
const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');


function htmlBuild(cb) {
    src([
        'src/index.html',
        'src/news.html',
        'src/activities.html',
        'src/projects.html',
        'src/activity-detail-custom.html',
        'src/activity-detail-default.html',
    ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist/'));
    cb();
}

function buildStyles(cb) {
    src('src/scss/*.scss')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 9', 'ie 8',], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/css'))
    cb();
}

exports.test = series(htmlBuild)

exports.default = function() {
    watch(['src/scss/*.scss', 'src/**/*.html'], series(buildStyles, htmlBuild));
};

