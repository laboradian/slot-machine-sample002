import SpriteLoader from './SpriteLoader';

class Slot {
  /**
   * @param {string} options.canvasId
   * @param {string} options.btnStartId
   * @param {string} options.btnStopId
   * @param {string} options.inputRangeSpeedId
   * @param {object} options.spriteJson
   */
  constructor(options) {
    this.canvas = document.querySelector(`#${options.canvasId}`);
    this.btnStart = document.querySelector(`#${options.btnStartId}`);
    this.btnStop = document.querySelector(`#${options.btnStopId}`);
    this.inputRangeSpeed = document.querySelector(`#${options.inputRangeSpeedId}`);
    this.spriteJson = options.spriteJson;

    // 回転する要素数
    this.NUM = 7;
    // 画面に表示する要素数
    this.SHOW_MAX = 5;

    this.MARGIN_TOP = 20;
    this.MARGIN_BOTTOM = 20;
    this.MARGIN_LEFT = 50;
    this.MARGIN_RIGHT = 50;
    this.CARD_WIDTH = 180;
    this.CARD_HEIGHT = 50;

    // カード画像IDの配列
    this.cards = [];

    this.spriteLoader;
    this.canvas;
   this.ctx;
    // requestAnimationFrame の戻り値
    this.reqId;
    this.speed = 10;
  }

  run() {

    window.addEventListener('load', () => {
      let i;

      this.btnStop.style.display = 'none';

      this.canvas.width = this.MARGIN_LEFT + this.CARD_WIDTH + this.MARGIN_RIGHT;
      this.canvas.height = this.MARGIN_TOP + this.MARGIN_BOTTOM + (this.CARD_HEIGHT - 1) * this.SHOW_MAX + 1;
      this.ctx = this.canvas.getContext('2d');

      for (i=0; i<this.NUM; i++) {
        this.cards.push(`this.card${i}`);
      }

      const spriteImage = new Image();

      this.spriteLoader = new SpriteLoader(spriteImage, this.ctx, this.spriteJson);

      spriteImage.addEventListener('load', (/*e*/) => {
        let i;

        // カードの描画
        const h = this.CARD_HEIGHT - 1; // 枠線の分は重ねる
        for (i=0; i<this.SHOW_MAX; i++) {
          this.spriteLoader.drawImage(`card${i}`, this.MARGIN_LEFT, this.MARGIN_TOP + (h * i));
        }

        // 矢印の描画
        drawArrows();

      });
      spriteImage.src = 'img/sprite.png';
    });

    const drawArrows = () => {
      this.spriteLoader.drawImage('arrow-left', this.MARGIN_LEFT - 30, this.MARGIN_TOP + (this.CARD_HEIGHT * 2) + 10);
      this.spriteLoader.drawImage('arrow-right', this.MARGIN_LEFT + this.CARD_WIDTH + 10, this.MARGIN_TOP + (this.CARD_HEIGHT * 2) + 10);
    };

    //---------------
    // スピード調整
    //---------------
    this.inputRangeSpeed.addEventListener('change', (e) => {
      // 1から20になる
      this.speed = Math.abs(e.currentTarget.value - 20);
    });

    this.btnStart.addEventListener('click', () => {
      let i, idx, cnt = 0;
      let idx_1st = 0; // 1st index of cards to show

      const step = () => {

        if (cnt % this.speed === 0) {

          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          for (i=0; i<this.SHOW_MAX; i++) {
            idx = idx_1st + i;
            if (idx >= this.cards.length) {
              idx -= this.cards.length;
            }

            const h = this.CARD_HEIGHT - 1; // 枠線の分は重ねる
            this.spriteLoader.drawImage(`card${idx}`,
              this.MARGIN_LEFT,
              this.MARGIN_TOP + (h * i)
            );
          }

          // 次回、1つ目として表示する要素のインデックス番号を設定する
          if (idx_1st == (this.cards.length - 1)) {
            idx_1st = 0;
          } else {
            idx_1st++;
          }

          // 矢印の描画
          drawArrows();
        }

        cnt++;
        this.reqId = window.requestAnimationFrame(step);
      };

      this.reqId = window.requestAnimationFrame(step);

      this.btnStop.style.display = 'inline-block';
      this.btnStart.style.display = 'none';

    });

    //---------------
    // 回転ストップ
    //---------------
    this.btnStop.addEventListener('click', () => {
      window.cancelAnimationFrame(this.reqId);
      this.btnStop.style.display = 'none';
      this.btnStart.style.display = 'inline-block';
    });
  }
}

export default Slot;
