const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const introStartBtn = $(".intro__startBtn");
const introSection = $(".intro");
const closeBtn = $(".close-btn");
const myModal = $(".myModal");
const myModalLayer = $(".myModal__layer");
const myModalWrap = $(".myModal__wrap");
const closeVideo = $(".closeBtn-video");
introStartBtn.onclick = (e) => {
  introSection.classList.add("hidden");
  myModalWrap.classList.add("active");
};
console.log({ myModalLayer });
closeBtn.onclick = (e) => {
  myModal.classList.add("hidden");
};

myModalLayer.onclick = (e) => {
  myModal.classList.add("hidden");
};

closeVideo.onclick = () => {
  $(".sub-container").style.display = "none";
  document.getElementById("myvideo").src = "";

  window.isSubScene = false;
};
