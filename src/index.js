// 유효한 난수(1 - 9)
// 일치하지 않는 유효한 난수 3개의 배열을 구한다.

// 테스트용
// let i = 100;
// while (i--) {
//   console.log(getRandomArray());
// }
// const a = new Date;
// const b = new Date;
// console.log(Math.abs(a.getMilliseconds() - b.getMilliseconds()));

// 난수 배열 첫번째 방법: do whil, randoms.length
function getRandomArray() {
  const randoms = [];
  do {
    const random = Math.ceil(Math.random() * 9);
    if (!randoms.includes(random)) randoms.push(random);
  } while(randoms.length < 3);
  return randoms;
}


// 난수 배열 두번째 방법: for문
function getRandomArray() {
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

// 별로 성능 차이 안나는 듯
const randomStrike = getRandomArray();

// 배열을 받아 구해놓은 랜덤 수랑 자리가 얼마나 일치하는 지 문자열로 반환하는 함수
function checkArray(arr) {
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
  return equalItems === 0 && includeItems === 0 ? `OUT` : `${equalItems} 스트라이크 : ${includeItems} 볼`; 
}

const pitchDigitsArray = [null, null, null];

const pitch = document.querySelector('.pitch');
const pitchDigits = pitch.querySelectorAll('.pitch-input__digit');
const pitchMessage = pitch.querySelector('.pitch-input__message');
console.log(pitch, pitchDigits);
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