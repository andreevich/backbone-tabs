var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
   gulp.src('./js/lib/Tabs.js')
        .pipe(gulp.dest('./js/lib'))
        .pipe(rename('Tabs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/lib'));
});