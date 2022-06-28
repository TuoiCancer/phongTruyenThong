function onVideoEnd() {
    current++;
    if (current == moveObjects.length) {
        current = 0;
    }
    moveTo(current);
}

function onAudioEnd() {
    current++;
    if (current == moveObjects.length) {
        current = 0;
    }
    moveTo(current);
}

function moveToNext() {
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

function moveTo(stt) {

    var moveCamera = mainCamera.userData.moveCamera;
    // stt = 0;
    if (moveCamera.progress === false) {
        hideAll();
        // Holds current camera position
        moveCamera.camPos = new THREE.Vector3(
            mainCamera.position.x,
            mainCamera.position.y,
            mainCamera.position.z
        );
        if (moveObjects[stt].rotation.y == 0) {
            // Target position
            moveCamera.targetPos = new THREE.Vector3(
                moveObjects[stt].userData.worldPos.x,
                mainCamera.position.y,
                moveObjects[stt].userData.worldPos.z + 50 / 2
            );
        } else if (moveObjects[stt].rotation.y == Math.PI / 2) {
            // Target position
            moveCamera.targetPos = new THREE.Vector3(
                moveObjects[stt].userData.worldPos.x + 50 / 2,
                mainCamera.position.y,
                moveObjects[stt].userData.worldPos.z
            );
        } else if (moveObjects[stt].rotation.y == -(Math.PI / 2)) {
            // Target position
            moveCamera.targetPos = new THREE.Vector3(
                moveObjects[stt].userData.worldPos.x - 50 / 2,
                mainCamera.position.y,
                moveObjects[stt].userData.worldPos.z
            );
        } else if (moveObjects[stt].rotation.y == Math.PI) {
            // Target position
            moveCamera.targetPos = new THREE.Vector3(
                moveObjects[stt].userData.worldPos.x,
                mainCamera.position.y,
                moveObjects[stt].userData.worldPos.z - 50 / 2
            );
        }

        mainCamera.target.x = moveObjects[stt].userData.worldPos.x;
        mainCamera.target.y = moveObjects[stt].userData.worldPos.y;
        mainCamera.target.z = moveObjects[stt].userData.worldPos.z;

        moveCamera.lookAt = true;
        moveCamera.progress = true;
    }
}

function onMoveFinish() {
    window.isSubScene = true;

    var clickActions = moveObjects[current].userData.clickActions;

    if (clickActions.displayModel === true && moveObjects[current].userData.object) {
        displayModel(moveObjects[current].userData.object);
    }
    if (clickActions.displayInfo === true && moveObjects[current].userData.info) {
        displayInfo(moveObjects[current].userData.info);
    }
    if (clickActions.playAudio === true && moveObjects[current].userData.audioUrl) {
        playAudio(moveObjects[current].userData.audioUrl);
    }
    if (clickActions.displayPicture === true && moveObjects[current].userData.picUrl) {
        displayPicture(moveObjects[current].userData.picUrl);
    }
    if (clickActions.displayVideo === true && moveObjects[current].userData.videoUrl) {
        displayVideo(moveObjects[current].userData.videoUrl);
    }
}