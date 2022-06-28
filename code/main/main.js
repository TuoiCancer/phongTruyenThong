//THREE.Cache.enabled = true;
var animateLoop;
var mainScene, subScene, mainRenderer, subRenderer, mainCamera, subCamera;
var stats, controls;
var mainContainer = document.getElementById("main-container");
var subContainer = document.getElementById("sub-scene");
var loadingManager = new THREE.LoadingManager();
var moveObjects = [];
var collidableObjects = [];

//--
//movement keycode

var group;
//window variables
var isSubScene = false;
var mousedown = false,
  mousemove = false;
var mouseDownSub = false;

//automatic
var current = Infinity;
var isOnclick = false;
//

init();

loadingManager.onLoad = function () {
  document.getElementById("btn-start").style.display = "block";
  document.getElementById("pleasewaitcontainer").style.display = "none";
  console.log("Loading success!");
  animateManualMode();
};

// loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
//   var progress = itemsLoaded / itemsTotal * 100;

//   console.log(progress.toFixed(2));
// };

loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

function init() {
  initBasic();
  initAllItems();
  addManualEvent();
  addBtnEvent();

  //stats
  stats = new Stats();
  mainContainer.appendChild(stats.dom);
  //
  group = new THREE.Object3D();
  //
  controls = new THREE.OrbitControls(subCamera, subRenderer.domElement);
}

function initBasic() {
  //main scene, camera, renderer
  mainScene = new THREE.Scene();
  mainCamera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  mainCamera.target = new THREE.Vector3(0, 0, 0);
  mainCamera.position.z = 5;
  mainCamera.lookAt(0, 0, 10);

  var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent);

  if (ios) {
    if (!standalone && safari) {
      //browser
      mainRenderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
      });
    } else if (standalone && !safari) {
      //standalone
      mainRenderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
      });
    } else if (!standalone && !safari) {
      //uiwebview
      mainRenderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
      });
    }
  } else {
    //not iOS
    mainRenderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
  }
  mainRenderer.outputEncoding = THREE.sRGBEncoding;
  mainRenderer.setPixelRatio(window.devicePixelRatio);
  mainRenderer.setSize(window.innerWidth, window.innerHeight);
  mainRenderer.shadowMap.enabled = true;
  mainContainer.appendChild(mainRenderer.domElement);

  //sub scene, camera, renderer
  subScene = new THREE.Scene();

  subCamera = new THREE.PerspectiveCamera(
    55,
    ((window.innerWidth * 0.8) / window.innerHeight) * 0.95,
    0.1,
    10000
  );

  subRenderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
  });
  subRenderer.outputEncoding = THREE.sRGBEncoding;
  subRenderer.setPixelRatio(window.devicePixelRatio);
  subRenderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.95);
  subRenderer.shadowMap.enabled = true;
  subContainer.appendChild(subRenderer.domElement);
}

function addBtnEvent() {
  //desktop
  document
    .getElementById("btn-start")
    .addEventListener("click", startBtn, false);
  document
    .getElementById("btn-setting")
    .addEventListener("click", openSetting, false);
  document
    .getElementById("btn-fullscreen")
    .addEventListener("click", openFullscreen, false);
  document
    .getElementById("btn-closedscreen")
    .addEventListener("click", closeFullscreen, false);
  document
    .getElementById("btn-intruction")
    .addEventListener("click", openInstruction, false);
  document
    .getElementById("btn-resetposition")
    .addEventListener("click", resetPosition, false);
  document
    .getElementById("btn-auto")
    .addEventListener("click", switchAutomaticMode, false);
  document
    .getElementById("btn-manual")
    .addEventListener("click", switchManualMode, false);
  document.getElementById("btn-next").addEventListener("click", nextBtn, false);
  document.getElementById("btn-back").addEventListener("click", prevBtn, false);
  document
    .getElementById("btn-close")
    .addEventListener("click", closeBtn, false);
}
