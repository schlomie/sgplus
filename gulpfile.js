const util = require('util');
const fs = require('fs');
const crypto = require('crypto');
const exec = require('child_process').exec;
const gulp = require('gulp');
const clean = require('gulp-clean');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const pump = require('pump');

const package = require('./package.json');
const version = package.version;
const buildNumber = process.env.BUILD_NUMBER || 0;
const packageNumber = util.format('%s-%s', version, buildNumber);

const srcDir = 'src';
const distDir = 'dist';
const outDir = util.format('%s/%s', distDir, package.name);
const tarball = util.format('%s_%s.tar', package.name, packageNumber);

const packageDir = 'package';
const archPackageDir = packageDir + '/arch';


gulp.task('clean', callback => {
    pump([
        gulp.src([distDir], {read:false}),
        clean()
    ], callback);
});


gulp.task('build', ['clean'], callback => {
    pump([
        gulp.src([srcDir + '/**/*js']),
        gulp.dest(outDir)
    ], callback);
});

gulp.task('prepare-tar', ['build'], callback => {
    pump([
        gulp.src([
            'package.json',
            'package-lock.json'
        ]),
        gulp.dest(outDir)
    ], callback);
});

gulp.task('tar', ['prepare-tar'], callback => {
    pump([
        gulp.src(distDir + '/**/*'),
        tar(tarball),
        gzip(),
        gulp.dest(distDir)
    ], callback);
});

gulp.task('clean.arch.package', callback => {
    pump([
        gulp.src([
            archPackageDir + '/*gz',
            archPackageDir + '/*xz',
            archPackageDir + '/PKGBUILD',
            archPackageDir + '/pkg',
            archPackageDir + '/src'
        ], {read:false}),
        clean()
    ], callback);
});

gulp.task('prepare.arch.package', ['clean.arch.package', 'tar'], callback => {
    pump([
        gulp.src(distDir + '/' + tarball + '.gz'),
        gulp.dest(archPackageDir)
    ], callback);
});

gulp.task('arch.package', ['prepare.arch.package'], callback => {
    try {

        const hasher = crypto.createHash('sha1');
        const file = fs.readFileSync(util.format('%s/%s.gz', distDir, tarball));
        const PKGBUILD_TEMPLATE = fs.readFileSync(archPackageDir + '/PKGBUILD.template', 'UTF-8');

        hasher.update(file);
        const hash = hasher.digest('hex');

        const PKGBUILD = PKGBUILD_TEMPLATE
            .replace(/{{version}}/g, version)
            .replace(/{{build-number}}/g, buildNumber)
            .replace(/{{hash}}/g, hash);

        fs.writeFileSync(archPackageDir + '/PKGBUILD', PKGBUILD);

        process.chdir(archPackageDir);

        exec('makepkg -f', callback);

    } catch (err) {
        callback(err);
    }
});



gulp.task('default', ['build'], () => {
    console.log('Built %s-%d', version, buildNumber);
});

gulp.task('clean.all', ['clean', 'clean.arch.package']);
