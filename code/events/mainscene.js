//mouse down
function mainSceneMouseDown(docEvent) {
  var event = getEvent(docEvent);
  mousedown = true;
  // document.getElementById("object-name").style.display = "none";
  startRotateCamera(event, mainCamera);
}

//mouse move
function mainSceneMouseMove(docEvent) {
  if (mousedown == true) {
    mousemove = true;
    whileRotateCamera(docEvent, mainCamera);
  } else if (!isSubScene) {
    onHover(docEvent, collidableObjects);
  }
}

//touch move
function mainSceneTouchMove(docEvent) {
  if (mousedown == true && !isSubScene) {
    mousemove = true;
    whileRotateCamera(docEvent.touches[0], mainCamera);
    onHover(docEvent.touches[0], collidableObjects);
  }
}

//mouse up
function mainSceneMouseUp(docEvent) {
  var event = getEvent(docEvent);
  if (mousedown == true && mousemove == false) {
    onClick(mainCamera, collidableObjects);
  }

  mousedown = false;
  mousemove = false;
}

//mouse out
function mainSceneMouseOut(docEvent) {
  mousedown = false;
  mousemove = false;
}

//key down
function mainSceneKeyDown(docEvent) {
  switch (docEvent.keyCode) {
    case 27: //escape
      hideAll();
      break;
    case 38: // up
    case 87: // w
      moveForward = true;
      break;
    case 37: // left
    case 65: // a
      moveLeft = true;
      break;
    case 40: // down
    case 83: // s
      moveBackward = true;
      break;
    case 39: // right
    case 68: // d
      moveRight = true;
      break;
  }
}

//key up
function mainSceneKeyUp(docEvent) {
  switch (docEvent.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;
    case 37: // left
    case 65: // a
      moveLeft = false;
      break;
    case 40: // down
    case 83: // s
      moveBackward = false;
      break;
    case 39: // right
    case 68: // d
      moveRight = false;
      break;
  }
}

function onClick(camera, collidableObjects) {
  var moveCamera = camera.userData.moveCamera;
  var intersects = pickObject(
    camera.userData.lastX,
    camera.userData.lastY,
    camera,
    collidableObjects
  );

  if (intersects.length > 0) {
    var selectedObject = intersects[0].object.parent;

    if (intersects[0].object.name == "floor") {
      moveCamera.camPos.x = camera.position.x;
      moveCamera.camPos.y = camera.position.y;
      moveCamera.camPos.z = camera.position.z;

      moveCamera.targetPos.x = intersects[0].point.x;
      moveCamera.targetPos.y = camera.position.y;
      moveCamera.targetPos.z = intersects[0].point.z;

      moveCamera.progress = true;
    } else if (selectedObject.userData.clickActions) {
      window.isSubScene = true;
      var clickActions = selectedObject.userData.clickActions;

      if (
        clickActions.displayModel === true &&
        selectedObject.userData.object
      ) {
        displayModel(selectedObject.userData.object);
      }
      if (clickActions.displayInfo === true && selectedObject.userData.info) {
        displayInfo(selectedObject.userData.info);
      }
      if (clickActions.playAudio === true && selectedObject.userData.audioUrl) {
        playAudio(selectedObject.userData.audioUrl);
      }
      if (
        clickActions.displayPicture === true &&
        selectedObject.userData.picUrl
      ) {
        displayPicture(selectedObject.userData.picUrl);
      }
      if (
        clickActions.displayVideo === true &&
        selectedObject.userData.videoUrl
      ) {
        displayVideo(selectedObject.userData.videoUrl);
      }

      displayCloseBtn();
    }
  }
}

//hover
function onHover(event, collidableObjects) {
  var intersects = pickObject(
    event.clientX,
    event.clientY,
    mainCamera,
    collidableObjects
  );
  //console.log(intersects);
  if (intersects.length > 0) {
    var selectedObject = intersects[0].object.parent;

    if (selectedObject.userData.name) {
      document.getElementById("desc-name").innerHTML =
        selectedObject.userData.name;
      document.getElementById("desc-name").style.display = "block";
    } else {
      document.getElementById("desc-name").style.display = "none";
    }
  }
}

//pick object
function pickObject(clientX, clientY, camera, collidableObjects) {
  var canvasBounds = mainRenderer.domElement.getBoundingClientRect();

  var mouse = new THREE.Vector2();
  mouse.x =
    ((clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) *
      2 -
    1;

  mouse.y =
    -((clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) *
      2 +
    1;

  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(collidableObjects, true);

  return intersects;
}

//get event desktop or mobile
function getEvent(event) {
  if (event.clientX) {
    return event;
  } else {
    return event.touches[0];
  }
}
