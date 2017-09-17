import gulp from 'gulp';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import cssmin from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-less';
import { CONFIG } from './_config/gulp.config';

let server = browserSync.create();

let runLocalServer = (done) => {
    server.init(CONFIG.browserSync);
    done();
};

let watchLichUIJs = () => {
    return gulp.src(CONFIG.LichUIComponentFiles.script, { base: CONFIG.path.dev })
        .pipe(concat('LichUI.js'))
        .pipe(gulp.dest(CONFIG.path.publishLichUI))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('LichUI.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CONFIG.path.publishLichUI))
        .pipe(server.stream());
};

let watchLichUICss = () => {
    return gulp.src(CONFIG.LichUIComponentFiles.style, { base: CONFIG.path.dev })
        .pipe(less(CONFIG.less))
        .pipe(concat('LichUI.css'))
        .pipe(gulp.dest(CONFIG.path.publishLichUI))
        .pipe(sourcemaps.init())
        //advanced 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        .pipe(cssmin({ advanced: false }))
        .pipe(rename('LichUI.min.css'))
        .pipe(gulp.dest(CONFIG.path.publishLichUI))
        .pipe(server.stream());
}

// 构建外部依赖.
let watchLib = () => {
    return gulp.src(CONFIG.path.lib)
        .pipe(gulp.dest(CONFIG.path.publishLib))
        .pipe(server.stream());
};


let watchExampleHtml = () => {
    return gulp.src(CONFIG.example.html, { base: CONFIG.example.base })
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(server.stream());
};

let watchExampleLess = () => {
    return gulp.src(CONFIG.example.less, { base: CONFIG.example.base })
        .pipe(less(CONFIG.less))
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(server.stream());
};

let watchExampleJs = () => {
    return gulp.src(CONFIG.example.js, { base: CONFIG.example.base })
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(server.stream());
}

// 构建示例.
let watchExample = gulp.parallel(watchExampleHtml, watchExampleJs, watchExampleLess);


let watch = (done) => {
    gulp.watch(CONFIG.LichUIComponentFiles.script, watchLichUIJs)
        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });;

    gulp.watch(CONFIG.LichUIComponentFiles.style, watchLichUICss)
        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });

    gulp.watch(CONFIG.path.lib, watchLib)
        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });

    gulp.watch(CONFIG.example.files, watchExample)
        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });

    done();
};

exports.server = server;
exports.runLocalServer = runLocalServer;
exports.watch = watch;
