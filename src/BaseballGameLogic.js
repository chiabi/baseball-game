export default class BaseballGameLogic {
  randomStrike = [];

  // 초기화
  init() {
    this.randomStrike = this.getRandomArray();
  }

  // 3개의 겹치지 않는 랜덤 수를 담은 배열을 반환한다.
  getRandomArray() {
    const randoms = [null, null, null];
    for (let i = 0; i < 3; ) {
      const random = Math.ceil(Math.random() * 9);
      if (!randoms.includes(random)) {
        randoms[i] = random;
        i++;
      } 
    }
    return randoms;
  }

  // 배열을 받아 구해놓은 랜덤 수랑 자리가 얼마나 일치하는 지 객체를 반환하는 함수 
  // 일치하는 수가 없으면 null을 반환
  checkArray(arr) {
    const result = {
      strike: 0,
      ball: 0
    }
    for(let i = 0; i < 3; i++) {
      if(parseInt(arr[i]) === this.randomStrike[i]) {
        result.strike++;
      } else if (this.randomStrike.includes(parseInt(arr[i]))) {
        result.ball++;
      }
    }
    console.log(result);
    return result; 
  }
}