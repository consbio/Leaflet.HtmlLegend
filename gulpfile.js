var gulp = require('gulp');
var minify = require('gulp-minify');


gulp.task('build', function () {
    gulp.src('L.Control.HtmlLegend.js')
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
    gulp.watch('L.Control.HtmlLegend.js', ['build']);
});

gulp.task('defaultValue', ['build', 'watch']);
