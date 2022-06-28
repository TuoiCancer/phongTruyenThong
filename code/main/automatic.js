function animateAutoMode() {
  animateLoop = requestAnimationFrame(animateAutoMode);

  moveCamera(mainCamera, onMoveFinish);
  autoRotate(group);

  if (isSubScene) {
    subRenderer.render(subScene, subCamera);
  } else {
    mainRenderer.render(mainScene, mainCamera);
  }
  stats.update();
}

function addAutoEvent() {
  //document.getElementById("myvideo").addEventListener("ended", onVideoEnd, false);
  //document.getElementById("sound").addEventListener("ended", onAudioEnd), false;
}

function removeAutoEvent() {
  //document.getElementById("myvideo").removeEventListener("ended", onVideoEnd, false);
  //document.getElementById("sound").removeEventListener("ended", onAudioEnd), false;
}