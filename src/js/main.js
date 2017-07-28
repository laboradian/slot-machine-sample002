/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'
import SpriteLoader from './SpriteLoader';

//import _ from 'lodash'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

// 画像のコピー
require('file-loader?name=../../dist/[name].[ext]!../index.html');
require('file-loader?name=../../dist/img/[name].[ext]!../img/cards-sprite.png');


const cardsSpriteJson = require('./cards-sprite.json');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');



//======================
// アプリケーション
//======================

// 回転する要素数
const NUM = 7;
// 画面に表示する要素数
const SHOW_MAX = 5;
// カード画像IDの配列
const cards = [];

const marginTop = 20;
const marginBottom = 20;
const marginLeft = 50;
const marginRight = 50;
const cardWidth = 180;
const cardHeight = 50;
const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');
const speedRange = document.querySelector('#speedRange');
let spriteLoader;
let canvas, ctx;
// requestAnimationFrame の戻り値
let reqId;
let speed = 10;

window.onload = () => {
  let i;

  btnStop.style.display = 'none';

  canvas = document.querySelector('#screen');
  canvas.width = marginLeft + cardWidth + marginRight;
  canvas.height = marginTop + marginBottom + (cardHeight - 1) * SHOW_MAX + 1;
  ctx = canvas.getContext('2d');

  for (i=0; i<NUM; i++) {
    cards.push(`card${i}`);
  }

  const cardsImage = new Image();

  spriteLoader = new SpriteLoader(cardsImage, ctx, cardsSpriteJson);

  cardsImage.addEventListener('load', (/*e*/) => {

    let i;
    const h = cardHeight - 1; // 枠線の分は重ねる
    for (i=0; i<SHOW_MAX; i++) {
      spriteLoader.drawImage(`card${i}`, marginLeft, marginTop + (h * i));
    }

  });
  cardsImage.src = 'img/cards-sprite.png';

};

//---------------
// スピード調整
//---------------
speedRange.addEventListener('change', (e) => {
  // 1から20になる
  speed = Math.abs(e.currentTarget.value - 20);
});

btnStart.addEventListener('click', () => {
  let i, idx, cnt = 0;
  let idx_1st = 0; // 1st index of cards to show

  const step = () => {

    if (cnt % speed === 0) {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (i=0; i<SHOW_MAX; i++) {
        idx = idx_1st + i;
        if (idx >= cards.length) {
          idx -= cards.length;
        }

        const h = cardHeight - 1; // 枠線の分は重ねる
        spriteLoader.drawImage(`card${idx}`,
          marginLeft,
          marginTop + (h * i)
        );
      }

      // 次回、1つ目として表示する要素のインデックス番号を設定する
      if (idx_1st == (cards.length - 1)) {
        idx_1st = 0;
      } else {
        idx_1st++;
      }
    }

    cnt++;
    reqId = window.requestAnimationFrame(step);
  };

  reqId = window.requestAnimationFrame(step);

  btnStop.style.display = 'inline-block';
  btnStart.style.display = 'none';

});

//---------------
// 回転ストップ
//---------------
btnStop.addEventListener('click', () => {
  window.cancelAnimationFrame(reqId);
  btnStop.style.display = 'none';
  btnStart.style.display = 'inline-block';
});

