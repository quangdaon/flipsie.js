var gulp   = require('gulp'),
	sass   = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sync   = require('browser-sync').create();

gulp.task('styles', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' })
			.on('error', sass.logError))
		.pipe(prefix())
		.pipe(rename('flipster.min.css'))
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('demo/css'))
		.pipe(sync.stream())
		.pipe(notify("Compressed: <%= file.relative %>"));
});

gulp.task('scripts', function () {
	return gulp.src('src/js/*.js')
		.pipe(uglify().on('error', function(err){
			var error = err.cause;
			console.error('Error at: ', error.filename, ' - line: ', error.line, ' | col: ', error.col, '\n', error.message);
		}))
		.pipe(rename('flipster.min.js'))
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('demo/js'))
		.pipe(sync.stream())
		.pipe(notify("Compressed: <%= file.relative %>"));
}),

gulp.task('watch', function () {
	sync.init({
		server: "./demo",
	});
	
	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch("demo/*.html").on('change', sync.reload);
	gulp.watch("src/js/*.js", ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);