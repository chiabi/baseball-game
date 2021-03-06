import BaseballGameLogic from './BaseballGameLogic';

const game = new BaseballGameLogic();
const pitchDigitsArray = [null, null, null];
const pitch = document.querySelector('.pitch');
const pitchDigits = pitch.querySelectorAll('.pitch-input__digit');
const pitchMessage = pitch.querySelector('.pitch-message');
const buttonPitch = pitch.querySelector('.pitch-input__btn-pitch');
const buttonRestart = pitch.querySelector('.pitch-input__btn-restart');
const gameResultList = document.querySelector('.game-result__list');

// 숫자인지 확인하기 위해
const reg = new RegExp(/[1-9]/);

function gameInit() {
  game.init();
  // 랜덤 숫자 확인용
  console.log(...game.randomStrike);
  // 첫 인풋에 포커스를 넣어준다.
  pitchDigits[0].focus();
}

function render(arr) {
  const {strike, ball} = game.checkArray(arr);
  const item = document.createElement('li');

  // 입력 값 HTML 코드 추가
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('span');
    el.classList.add('digit');
    el.textContent = arr[i];
    item.appendChild(el);
  }
  const txtEl = document.createElement('div');
  txtEl.classList.add('txt');

  // 내부 로직에서 구한 값 HTML 코드 추가
  txtEl.innerHTML = strike === 0 && ball === 0 ? `<em>OUT</em>` : `<em>${strike}</em> Strike <em>${ball}</em> Ball`;
  item.appendChild(txtEl);
  return item;
}

function removeValidMessage() {
  pitchMessage.classList.remove('pitch-message--invalid');
  pitchMessage.textContent = '';
}

gameInit();

pitchDigits.forEach((item, index, arr) => {
  item.addEventListener('keyup', e => {
    // 입력은 한 글자만 받고 숫자만 입력받는다.
    const inputValue = item.value;
    if (inputValue != null && pitchDigitsArray.indexOf(inputValue) !== -1 && pitchDigitsArray.indexOf(inputValue) !== index) {
      pitchMessage.classList.add('pitch-message--invalid');
      pitchMessage.textContent = `중복되는 수입니다.`;
    } else if (inputValue != null && (reg.test(inputValue) && inputValue.length === 1)) {
      pitchDigitsArray[index] = inputValue; 
      item.nextElementSibling.focus();
      removeValidMessage();
      // console.log(item.value);
    } else if (inputValue) {
      pitchMessage.classList.add('pitch-message--invalid');
      pitchMessage.textContent = `유효한 수가 아닙니다. 1에서 9사이의 수를 입력해주세요.`;
    } else {
      removeValidMessage();
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
  gameResultList.insertBefore(render(pitchDigitsArray), gameResultList.firstChild);
  // 초기화
  for (let i = 0; i < 3; i++) {
    pitchDigitsArray[i] = null;
    pitchDigits[i].value = null;
    console.log('boo');
  }
  pitchDigits[0].focus();
  // console.log(pitchDigitsArray);
});

buttonRestart.addEventListener('click', e => {
  gameInit();
  // pitchDigits 비워준다. gameResultList도 비워줘야함
  console.log(pitchDigitsArray);
  removeValidMessage();
  pitchDigits.forEach(item => {
    item.value = null;
  });
  gameResultList.textContent = '';
});
