// DOM

const cal_disEl = document.querySelector(".cal_dis");
const Result_disEl = document.querySelector(".Result_dis");
const add_funEl = document.querySelectorAll(".add_fun");
const numEl = document.querySelectorAll(".num");
const operEl = document.querySelectorAll(".oper");
const hisEl = document.querySelector(".his");
const backEl = document.querySelector(".back");
const acEl = document.querySelector(".AllClear");
const negaPosiNumEl = document.querySelector(".nega_posi_num");
const equalEl = document.querySelector(".equal");



// 출력 값 변수

let cal_dis_Num = "";
let Result_dis_Num = "";
let result = null;

// 기호 변수

let lastOper = "";

// . 중복 체크 변수

let haveDot = false;



// function

// 숫자 클릭 시 

numEl.forEach(number => {
  number.addEventListener("click", (e) => {
    // . 중복체크
    if(e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if(e.target.innerText === "." && haveDot) {
      return;
    }
    // 클릭한 숫자 변수에 넣고 변수 값을 출력
    Result_dis_Num += e.target.innerText;
    Result_disEl.innerText = Result_dis_Num
  })
})

// 기호 클릭 시

operEl.forEach(oper => {
  oper.addEventListener("click", (e) => {
    // 기호 앞에 값이 없을 때는 계산 불가
    if(!Result_dis_Num) {
      return;
    }

    // 기호 다음 두번째 숫자 값은 .을 다시 사용 가능하게 만듬
    haveDot = false;
    // 클릭한 기호를 변수에 할당
    const operSymbol = e.target.innerText;

    // 첫번째 값과 두번째 값 그리고 기호가 모두 있을 경우
    if(Result_dis_Num && cal_dis_Num && lastOper) {
      // 계산 함수 실행
      mathOperation();
    }
    // 하나라도 없을 경우 입력 값을 계산식 입력창 변수에 숫자로 변환 후 할당
    else {
      result = parseFloat(Result_dis_Num);
    }

    clearVar(operSymbol);
    lastOper = operSymbol;
  })
})


// 첫번째 입력 숫자와 기호를 합쳐 출력하는 함수

function clearVar(symbol = "") {
  cal_dis_Num += `${Result_dis_Num} ${symbol}`;
  cal_disEl.innerText = cal_dis_Num;
  Result_disEl.innerText = "";
  Result_dis_Num = "";
}


// 계산 함수

function mathOperation() {
  if(lastOper === "/") {
    result = parseFloat(result) / parseFloat(Result_dis_Num);
  }
  else if(lastOper === "*") {
    result = parseFloat(result) * parseFloat(Result_dis_Num);
  }
  else if(lastOper === "+") {
    result = parseFloat(result) + parseFloat(Result_dis_Num);
  }
  else if(lastOper === "-") {
    result = parseFloat(result) - parseFloat(Result_dis_Num);
  }
  else if(lastOper === "%") {
    result = parseFloat(result) % parseFloat(Result_dis_Num);
  }
}


// equalEl 클릭 시

equalEl.addEventListener("click", (e) => {
  // 계산 할 첫, 두번째 값이 없을 경우 아무동작 x
  if(!Result_dis_Num || !cal_dis_Num) {
    return;
  }
  // 둘 다 값이 있을 경우
  haveDot = false;
  mathOperation();
  clearVar();
  Result_disEl.innerText = result;
  Result_dis_Num = result;
  cal_dis_Num = "";
})


// allclear(C) 클릭시

acEl.addEventListener("click", (e) => {
  //모든 값 초기화
  Result_disEl.innerText = "0";
  cal_disEl.innerText = "0";
  Result_dis_Num = "";
  cal_dis_Num = "";
  haveDot = false;
})


// window keydown 

window.addEventListener("keydown", (e) => {
  // 누른 키의 값과 클릭 값 연결
  if(
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    clickButtonEl(e.key);
  }
  else if(
    e.key === "." ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "%" ||
    e.key === "(" 
  ) {
    clickOperation(e.key)
  }
  else if(e.key === "h") {
    clickhis();
  } 
  else if(e.key === "z") {
    clickback();
  } 
  else if(e.key === ",") {
    clickAC();
  } 
  else if(e.key === ",") {
    clickNegaPosi();
  } 
  else if(e.key === "Enter" || e.key === "=") {
    ClickEqual();
  }
});


// 숫자 클릭

function clickButtonEl(key) {
  numEl.forEach(button => {
    if(button.innerText === key) {
      button.click();
    }
  })
}


// 기호 클릭

function clickOperation(key) {
  operEl.forEach(button => {
    if(button.innerText === key) {
      button.click();
    }
  })
};

function ClickEqual() {
  equalEl.click();
}

function clickNegaPosi() {
  negaPosiNumEl.click();
}

function clickAC() {
  acEl.click();
}

function clickhis() {
  hisEl.click();
}

function clickback() {
  backEl.click();
}