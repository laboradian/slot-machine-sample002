/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'
//import SpriteLoader from './SpriteLoader';
import Slot from './Slot';

//import _ from 'lodash'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

// 画像のコピー
require('file-loader?name=../../dist/img/[name].[ext]!../img/sprite.png');


const spriteJson = require('./sprite.json');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');



//======================
// アプリケーション
//======================

(new Slot({
  canvasId: 'screen',
  btnStartId: 'btnStart',
  btnStopId: 'btnStop',
  inputRangeSpeedId: 'inputRangeSpeed',
  spriteJson
})).run();

(new Slot({
  canvasId: 'screen2',
  btnStartId: 'btnStart2',
  btnStopId: 'btnStop2',
  inputRangeSpeedId: 'inputRangeSpeed2',
  spriteJson
})).run();

(new Slot({
  canvasId: 'screen3',
  btnStartId: 'btnStart3',
  btnStopId: 'btnStop3',
  inputRangeSpeedId: 'inputRangeSpeed3',
  spriteJson
})).run();

