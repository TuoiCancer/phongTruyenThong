var delta = 0.02;
var moveLeft = false,
  moveRight = false,
  moveForward = false,
  moveBackward = false;

//rotate camera
function startRotateCamera(event, camera) {
  var clientX = event.clientX;
  var clientY = event.clientY;

  if (!camera.userData.rotate) {
    camera.userData.rotate = {
      onMouseDownMouseX: 0,
      onMouseDownMouseY: 0,
      onMouseDownLon: 0,
      onMouseDownLat: 0,
      lat: 0,
      lon: 0,
    };
  }

  var rotateParams = camera.userData.rotate;

  rotateParams.onMouseDownMouseX = clientX;
  rotateParams.onMouseDownMouseY = clientY;
  rotateParams.onMouseDownLon = rotateParams.lon;
  rotateParams.onMouseDownLat = rotateParams.lat;
  //save last cordinator (for mobile)
  camera.userData.lastX = clientX;
  camera.userData.lastY = clientY;
}

function whileRotateCamera(event, camera) {
  // event.preventDefault();
  var clientX = event.clientX;
  var clientY = event.clientY;

  var rotateParams = camera.userData.rotate;
  //caculate lon lat
  rotateParams.lon =
    (rotateParams.onMouseDownMouseX - clientX) * 0.1 +
    rotateParams.onMouseDownLon;
  rotateParams.lat =
    (clientY - rotateParams.onMouseDownMouseY) * 0.1 +
    rotateParams.onMouseDownLat;
  rotateParams.lat = Math.max(-85, Math.min(85, rotateParams.lat));

  //execute rotate
  var phi = THREE.Math.degToRad(90 - rotateParams.lat);
  var theta = THREE.Math.degToRad(90 + rotateParams.lon);
  camera.target.x = 5000 * Math.sin(phi) * Math.cos(theta);
  camera.target.y = 5000 * Math.cos(phi);
  camera.target.z = 5000 * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(camera.target);

  //save last cordinator (for mobile)
  camera.userData.lastX = clientX;
  camera.userData.lastY = clientY;
}

//move camera
//move camera between two point
function moveCamera(camera, onfinish) {
  if (!camera.userData.moveCamera) {
    camera.userData.moveCamera = {
      camPos: new THREE.Vector3(),
      targetPos: new THREE.Vector3(),
      lookAt: false,
      progress: false,
    };
  }

  var moveCamera = camera.userData.moveCamera;

  if (moveCamera.progress === true) {
    if (moveCamera.lookAt === true) {
      mainCamera.lookAt(
        mainCamera.target.x,
        mainCamera.target.y,
        mainCamera.target.z
      );
    }

    moveCamera.camPos.lerp(moveCamera.targetPos, 0.04);
    mainCamera.position.copy(moveCamera.camPos);

    var checkerX1 = parseFloat(mainCamera.position.x).toFixed(0);
    var checkerX2 = parseFloat(moveCamera.targetPos.x).toFixed(0);
    var checkerZ1 = parseFloat(mainCamera.position.z).toFixed(0);
    var checkerZ2 = parseFloat(moveCamera.targetPos.z).toFixed(0);

    if (checkerX1 == "-0") {
      checkerX1 = "0";
    }

    if (checkerX1 == checkerX2 && checkerZ1 == checkerZ2) {
      moveCamera.progress = false;
      moveCamera.lookAt = false;
      onfinish();
    }
  }
}

//keyboard
function keyboardMoving(camera, collidableObjects) {
  var speed = 5;
  if (!camera.userData.keyboardMoving) {
    camera.userData.keyboardMoving = {
      velocity: new THREE.Vector3(),
      direction: new THREE.Vector3(),
    };
  }

  var velocity = camera.userData.keyboardMoving.velocity;
  var direction = camera.userData.keyboardMoving.direction;

  if (moveForward || moveLeft || moveRight || moveBackward) {
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveLeft) - Number(moveRight);
    direction.normalize(); //

    if (detectCollision(camera, collidableObjects) == false) {
      if (moveForward || moveBackward)
        velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

      camera.translateX(velocity.x * delta * speed);
      camera.translateZ(velocity.z * delta * speed);
      camera.position.y = 127.32;
    } else {
      velocity.x = 0;
      velocity.z = 0;
    }
  }
}

//detect wall
function detectCollision(camera, collidableObjects) {
  var rotationMatrix = new THREE.Matrix4();

  var cameraDirection = camera
    .getWorldDirection(new THREE.Vector3(0, 0, 0))
    .clone();

  if (moveForward) {
    var angle =
      Number(moveLeft) * (Math.PI / 4) - (Number(moveRight) * Math.PI) / 4;
    rotationMatrix.makeRotationY(angle);
  } else if (moveBackward && !moveLeft && !moveRight) {
    var angle = Math.PI;
    rotationMatrix.makeRotationY(angle);
  } else if (moveBackward && moveLeft && moveRight) {
    var angle = Math.PI;
    rotationMatrix.makeRotationY(angle);
  } else {
    if (moveBackward) {
      var angle =
        (Number(moveLeft) - Number(moveRight)) * (Math.PI / 2 + Math.PI / 4);
      rotationMatrix.makeRotationY(angle);
    } else {
      var angle =
        (Number(moveLeft) * Math.PI) / 2 +
        (Number(moveRight) * Math.PI * 3) / 2;
      rotationMatrix.makeRotationY(angle);
    }
  }

  if (rotationMatrix !== undefined) {
    cameraDirection.applyMatrix4(rotationMatrix);
  }

  var rayCaster = new THREE.Raycaster(camera.position, cameraDirection);

  if (rayIntersect(rayCaster, 10, collidableObjects)) {
    return true;
  } else {
    return false;
  }
}

//ray intersect
function rayIntersect(ray, distance, collidableObjects) {
  var intersects = ray.intersectObjects(collidableObjects, true);
  for (var i = 0; i < intersects.length; i++) {
    if (intersects[i].distance < distance) {
      return true;
    }
  }
  return false;
}
