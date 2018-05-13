class BaseballGameLogic {
  randomStrike = [];
  // a = 1;
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

const game = new BaseballGameLogic();
game.init();
console.log(game.randomStrike);

const pitchDigitsArray = [null, null, null];
const pitch = document.querySelector('.pitch');
const pitchDigits = pitch.querySelectorAll('.pitch-input__digit');
const pitchMessage = pitch.querySelector('.pitch-message');
const buttonPitch = pitch.querySelector('.pitch-input__btn-pitch');
const buttonRestart = pitch.querySelector('.pitch-input__btn-restart');
const gameResultList = document.querySelector('.game-result__list');

// console.log(pitch, pitchDigits);
// 숫자인지 확인하기 위해
const reg = new RegExp(/[1-9]/);

// 첫 인풋에 포커스를 넣어준다.
pitchDigits[0].focus();
pitchDigits.forEach((item, index, arr) => {
  item.addEventListener('keyup', e => {
    // 입력은 한 글자만 받고 숫자만 입력받는다.
    const inputValue = item.value;
    if (inputValue != null && pitchDigitsArray.indexOf(inputValue) !== -1 && pitchDigitsArray.indexOf(inputValue) !== index) {
      pitchMessage.textContent = `중복되는 값입니다.`;
    } else if (inputValue != null && (reg.test(inputValue) && inputValue.length === 1)) {
      pitchDigitsArray[index] = inputValue; 
      item.nextElementSibling.focus();
      pitchMessage.textContent = '';
      // console.log(item.value);
    } else if (inputValue) {
      pitchMessage.textContent = `유효한 값이 아닙니다.`;
    } else {
      pitchMessage.textContent = '';
    }
    // console.log(pitchDigitsArray, inputValue,  pitchDigitsArray.includes(inputValue))
    // 다음 입력으로 포커스 맞추기
  });
});

// pitch 버튼이 눌리면, pitchDigitsArray 값이 유효한 지 확인, 
// 유효하지 않으면 동작하지 않음
// pitchDigitsArray의 배열을 체크해서 생성된 난수 배열과 맞는지 확인
// pitchDigitsArray 배열의 값을 초기화(null로)
buttonPitch.addEventListener('click', e => {
  // console.log(pitchDigitsArray);
  if(pitchDigitsArray.some(item => null || !reg.test(item))) {
    return false;
  }
  gameResultList.appendChild(render(pitchDigitsArray));
  // 초기화
  for (let i = 0; i < 3; i++) {
    pitchDigitsArray[i] = null;
    pitchDigits[i].value = null;
    console.log('boo');
  }
  pitchDigits[0].focus();
  // console.log(pitchDigitsArray);
});

function render(arr) {
  const {strike, ball} = game.checkArray(arr);
  const item = document.createElement('li');
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('span');
    el.classList.add('digit');
    el.textContent = arr[i];
    item.appendChild(el);
  }
  const txtEl = document.createElement('div');
  txtEl.classList.add('txt');
  txtEl.innerHTML = strike === 0 && ball === 0 ? `<em>OUT</em>` : `<em>${strike}</em> Strike <em>${ball}</em> Ball`;
  item.appendChild(txtEl);
  return item;
}