const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");
const countOfData = qnaList.length;
const select = [];

function calResult() {
  const setArray = [
    { name: "비빔냉면", value: 0, key: 0 },
    { name: "회냉면", value: 0, key: 1 },
    { name: "라면", value: 0, key: 2 },
    { name: "홍어무침", value: 0, key: 3 },
    { name: "메밀쫄면", value: 0, key: 4 },
    { name: "제육덮밥", value: 0, key: 5 },
    { name: "물냉면", value: 0, key: 6 },
    { name: "물만두", value: 0, key: 7 },
    { name: "왕만두", value: 0, key: 8 },
    { name: "왕만두튀김", value: 0, key: 9 },
    { name: "메밀온면", value: 0, key: 10 },
    { name: "한우만두국", value: 0, key: 11 },
    { name: "이박사김밥", value: 0, key: 12 },
    { name: "등심돈까스", value: 0, key: 13 },
    { name: "치즈돈까스", value: 0, key: 14 },
    { name: "생선까스", value: 0, key: 15 },
    { name: "메밀콩국수", value: 0, key: 16 },
  ];

  for (let i = 0; i < countOfData; i++) {
    // console.log(i);
    const target = qnaList[i].a[select[i]];
    for (let j = 0; j < target.type.length; j++) {
      for (let k = 0; k < setArray.length; k++) {
        if (target.type[j] === setArray[k].name) {
          setArray[k].value += 1; // 몇 개 나왔는지 개수를 세어주기.
        }
      }
    }
  }

  const resultArray = setArray.sort(function (a, b) {
    // 오름차순 ?? 이해가 안 간다.
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  console.log(resultArray);
  let resultWord = resultArray[0].key;
  return resultWord;
}

function goResult() {
  qna.style.webkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.webkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      result.style.display = "block";
      qna.style.display = "none";
    }, 450);
  }, 450);

  // console.log(select); answer 결과를 잘 가져올 수 있다.
  calResult();
}

function addAnswer(answerText, qIdx, idx) {
  // i을 idx로 받아주기.
  // "answer들이 보이도록 나타내주기."
  const a = document.querySelector("#answerB");
  const answer = document.createElement("button");

  a.appendChild(answer); // 관계 설정해주기.
  answer.classList.add("answerText"); // 클래스 이름 붙여주기.
  answer.innerText = answerText;
  answer.classList.add("fadeIn");

  answer.addEventListener("click", function () {
    const answers = document.querySelectorAll(".answerText");

    // console.log(answers);
    for (let i = 0; i < answers.length; i++) {
      // console.log(i);
      answers[i].disabled = true;
      answers[i].style.webkitAnimation = "fadeOut 0.5s";
      answers[i].style.animation = "fadeOut 0.5s";
    }

    setTimeout(() => {
      select[qIdx] = idx;
      for (let i = 0; i < answers.length; i++) {
        answers[i].style.display = "none";
      }
      goNext(++qIdx);
    }, 450);
    // console.log(idx);
  });
}

function goNext(qIdx) {
  if (qIdx == countOfData) {
    goResult();
    return; // Error q 사라지게 하기 위함이다.
  }
  // "시작하기 버튼을 누르면 뒤로 넘어가기."
  const q = document.querySelector("#qnaB");
  const statusBar = document.querySelector(".statusBar");
  statusBar.style.width = (100 / countOfData) * (qIdx + 1) + "%";
  // console.log(statusBar.style.width);

  if (statusBar.style.width >= 80 + "%") {
    // console.log("hi");
    statusBar.classList.add("toBeRed");
    statusBar.style.backgroundColor = "toBeRed";
    // console.log(statusBar.style.backgroundColor);
  }

  q.innerText = qnaList[qIdx].q;
  for (i in qnaList[qIdx].a) {
    // console.log(qnaList[qIdx].a[i].answer);
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); // 꼭 넘겨주고 이용해야된다.
    // 계속 넘기고 넘겨야 된다.
  }
}

function start() {
  // console.log("hi!");
  /*
  main.style.webkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  qna.style.webkitAnimation = "fadeIn 1s";
  qna.style.animation = "fadeIn 1s";
  main.style.display = "none";
  qna.style.display = "block";
  */
  // 애니메이션이 다 끝난 후에 display를 변경시켜준다.
  main.style.webkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.webkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "block";
      main.style.display = "none";
    }, 450);
  }, 450);
  let qIdx = 0;
  goNext(qIdx);
}

btn.addEventListener("click", start);
