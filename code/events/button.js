
//button start
function startBtn() {
  document.getElementById("pleasewait").style.display = "none";
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-screen").style.display = "block";
  document.getElementById("btn-fullscreen").style.display = "block";
  document.getElementById("myModal").style.display = "block";
}

//button instruction
function openInstruction() {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("myModal").focus();
}

//close instruction
function closeInstruction() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("main-container").focus();
}

//close info url
function closeInfoUrl() {
  document.getElementById("info-banner").style.display = "none";
  document.getElementById("main-container").focus();
}

//open info url
function openInfoUrl() {
  document.getElementById("info-banner").style.display = "block";
  document.getElementById("main-container").focus();
}

//button open setting
function openSetting() {
  var btnMain = document.getElementById("btn-screen");
  if (btnMain.style.width != "50px") {
    btnMain.style.width = "50px";
    btnMain.style.overflow = "hidden";
  } else {
    btnMain.style.width = "auto";
    btnMain.style.overflow = "visible";
  }
}

//button full screen
function openFullscreen() {
  var elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }

  document.getElementById("btn-fullscreen").style.display = "none";
  document.getElementById("btn-closedscreen").style.display = "block";
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  document.getElementById("btn-fullscreen").style.display = "block";
  document.getElementById("btn-closedscreen").style.display = "none";
}

//button reset position
function resetPosition() {
  if (mainCamera.userData.moveCamera.progress === false) {
    mainCamera.position.x = 0;
    mainCamera.position.y = 0;
    mainCamera.position.z = 5;

    mainCamera.target = new THREE.Vector3(0, 0, 0);
    mainCamera.lookAt(0, 0, 10);
  }
};

//button switch mode
function switchAutomaticMode() {

  if (mainCamera.userData.moveCamera.progress === false) {
    current = Infinity;

    document.getElementById("btn-manual").style.display = "block";
    document.getElementById("btn-auto").style.display = "none";
    document.getElementById("btn-next").style.display = "block";
    document.getElementById("btn-back").style.display = "block";
    hideAll();

    mainCamera.position.x = 0;
    mainCamera.position.y = 0;
    mainCamera.position.z = -25;
    mainCamera.target = new THREE.Vector3(0, 0, 0);
    mainCamera.lookAt(0, 0, 0);

    removeManualEvent();
    cancelAnimationFrame(animateLoop);
    addAutoEvent();
    animateAutoMode();
  }

}

function switchManualMode() {

  if (mainCamera.userData.moveCamera.progress === false) {

    document.getElementById("btn-manual").style.display = "none";
    document.getElementById("btn-auto").style.display = "block";
    document.getElementById("btn-next").style.display = "none";
    document.getElementById("btn-back").style.display = "none";
    hideAll();

    mainCamera.position.x = 0;
    mainCamera.position.y = 0;
    mainCamera.position.z = -25;
    mainCamera.target = new THREE.Vector3(0, 0, 0);
    mainCamera.lookAt(0, 0, 0);

    removeAutoEvent();
    cancelAnimationFrame(animateLoop);
    addManualEvent();
    animateManualMode();
  }

}

//btn next back
function nextBtn() {
  if (mainCamera.userData.moveCamera.progress === false) {

    if (current == Infinity) {
      current = 0;
    } else {
      current++;
      if (current == moveObjects.length) {
        current = 0;
      }
    }

    moveTo(current);
  }

}

function prevBtn() {

  if (mainCamera.userData.moveCamera.progress === false) {

    if (current == Infinity) {
      current = moveObjects.length - 1;
    } else {
      current--;
      if (current < 0) {
        current = moveObjects.length - 1;
      }
    }
    moveTo(current);

  }
}

//close btn
function closeBtn() {
  hideAll();
}