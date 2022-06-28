function startRotateModel(event, group) {

    if (!group.userData.rotate) {
        group.userData.rotate = {
            mouseXOnMouseDown: 0,
            targetRotationX: 0,
            targetRotationOnMouseDownX: 0,
            mouseYOnMouseDown: 0,
            targetRotationY: 0,
            targetRotationOnMouseDownY: 0
        };
    }

    var rotateParams = group.userData.rotate;
    rotateParams.mouseXOnMouseDown = event.clientX - window.innerWidth / 2;
    rotateParams.targetRotationOnMouseDownX = rotateParams.targetRotationX;

    rotateParams.mouseYOnMouseDown = event.clientY - window.innerHeight / 2;
    rotateParams.targetRotationOnMouseDownY = rotateParams.targetRotationY;
}

function whileRotateModel(event, group) {
    var rotateParams = group.userData.rotate;

    var mouseX = event.clientX - window.innerWidth / 2;
    var mouseY = event.clientY - window.innerHeight / 2;

    rotateParams.targetRotationY =
        rotateParams.targetRotationOnMouseDownY +
        (mouseY - rotateParams.mouseYOnMouseDown) * 0.005;
    rotateParams.targetRotationX =
        rotateParams.targetRotationOnMouseDownX +
        (mouseX - rotateParams.mouseXOnMouseDown) * 0.005;

    //group.rotation.y += (rotateParams.targetRotationX - group.rotation.y) * 0.2;
    //vertical rotation
    var finalRotationY = rotateParams.targetRotationY - group.rotation.x;

    //group.rotation.x += finalRotationY * 0.1;

    // if (group.rotation.x <= 1 && group.rotation.x >= -1) {
    //     group.rotation.x += finalRotationY * 0.1;
    // }
    // if (group.rotation.x > 1) {
    //     group.rotation.x = 1;
    // } else if (group.rotation.x < -1) {
    //     group.rotation.x = -1;
    // }
}

function autoRotate(group) {
    group.rotation.y -= 0.01;
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}