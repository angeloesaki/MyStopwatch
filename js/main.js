"use strict";

{
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  //startボタンを押した時の時刻であるstartTimeを引けばstartTImeからの経過ミリ秒がわかる＝カウントアップストップウォッチになる
  //padStart()は文字列に対してしじゃ使えない
  //String()は引数を文字列に変換する
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, "0"); //２桁で表示、その桁に満たなかったら文字列の前を0で埋めてね。
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    timer.textContent = `${m}:${s}.${ms}`;

    //0.001秒後にcountUp関数を呼び出す
    //setTimeoutの返り値をtimeoutIdに代入
    //timeoutIdはclearTimeout用のId
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.add("inactive");
  }

  function setButtonStateRunning() {
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.add("inactive");
  }

  function setButtonStateStopped() {
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.remove("inactive");
  }

  //タイマーの初期状態
  setButtonStateInitial();

  //カウントアップ機能
  start.addEventListener("click", () => {
    if (start.classList.contains("inactive") === true) {
      return;
    }
    //タイマーが動いてる時の状態
    setButtonStateRunning();

    //現在時刻を取得
    startTime = Date.now();
    countUp();
  });

  //時間を止める機能
  stop.addEventListener("click", () => {
    if (stop.classList.contains("inactive") === true) {
      return;
    }

    //タイマーをストップした時の状態
    setButtonStateStopped();

    //0.001秒事にcountUp()を呼び出しているsetTimeout()を止めればいい
    //そのためにはclearTimeout()の引数にsetTimeout()のIdを渡す
    //IdとはSetTimeout()の返り値を代入した変数のこと
    clearTimeout(timeoutId);

    // elapsedTimeを保持しつつ次のelapsedTimeを足していく
    elapsedTime += Date.now() - startTime;
  });

  //時間をリセットする機能
  reset.addEventListener("click", () => {
    if (reset.classList.contains("inactive") === true) {
      return;
    }

    //タイマーを初期状態に戻した状態
    setButtonStateInitial();

    timer.textContent = "00:00.000";
    //elapsedtimeもリセットする
    elapsedTime = 0;
  });
}
