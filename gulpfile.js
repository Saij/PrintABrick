var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('css', gulp.series(() => {
    return gulp.src([
        'bower_components/semantic/dist/semantic.css',
        'bower_components/lightbox2/dist/css/lightbox.css',
        'bower_components/jquery-ui/themes/base/jquery-ui.css',
        'bower_components/jQuery-ui-Slider-Pips/dist/jquery-ui-slider-pips.css',
        'bower_components/select2/dist/css/select2.css',
        'app/Resources/assets/style/style.scss',
    ]).pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.concat('style.css', {newLine: ' '}))
        .pipe(plugins.environments.production(plugins.cssmin()))
        .pipe(gulp.dest('web/resources/css'));
}));

gulp.task('three', gulp.series((done) => {
    gulp.src([
        'bower_components/three.js/build/three.js',
        'bower_components/three.js/examples/js/libs/stats.min.js',
        'bower_components/three.js/examples/js/loaders/STLLoader.js'
    ]).pipe(plugins.concat('three.js'))
        .pipe(plugins.environments.production(plugins.uglify()))
        .pipe(gulp.dest('web/resources/js'));

    gulp.src([
        'bower_components/three.js/examples/js/controls/OrbitControls.js',
    ]).pipe(plugins.concat('OrbitControls.js'))
        .pipe(plugins.environments.production(plugins.uglify()))
        .pipe(gulp.dest('web/resources/js'));

    return done();
}));

gulp.task('js', gulp.series(() => {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/jQuery-ui-Slider-Pips/dist/jquery-ui-slider-pips.js',
        'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.js',
        'bower_components/select2/dist/js/select2.full.js',
        'bower_components/jquery-address/src/jquery.address.js',
        'bower_components/semantic/dist/semantic.js',
        'bower_components/lightbox2/dist/js/lightbox.js',
        'app/Resources/assets/js/**.js',
    ]).pipe(plugins.concat('style.js'))
        .pipe(plugins.environments.production(plugins.uglify()))
        .pipe(gulp.dest('web/resources/js'));
}));

gulp.task('files:semantic', gulp.series(() => {
    return gulp.src(
        'bower_components/semantic/dist/themes/**'
    ).pipe(gulp.dest('web/resources/css/themes'));
}));

gulp.task('files:images', gulp.series(() => {
    return gulp.src([
        'bower_components/lightbox2/dist/images/**',
        'app/Resources/assets/images/**'
    ]).pipe(gulp.dest('web/resources/images'));
}));

gulp.task('watch', gulp.series(['js', 'css', 'three'], (done) => {
    gulp.watch('app/Resources/assets/js/**.js' , ['js']);
    gulp.watch('app/Resources/assets/style/**/*.scss' , ['css']);
    return done();
}));

gulp.task('default', gulp.series(['files:semantic', 'files:images', 'js', 'css', 'three'], (done) => {
    return done();
}));