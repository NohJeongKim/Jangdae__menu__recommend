main = document.querySelector("#main");
qna = document.querySelector("#qna");
btn = document.querySelector("#btn");

function start() {
  // console.log("hi!");
  main.style.display = "none";
  qna.style.display = "block";
}

btn.addEventListener("click", start);
