var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
import jeditor from "gulp-json-editor";
import runSequence from "run-sequence";
import del from "del";
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');

gulp.task("copy-package", callback => {
    return gulp.src("./package.json")
        .pipe(jeditor((pkgjson) => {
            delete pkgjson.scripts.sdk;
            return pkgjson;
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("copy-studio-sdk", callback => {
    return gulp.src("./wi-studio/**/*")
        .pipe(gulp.dest("./dist/wi-studio"));
});

gulp.task("copy-runtime-sdk", callback => {
    return gulp.src("./wi-runtime/**/*")
        .pipe(gulp.dest("./dist/wi-runtime"));
});

gulp.task("compile", callback => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./dist"));
});

gulp.task("clean", callback => {
    return del(["./dist/**/*"], {
        force: true
    }, callback);
});

gulp.task("gzip", callback => {
    return gulp.src("dist/*")
        .pipe(tar("wi-cli.tar"))
        .pipe(gzip())
        .pipe(gulp.dest("./"));
});


gulp.task("default", callback => {

    return runSequence(
        "clean",
        "copy-studio-sdk",
        "copy-runtime-sdk",
        "compile",
        "copy-package",
        "gzip", callback);
});