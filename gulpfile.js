var gulp = require("gulp");
var sass = require("gulp-sass");
var web = require("gulp-webserver");
var fs = require("fs");
var path = require("path");
var url = require("url");
var datajson = require("./data/data.json")
gulp.task("scss", function() {
    return gulp.src("./str/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./str/css"))
})
gulp.task("auto", function() {
    return gulp.watch("./str/scss/**/*.scss", gulp.series("scss"))
})
gulp.task("xuanran", function() {
    gulp.src('str')
        .pipe(web({
            port: 8080,
            // livereload: true,
            // directoryListing: true,
            open: true,
            middleware: function(req, res) {
                var pathneme = url.parse(req.url).pathname;
                console.log(pathneme)
                if (pathneme === "/liat") {
                    res.send({ code: 0, data: datajson })
                } else {
                    pathneme = pathneme === "/" ? "index.html" : pathneme;
                    res.end(fs.readFileSync(path.join(__dirname, "str", pathneme)));
                }


            }
        }));
})