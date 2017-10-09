var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
import jeditor from "gulp-json-editor";
import runSequence from "run-sequence";
import del from "del";

gulp.task("copy-package", callback => {
    gulp.src("./package.json")
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

gulp.task("default", callback => {

    runSequence(
        "clean",
        "copy-studio-sdk",
        "copy-runtime-sdk",
        "compile",
        "copy-package", callback);
});