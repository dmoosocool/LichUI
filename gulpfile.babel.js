import gulp from 'gulp';
import { runLocalServer, watch } from './tasks/dev';
import { buildLichUIJs, buildLichUICss, buildLib, buildExample } from './tasks/build';

let build = gulp.parallel(buildLichUIJs, buildLichUICss, buildLib, buildExample);

gulp.task('default', gulp.series(build, runLocalServer, watch));