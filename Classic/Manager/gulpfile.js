var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge2 = require("merge2");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var tsConfig = {
    target: 'ES5',
    module: 'system',
    declarationFiles: true,
    typescript: require('typescript'),
    experimentalDecorators: true,
    isolatedModules: false,
    removeComments: false,
    noResolve: true
};

var tsProject = typescript.createProject(tsConfig);

var files = [
    "./libs/fills.js",
    "./libs/stats.js",
    "./temp/babylon.scenecomponents.js",
    "./temp/babylon.scenemanager.js",
    "./temp/babylon.scenenavagent.js",
    "./temp/babylon.sceneparticles.js",
    "./temp/babylon.sceneplayers.js",
    "./temp/babylon.sceneplugins.js",
    "./temp/babylon.sceneshaders.js",
    "./temp/babylon.sceneshuriken.js",
    "./temp/babylon.scenestates.js",
    "./temp/babylon.sceneutilities.js",
    "./temp/babylon.scenewindows.js",
    "./temp/babylon.scenexactions.js",
    "./libs/terrains.js"
]

gulp.task("compile", function () {
    var tsResult = gulp.src("./src/**/*.ts")      
            .pipe(sourcemaps.init())
            .pipe(tsProject());

    return merge2([
        tsResult.dts
            .pipe(concat("babylon.manager.d.ts"))
            .pipe(gulp.dest("../Assets/Babylon/Library")),
        tsResult.js
            .pipe(sourcemaps.write("./", 
                {
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
        .pipe(concat("babylon.manager.bjs"))
        .pipe(uglify())
        .pipe(gulp.dest("../Assets/Babylon/Library/"));
});
