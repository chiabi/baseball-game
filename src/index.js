class BaseballGameLogic {
  // 왜 인지 모르겠지만 parcel이 클래스 필드 오류라고 인식함 일단 생성자로 처리함
  // 15퍼즐에서는 잘만 되더니...빌드에서 문제가 생기나...
  constructor() {
    this.randomStrike = [];
  }
  init() {
    this.getRandomArray();
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
    // 볼
    let includeItems = 0;
    //  스트라이크
    let equalItems = 0;
    for(let i = 0; i < 3; i++) {
      if(parseInt(arr[i]) === randomStrike[i]) {
        equalItems++;
      } else if (randomStrike.includes(parseInt(arr[i]))) {
        includeItems++;
      }
    }
    return equalItems === 0 && includeItems === 0 ? null : {equal: equalItmes, include: includeItems}; 
  }
}
const game = new BaseballGameLogic();
game.init();

const pitchDigitsArray = [null, null, null];
const pitch = document.querySelector('.pitch');
const pitchDigits = pitch.querySelectorAll('.pitch-input__digit');
const pitchMessage = pitch.querySelector('.pitch-message');
const buttonPitch = pitch.querySelector('.pitch-input__btn-pitch');
const buttonRestart = pitch.querySelector('.pitch-input__btn-restart');

// console.log(pitch, pitchDigits);
// 숫자인지 확인하기 위해
const reg = new RegExp(/[1-9]/);

// 첫 인풋에 포커스를 넣어준다.
pitchDigits[0].focus();
pitchDigits.forEach((item, index, arr) => {
  item.addEventListener('keyup', e => {
    // 입력은 한 글자만 받고 숫자만 입력받는다.
    const inputValue = item.value;
    if (inputValue != null && pitchDigitsArray.includes(inputValue)) {
      pitchMessage.textContent = `중복되는 값입니다.`;
    } else if (inputValue != null && (reg.test(inputValue) && inputValue.length === 1)) {
      pitchDigitsArray[index] = inputValue; 
      item.nextElementSibling.focus();
      pitchMessage.textContent = '';
      console.log(item.value);
    } else if (inputValue) {
      pitchMessage.textContent = `유효한 값이 아닙니다.`;
    } else {
      pitchMessage.textContent = '';
    }
    console.log(pitchDigitsArray, inputValue,  pitchDigitsArray.includes(inputValue))
    // 다음 입력으로 포커스 맞추기
  });
});

// pitch 버튼이 눌리면, pitchDigitsArray 값이 유효한 지 확인, 
// 유효하지 않으면 동작하지 않음
// pitchDigitsArray의 배열을 체크해서 생성된 난수 배열과 맞는지 확인
// pitchDigitsArray 배열의 값을 초기화(null로)
buttonPitch.addEventListener('click', e => {

});