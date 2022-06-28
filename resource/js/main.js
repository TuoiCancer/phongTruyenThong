var mainContainer = document.getElementById("main-container");
var subContainer = document.getElementById("sub-container");
var stats, controls, animateLoop;
var isSubScene = false;
var mousedown = false,
  mousemove = false;
var mouseDownSub = false;
var collidableObjects = [];

//debugger
const gui = new dat.GUI();

//canvas
var canvas = document.querySelector("canvas.webgl");

//sub canvas
var subCanvas = document.querySelector("canvas.descriptionScene");

//Scence
const scene = new THREE.Scene();

//sub scene
const subScene = new THREE.Scene();

//light
// var light1 = new THREE.PointLight(0xffffff, 10, 100);
// light1.position.set(50, 50, 50);
// scene.add(light1);
var light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xb2b2b2, 1);
scene.add(ambientLight);

//for subscene
var lightSub = new THREE.AmbientLight(0xffffff, 1);
lightSub.position.set(0, 10, 0);
subScene.add(lightSub);

var lightSub = new THREE.DirectionalLight(0xffffff, 1);
lightSub.position.set(0, 10, -20);
subScene.add(lightSub);

var lightSub = new THREE.DirectionalLight(0xffffff, 1);
lightSub.position.set(0, 2, 20);
subScene.add(lightSub);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const mainCamera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
mainCamera.target = new THREE.Vector3(0, 0, 0);
mainCamera.position.set(9, 127.32, -200);
mainCamera.rotation.set(0.052, 21.97, 0);

// mainCamera.rotation.y = Math.PI / 3;
scene.add(mainCamera);

//gui with camera position
// const cameraGui = gui.addFolder("camera");
// cameraGui.add(camera.position, "x").min(-200).max(200).step(0.01);
// cameraGui.add(camera.position, "y").min(-200).max(200).step(0.01);
// cameraGui.add(camera.position, "z").min(-200).max(200).step(0.01);

//sub camera
const subCamera = new THREE.PerspectiveCamera(
  55,
  ((window.innerWidth * 0.8) / window.innerHeight) * 0.95,
  0.1,
  10000
);

subScene.add(subCamera);

/**
 * Renderer
 */
const mainRenderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
mainRenderer.setSize(sizes.width, sizes.height);
mainRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
mainRenderer.outputEncoding = THREE.sRGBEncoding;
// renderer.shadowMap.enabled = true;
//mainContainer.appendChild(renderer.domElement);

const subRenderer = new THREE.WebGLRenderer({
  subCanvas: subCanvas,
  alpha: true,
});
subRenderer.outputEncoding = THREE.sRGBEncoding;
subRenderer.setPixelRatio(window.devicePixelRatio);
subRenderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.95);

//orbit control in subSence
controls = new THREE.OrbitControls(subCamera, subRenderer.domElement);

//load room model
var roomModel = new THREE.GLTFLoader();
roomModel.load("resource/room/room.glb", function (object) {
  console.log(object);
  scene.add(object.scene);
  collidableObjects.push(object.scene);
});
init();
function init() {
  loadAllModel();
  loadPictures();
  loadVideo();
  addManualEvent();
  //removeManualEvent();
}

//game logic
var update = function () {
  animateManualMode();
};

//draw sence;
function animation() {
  requestAnimationFrame(animation);
  update();
}
animation();

function animateManualMode() {
  if (!isSubScene) {
    keyboardMoving(mainCamera, collidableObjects);
    moveCamera(mainCamera, function () {});
    mainRenderer.render(scene, mainCamera);
  } else {
    // controls.update();
    subRenderer.render(subScene, subCamera);
  }
  // stats.update();
}

//event
//resize

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  mainCamera.aspect = sizes.width / sizes.height;
  mainCamera.updateProjectionMatrix();

  // Update renderer
  mainRenderer.setSize(sizes.width, sizes.height);
  mainRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function addManualEvent() {
  canvas = document.querySelector("canvas.webgl");
  //main scene
  //desktop
  canvas.addEventListener("mousedown", mainSceneMouseDown, false);
  canvas.addEventListener("mousemove", mainSceneMouseMove, false);
  canvas.addEventListener("mouseup", mainSceneMouseUp, false);
  canvas.addEventListener("mouseout", mainSceneMouseOut, false);
  window.addEventListener("keydown", mainSceneKeyDown, false);
  window.addEventListener("keyup", mainSceneKeyUp, false);
  //mobile
  canvas.addEventListener("touchstart", mainSceneMouseDown, false);
  canvas.addEventListener("touchmove", mainSceneTouchMove, false);
  canvas.addEventListener("touchend", mainSceneMouseUp, false);

  //sub scene
  //desktop
  subCanvas = document.querySelector("canvas.descriptionScene");

  subCanvas.addEventListener("mousedown", subSceneMouseDown, false);
  subCanvas.addEventListener("mousemove", subSceneMouseMove, false);
  subCanvas.addEventListener("mouseup", subSceneMouseUp, false);
  subCanvas.addEventListener("mouseout", subSceneMouseOut, false);
  subCanvas.addEventListener("wheel", subSceneMouseWheel, false);
  //mobile
  subCanvas.addEventListener("touchstart", subSceneMouseDown, false);
  subCanvas.addEventListener("touchmove", subSceneMouseMove, false);
  subCanvas.addEventListener("touchend", subSceneMouseUp, false);

  // var gestures = new Hammer(subRenderer.domElement);
  // gestures.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  // gestures.get("pinch").set({ enable: true });
  // gestures.on("pinch", zoomSubScene);
}

function removeManualEvent() {
  canvas = document.querySelector("canvas.webgl");
  //main scene
  //desktop
  canvas.removeEventListener("mousedown", mainSceneMouseDown, false);
  canvas.removeEventListener("mousemove", mainSceneMouseMove, false);
  canvas.removeEventListener("mouseup", mainSceneMouseUp, false);
  canvas.removeEventListener("mouseout", mainSceneMouseOut, false);
  canvas.removeEventListener("keydown", mainSceneKeyDown, false);
  canvas.removeEventListener("keyup", mainSceneKeyUp, false);
  //mobile
  canvas.removeEventListener("touchstart", mainSceneMouseDown, false);
  canvas.removeEventListener("touchmove", mainSceneTouchMove, false);
  canvas.removeEventListener("touchend", mainSceneMouseUp, false);

  //sub scene
  //desktop
  subCanvas = document.querySelector("canvas.descriptionScene");

  subCanvas.removeEventListener("mousedown", subSceneMouseDown, false);
  subCanvas.removeEventListener("mousemove", subSceneMouseMove, false);
  subCanvas.removeEventListener("mouseup", subSceneMouseUp, false);
  subCanvas.removeEventListener("mouseout", subSceneMouseOut, false);
  subCanvas.removeEventListener("wheel", subSceneMouseWheel, false);
  //mobile
  subCanvas.removeEventListener("touchstart", subSceneMouseDown, false);
  subCanvas.removeEventListener("touchmove", subSceneMouseMove, false);
  subCanvas.removeEventListener("touchend", subSceneMouseUp, false);
}

document.getElementById("main-container").addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    onMouseDown(event.touches[0]);
  },
  { passive: false }
);

document.getElementById("sub-scene").addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    onDocumentMouseDown(event.touches[0]);
  },
  { passive: false }
);
