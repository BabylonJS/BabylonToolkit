var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge2 = require("merge2");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var tsConfig = {
    noExternalResolve: true,
    target: 'ES5',
    module: 'system',
    lib: ["es5", "es2015", "dom"],
    declarationFiles: true,
    typescript: require('typescript'),
    experimentalDecorators: true,
    isolatedModules: false,
    removeComments: false
};
var tsProject = typescript.createProject(tsConfig);

var files = [
    "./temp/babylon-master.js",
    "./temp/babylon-system.js",
    "./temp/babylon-toolkit.js"
]

gulp.task("compile", function () {
    var tsResult = gulp.src(["./types/**/*.ts", "./src/**/*.ts"])      
            .pipe(sourcemaps.init())
            .pipe(typescript(tsProject));

    return merge2([
        tsResult.dts
            .pipe(concat("babylon.manager.d.ts"))
            .pipe(gulp.dest("../Assets/Babylon/Template/Typings")),
        tsResult.js
            .pipe(sourcemaps.write("./", {
                    includeContent:false, 
                    sourceRoot: (filePath) => {
                        return ''; 
                    }
                }))
            .pipe(gulp.dest("./temp/"))
    ])            
});

gulp.task("default", ["compile"], function () {
    return merge2(gulp.src(files))
        .pipe(concat("babylon.manager.jscript"))
        .pipe(uglify())
        .pipe(gulp.dest("../Assets/Babylon/Template/Library/"));
});