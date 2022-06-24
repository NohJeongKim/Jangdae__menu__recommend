const quest = document.getElementById("qnaB");
const answer = document.getElementById("answerB");
const result = document.getElementById("result");
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");
let idx = 0;

function question() {
  quest.innerText = qnaList[0].q;
  ans1.innerText = qnaList[0].a[0].answer;
  ans2.innerText = qnaList[0].a[1].answer;
  ans3.innerText = qnaList[0].a[2].answer;
}

question();

function nextStep() {
  idx += 1; // qnaList의 인덱스 0~9까지 의미한다.
  // console.log(idx);

  if (idx === 10) {
    quest.style.display = "none";
    answer.style.display = "none";
    result.style.display = "block";
  } else {
    quest.innerText = qnaList[idx].q;
    ans1.innerText = qnaList[idx].a[0].answer;
    ans2.innerText = qnaList[idx].a[1].answer;
    ans3.innerText = qnaList[idx].a[2].answer;
  }
}

ans1.addEventListener("click", nextStep);
ans2.addEventListener("click", nextStep);
ans3.addEventListener("click", nextStep);
