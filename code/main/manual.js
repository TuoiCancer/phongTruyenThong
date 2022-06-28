function animateManualMode() {
  animateLoop = requestAnimationFrame(animateManualMode);

  if (!isSubScene) {
    keyboardMoving(mainCamera, collidableObjects);
    moveCamera(mainCamera, function () {});
    mainRenderer.render(mainScene, mainCamera);
  } else {
    controls.update();
    subRenderer.render(subScene, subCamera);
  }
  stats.update();
}

//event
function addManualEvent() {
  //main scene
  //desktop
  mainContainer.addEventListener("mousedown", mainSceneMouseDown, false);
  mainContainer.addEventListener("mousemove", mainSceneMouseMove, false);
  mainContainer.addEventListener("mouseup", mainSceneMouseUp, false);
  mainContainer.addEventListener("mouseout", mainSceneMouseOut, false);
  mainContainer.addEventListener("keydown", mainSceneKeyDown, false);
  mainContainer.addEventListener("keyup", mainSceneKeyUp, false);
  //mobile
  mainContainer.addEventListener("touchstart", mainSceneMouseDown, false);
  mainContainer.addEventListener("touchmove", mainSceneTouchMove, false);
  mainContainer.addEventListener("touchend", mainSceneMouseUp, false);

  //sub scene
  //desktop
  // subContainer.addEventListener("mousedown", subSceneMouseDown, false);
  // subContainer.addEventListener("mousemove", subSceneMouseMove, false);
  // subContainer.addEventListener("mouseup", subSceneMouseUp, false);
  // subContainer.addEventListener("mouseout", subSceneMouseOut, false);
  // subContainer.addEventListener("wheel", subSceneMouseWheel, false);
  // //mobile
  // subContainer.addEventListener("touchstart", subSceneMouseDown, false);
  // subContainer.addEventListener("touchmove", subSceneMouseMove, false);
  // subContainer.addEventListener("touchend", subSceneMouseUp, false);

  // var gestures = new Hammer(subRenderer.domElement);
  // gestures.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  // gestures.get("pinch").set({ enable: true });
  // gestures.on("pinch", zoomSubScene);
}

function removeManualEvent() {
  //main scene
  //desktop
  mainContainer.removeEventListener("mousedown", mainSceneMouseDown, false);
  mainContainer.removeEventListener("mousemove", mainSceneMouseMove, false);
  mainContainer.removeEventListener("mouseup", mainSceneMouseUp, false);
  mainContainer.removeEventListener("mouseout", mainSceneMouseOut, false);
  mainContainer.removeEventListener("keydown", mainSceneKeyDown, false);
  mainContainer.removeEventListener("keyup", mainSceneKeyUp, false);
  //mobile
  mainContainer.removeEventListener("touchstart", mainSceneMouseDown, false);
  mainContainer.removeEventListener("touchmove", mainSceneTouchMove, false);
  mainContainer.removeEventListener("touchend", mainSceneMouseUp, false);

  //sub scene
  //desktop
  // subContainer.removeEventListener("mousedown", subSceneMouseDown, false);
  // subContainer.removeEventListener("mousemove", subSceneMouseMove, false);
  // subContainer.removeEventListener("mouseup", subSceneMouseUp, false);
  // subContainer.removeEventListener("mouseout", subSceneMouseOut, false);
  // subContainer.removeEventListener("wheel", subSceneMouseWheel, false);
  // //mobile
  // subContainer.removeEventListener("touchstart", subSceneMouseDown, false);
  // subContainer.removeEventListener("touchmove", subSceneMouseMove, false);
  // subContainer.removeEventListener("touchend", subSceneMouseUp, false);
}

document.getElementById("main-container").addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    onMouseDown(event.touches[0]);
  },
  { passive: false }
);
// document.getElementById("sub-scene").addEventListener(
//   "touchstart",
//   event => {
//     event.preventDefault();
//     onDocumentMouseDown(event.touches[0]);
//   },
//   { passive: false }
// );
