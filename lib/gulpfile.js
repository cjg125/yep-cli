'use strict'
const gulp = require('gulp')
const del = require('del')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const uglify = require('gulp-uglify')
const nunjucks = require('gulp-nunjucks')
const data = require('gulp-data')
const cwd = process.cwd()
const { parse } = require('path')

gulp.task('clean', () => {
  return del([cwd + '/build'])
})

gulp.task('html', ['clean'], () =>
  gulp.src(cwd + '/html/*.html')
  .pipe(data((file) => {
    let data = {}
    try {
      let d1 = require(cwd + '/html/data/' + parse(file.path).name + '.js')()
      let d2 = require(cwd + '/html/data/common.js')()
      Object.assign(data, d1, d2)
    } catch (e) {}
    return data
  }))
  .pipe(nunjucks.compile())
  .pipe(gulp.dest(cwd + '/build/'))
)

gulp.task('sass', ['clean'], () => {
  return gulp.src(cwd + '/static/sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(cwd + '/build/css'))
})

gulp.task('img', ['clean'], () => {
  return gulp.src(cwd + '/static/img/**')
    .pipe(gulp.dest(cwd + '/build/img'))
})

gulp.task('js', ['clean'], () => {
  return gulp.src(cwd + '/static/js/index.js')
    .pipe(webpack(require((__dirname + '/webpack.config'))))
    .pipe(uglify())
    .pipe(gulp.dest(cwd + '/build/js'))
})

gulp.task('default', ['html', 'sass', 'img', 'js'])
