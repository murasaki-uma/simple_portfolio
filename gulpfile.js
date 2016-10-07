
var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var watch = require("gulp-watch")
var plumber = require('gulp-plumber')
var connect = require("gulp-connect")
const babel = require('gulp-babel');
var runSequence = require('run-sequence');

var paths = {srcDir:"src",dstDir:""}
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: '', // ルートディレクトリ
			index: 'index.html'
		},
		startPath: ''
		//proxy: "localhost:80"
	});

});


gulp.task('watch',['browser-sync'],function() {
    gulp.watch('src/**/*.pug',['pug-sequence']);
    gulp.watch('src/**/*.js',['babel']);
    gulp.watch('src/**/*.ts',['ts']);
    gulp.watch('src/**/*.styl',['stylus-sequence']);


});

gulp.task('pug-sequence', function(callback) {
    return runSequence(
        'pug',
        'refresh',
        callback
    );
});

gulp.task('stylus-sequence', function(callback) {
    return runSequence(
        'stylus',
        'refresh',
        callback
    );
});



gulp.task('babel', () => {
    var srcGlob = paths.srcDir + '/js/*.js';
    var dstGlob = paths.dstDir + '/js/';
    return gulp.src(srcGlob)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(dstGlob));
browserSync.reload();
});

gulp.task('refresh',function () {
    browserSync.reload();
    connect.reload();

});

gulp.task('pug', function buildHTML() {
    var srcGlob = paths.srcDir + '/pug/*.pug';
    var dstGlob = paths.dstDir + './';
    gulp.src([srcGlob])
        .pipe(plumber())
        .pipe(watch([srcGlob]))
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest(dstGlob));
    //.pipe(connect.reload());
    browserSync.reload();
});





gulp.task('stylus',function(){
    var srcGlob = paths.srcDir + '/stylus/*.styl';
    var dstGlob = paths.dstDir + './css/';
    gulp.src(srcGlob)
        .pipe(plumber())
        .pipe(watch(srcGlob))
        .pipe(stylus())
        .pipe(gulp.dest(dstGlob))


	browserSync.reload();
})

// gulp.task('compress', function() {
//     gulp.src('public/js/*.js')
//         .pipe(uglify({
//             compress:true,
//             preserveComments:false
//         }))
//         .pipe(gulp.dest('./public/js'));
// });

gulp.task('default', ['watch']);
gulp.task('compress', ['compress']);
