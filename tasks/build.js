import gulp from 'gulp';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import cssmin from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-less';

import { CONFIG } from './_config/gulp.config';

// 合并所有的LichUI的js文件.
let buildLichUIJs = () => {
    return gulp.src(CONFIG.LichUIComponentFiles.script, { base: CONFIG.path.dev })
        .pipe(concat('LichUI.js'))
        .pipe(gulp.dest(CONFIG.path.publishLichUI))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('LichUI.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CONFIG.path.publishLichUI));
};

// 合并所有的LichUI的css文件.
let buildLichUICss = () => {
    return gulp.src(CONFIG.LichUIComponentFiles.style, { base: CONFIG.path.dev })
        .pipe(less(CONFIG.less))
        .pipe(concat('LichUI.css'))
        .pipe(gulp.dest(CONFIG.path.publishLichUI))
        .pipe(sourcemaps.init())
        //advanced 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        .pipe(cssmin({ advanced: false }))
        .pipe(rename('LichUI.min.css'))
        .pipe(gulp.dest(CONFIG.path.publishLichUI));
};

// 构建外部依赖.
let buildLib = () => {
    return gulp.src(CONFIG.path.lib)
        .pipe(gulp.dest(CONFIG.path.publishLib));
};

// 构建示例.
let buildExampleLess = () => {
    return gulp.src(CONFIG.example.less, { base: CONFIG.example.base })
        .pipe(less(CONFIG.less))
        .pipe(gulp.dest(CONFIG.path.publish));
};

let buildexampleHtml = () => {
    return gulp.src(CONFIG.example.html, { base: CONFIG.example.base })
        .pipe(gulp.dest(CONFIG.path.publish));
};

let buildExampleJs = () => {
    return gulp.src(CONFIG.example.js, { base: CONFIG.example.base })
        .pipe(gulp.dest(CONFIG.path.publish));
}

let buildExample = gulp.parallel(buildExampleLess, buildexampleHtml, buildExampleJs);

exports.buildLichUIJs = buildLichUIJs;
exports.buildLichUICss = buildLichUICss;
exports.buildLib = buildLib;
exports.buildExample = buildExample;