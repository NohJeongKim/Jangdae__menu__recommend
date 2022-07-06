const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");
const countOfData = qnaList.length;
const select = [];

function calResult() {
  const setArray = [
    { id: 0, name: "비빔냉면", count: 0 },
    { id: 1, name: "회냉면", count: 0 },
    { id: 2, name: "라면", count: 0 },
    { id: 3, name: "홍어무침", count: 0 },
    { id: 4, name: "메밀쫄면", count: 0 },
    { id: 5, name: "제육덮밥", count: 0 },
    { id: 6, name: "물냉면", count: 0 },
    { id: 7, name: "물만두", count: 0 },
    { id: 8, name: "왕만두", count: 0 },
    { id: 9, name: "왕만두튀김", count: 0 },
    { id: 10, name: "메밀온면", count: 0 },
    { id: 11, name: "한우만두국", count: 0 },
    { id: 12, name: "등심돈까스", count: 0 },
    { id: 13, name: "치즈돈까스", count: 0 },
    { id: 14, name: "생선까스", count: 0 },
    { id: 15, name: "메밀콩국수", count: 0 },
    { id: 16, name: "이박사김밥", count: 0 },
  ];

  /* 주의해야 되는 부분.... 헷갈리니까 열심히 생각해보기. */

  for (let i = 0; i < countOfData; i++) {
    // i = 0~9
    const target = qnaList[i].a[select[i]];
    // console.log(target); 내가 고른 답들이 모두 나타났다.
    // 무조건 name 1개씩 끌고 들어오기. 그래야 비교가 가능하다. (주의하기.)
    for (let j = 0; j < target.type.length; j++) {
      // j = 0~9
      // target 모두 펼치기.
      for (let k = 0; k < setArray.length; k++) {
        // k = 0~16
        // setArray 모두 펼치기.
        if (target.type[j] === setArray[k].name) {
          setArray[k].count += 1;
        }
      }
    }
  }

  /* 이 부분도 이해가 잘 가지 않는다. */
  /* 단어를 고려해서 count의 수를 세어주고 -> 내림차순을 이용해서 가장 많이 나온 단어의 id를 가져온다. */
  const resultArray = setArray.sort(function (a, b) {
    return b.count - a.count; // 내림차순
  });

  // console.log(resultArray);
  let result = resultArray[0].id;
  // 가장 count 수가 많은 음식의 id를 의미한다.
  // console.log(result);
}

function goResult() {
  qna.style.animation = "fadeOut 1s";
  qna.style.webkitAnimation = "fadeOut 1s";
  setTimeout(() => {
    result.style.animation = "fadeIn 1s";
    result.style.webkitAnimation = "fadeIn 1s";
    setTimeout(() => {
      result.style.display = "block";
      qna.style.display = "none";
    }, 450);
  }, 450);

  // console.log(select); 제대로 담겨있음을 알 수 있다.
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
  });
}

function goNext(qIdx) {
  // "시작하기 버튼을 누르면 뒤로 넘어가기."
  if (qIdx === countOfData) {
    return goResult();
    // goResult();
    // return; // 함수가 더 실행되지 않도록 만들어주는 역활
  }
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

  qIdx += 1;
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
