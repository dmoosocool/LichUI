import path from 'path';
import lessAutoPrefix from 'less-plugin-autoprefix';
import lessPluginFunction from 'less-plugin-functions';

const autoprefix = new lessAutoPrefix({ browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31"] });
const functionSupport = new lessPluginFunction();
const lessOptions = {
    plugins: [autoprefix, functionSupport]
};

const PROJ_PATH = process.cwd();
const DEVELOPER_PATH = path.join(PROJ_PATH, 'src');
const PUBLISH_PATH = path.join(PROJ_PATH, 'dist');

exports.CONFIG = {
    // 编译less配置.
    less: lessOptions,

    // 浏览器同步的配置.
    browserSync: {
        server: {
            baseDir: PUBLISH_PATH,
            directory: true,
            index: "index.html",
        },
        port: 12345,
        cors: true,
        open: true,
    },

    // LichUI所包含的js.
    LichUIComponentFiles: {
        script: [
            './src/core/Utils.js',
            './src/components/**/*.js'
        ],

        style: [
            './src/core/**/*.less',
            './src/components/**/*.less'
        ]
    },

    // 示例
    example: {
        files: './example/**/*',
        base: './example',
        less: './example/**/*.less',
        js: './example/**/*.js',
        html: './example/**/*.html'
    },

    // 路径.
    path: {
        // 项目目录
        proj: PROJ_PATH,

        // 开发目录
        dev: DEVELOPER_PATH,

        // 输出目录
        publish: PUBLISH_PATH,

        // 外部依赖库目录
        lib: './src/lib/**/*',

        // LichUI输出目录
        publishLichUI: path.join(PUBLISH_PATH, 'lib/Lich'),

        // 外部依赖库输出目录
        publishLib: path.join(PUBLISH_PATH, 'lib')
    }
};