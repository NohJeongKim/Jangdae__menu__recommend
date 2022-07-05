const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");
const countOfData = qnaList.length;
const select = [];

function calResult() {}

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
}

function addAnswer(answerText, qIdx, idx) {
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
