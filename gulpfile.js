let projectFolder = "dist", // final folder name
    sourceFolder = "src"; // work folder name

let path = {           //object with pathes to the file          
    build: {                                 //create final destination folder                           
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/"
    },
    src: {                                 //find files in source folder                           
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"], //exclude all files, that begins from _ in his name
        css: sourceFolder + "/scss/style.{sass,scss}",
        js: sourceFolder + "/js/script.js",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", //search for only image format files
        fonts: sourceFolder + "/fonts/**"          //search for only ttf format fonts
    },
    watch: {                                 //change listening                         
        html: sourceFolder + "/**/*.html", //listen all HTML file etc.
        css: sourceFolder + "/scss/**/*.{sass,scss}",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/fonts/**"
    },
    clean: "./" + projectFolder + "/"  //object with path to project folder. This obj delete this folder every time? when we run our Gulp
}

let { src, dest } = require('gulp'),  //scenaries and plugins;
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),  //auto refresh page
    fileinclude = require('gulp-file-include'), //html compilator
    del = require('del'),    //auto delete files
    sass = require('gulp-sass'),   // gulp sass
    autoprefixer = require('gulp-autoprefixer'),  //autoprefixer
    cleanCss = require('gulp-clean-css'), //cleaner
    rename = require('gulp-rename'), // adds 'min' to name file
    groupMedia = require('gulp-group-css-media-queries'),
    uglify = require('gulp-uglify-es').default,       //optimize JS file
    imagemin = require('gulp-imagemin'),       //optimize images
    sourcemaps = require('gulp-sourcemaps'); //





function browserSync(params) { //create function, that refresh our page
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {                       //collect html function
    return src(path.src.html)  //callback html files from sourse folder
        .pipe(fileinclude())       //collect parts of files into one
        .pipe(dest(path.build.html))              // create new html in final folder  
        .pipe(browsersync.stream())     //refresh page     
}

function css() {
    return src(path.src.css)  //callback css files from sourse folder
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "expanded"
            })
        )
        .pipe(groupMedia())

        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))  //upload file before compressing and optimizing
        /*
                .pipe(cleanCss())
                .pipe(
                    rename({
                        extname: ".min.css"
                    })
                )
                .pipe(dest(path.build.css))   */    // create new css in final folder  and upload file after compressing and optimizing
        .pipe(browsersync.stream())     //refresh page     
}

function js() {                       //collect js function
    return src(path.src.js)  //callback js files from sourse folder
        .pipe(fileinclude())   //collect parts of files into one
        .pipe(dest(path.build.js))
        /*  .pipe(uglify())
          .pipe(
              rename({
                  extname: ".min.js"
              })
          )
          .pipe(dest(path.build.js))   */             // create new js in final folder  
        .pipe(browsersync.stream())     //refresh page     
}

function images() {                       //collect img function
    return src(path.src.img)  //callback img files from sourse folder
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 5
            })
        )
        .pipe(dest(path.build.img))              // create new img in final folder  
        .pipe(browsersync.stream())     //refresh page     
}

function watchFiles(params) {   //real time watcher for changes in files
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.fonts], fonts);
}

function fonts() {                       //collect fonts function
    return src(path.src.fonts)  //callback fonts files from sourse folder
        .pipe(dest(path.build.fonts))              // create new fonts in final folder  
        .pipe(browsersync.stream())     //refresh page     
}

function clean(params) { //function, that clean dist folder
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));      //include functions in the execution process
let watch = gulp.parallel(build, watchFiles, browserSync); // include in gulp

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = sass;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;