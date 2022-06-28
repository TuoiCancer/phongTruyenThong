//add room to scene
function loadRoomToScene(mainScene, modelUrl, modelParams, envMap) {
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffbb,
    dithering: true,
    transparent: true,
    opacity: 0,
  });
  var geometry = new THREE.PlaneBufferGeometry(400, 400);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -14.85, 0);
  mesh.rotation.x = -Math.PI * 0.5;

  //collidableObjects.push(mesh);
  //mainScene.add(mesh);
  //mesh.name = 'floor';

  var loadhouse = new THREE.GLTFLoader(loadingManager);
  loadhouse.load(modelUrl, function (object) {
    var ROOM = object.scene;

    ROOM.position.set(modelParams.pos.x, modelParams.pos.y, modelParams.pos.z);
    ROOM.scale.set(
      modelParams.scale.x,
      modelParams.scale.y,
      modelParams.scale.z
    );

    for (var i = 0; i < ROOM.children.length; i++) {
      collidableObjects.push(ROOM.children[i]);
    }

    ROOM.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = envMap;
        child.material.transparent = true;

        //child.material.envMapIntensity = 0;
        child.matrixAutoUpdate = false;

        if (child.name == "floor") {
          collidableObjects.push(child);
        }
      }
    });

    mainScene.add(ROOM);
  });
}

//add model to scene
function loadModelToScene(urlModel, modelParams, userParams, envMap, stt) {
  var loader = new THREE.GLTFLoader(loadingManager);
  loader.load(urlModel, (object) => {
    var hienvat = object.scene;

    hienvat.traverse(function (child) {
      if (child.isMesh) {
        // child.castShadow = true;
        // child.receiveShadow = true;
        child.material.transparent = true;
        child.material.envMap = envMap;
        //child.material.envMapIntensity = 0;
        child.matrixAutoUpdate = false;
      }
    });

    const pos = hienvat.children[0].position;
    var worldPosition = new THREE.Vector3(
      pos.x * modelParams.scale.x + modelParams.pos.x,
      pos.y * modelParams.scale.y + modelParams.pos.y,
      pos.z * modelParams.scale.z + modelParams.pos.z
    );

    var objectDescription = {
      audioUrl: userParams.audioUrl,
      info: "",
      object: hienvat,
      name: "",
      envmap: envMap,
      worldPos: worldPosition,
      clickActions: userParams.clickActions,
      hoverActions: userParams.hoverActions,
    };

    if (userParams.nameUrl) {
      var loader = new THREE.FileLoader(loadingManager);
      loader.load(userParams.nameUrl, function (name) {
        objectDescription.name = name;
      });
    }

    if (userParams.infoUrl) {
      var loader = new THREE.FileLoader(loadingManager);
      loader.load(userParams.infoUrl, function (info) {
        objectDescription.info = info;
      });
    }

    for (var i = 0; i < hienvat.children.length; i++) {
      hienvat.children[i].userData = objectDescription;
    }

    hienvat.position.set(
      modelParams.pos.x,
      modelParams.pos.y,
      modelParams.pos.z
    );

    hienvat.scale.set(
      modelParams.scale.x,
      modelParams.scale.y,
      modelParams.scale.z
    );

    hienvat.userData = objectDescription;
    //console.log(hienvat);
    mainScene.add(hienvat);
    collidableObjects.push(hienvat);
    moveObjects[stt.toString()] = hienvat;
  });
}

//add picture to scene
function loadImageToScene(picUrl, modelParams, userParams, envMap, stt) {
  var loader = new THREE.GLTFLoader(loadingManager);
  loader.load(picUrl, (object) => {
    var hienvat = object.scene;

    hienvat.traverse(function (child) {
      if (child.isMesh) {
        // child.castShadow = true;
        // child.receiveShadow = true;
        child.material.transparent = true;
        child.material.envMap = envMap;
        //child.material.envMapIntensity = 0;
        child.matrixAutoUpdate = false;
      }
    });

    const pos = hienvat.children[0].position;
    var worldPosition = new THREE.Vector3(
      pos.x * modelParams.scale.x + modelParams.pos.x,
      pos.y * modelParams.scale.y + modelParams.pos.y,
      pos.z * modelParams.scale.z + modelParams.pos.z
    );

    var objectDescription = {
      audioUrl: userParams.audioUrl,
      info: "",
      picUrl: userParams.picUrl,
      name: "",
      worldPos: worldPosition,
      clickActions: userParams.clickActions,
      hoverActions: userParams.hoverActions,
    };

    if (userParams.nameUrl) {
      var loader = new THREE.FileLoader(loadingManager);
      loader.load(userParams.nameUrl, function (name) {
        objectDescription.name = name;
      });
    }

    if (userParams.infoUrl) {
      var loader = new THREE.FileLoader(loadingManager);
      loader.load(userParams.infoUrl, function (info) {
        objectDescription.info = info;
      });
    }

    for (var i = 0; i < hienvat.children.length; i++) {
      hienvat.children[i].userData = objectDescription;
    }

    hienvat.position.set(
      modelParams.pos.x,
      modelParams.pos.y,
      modelParams.pos.z
    );

    hienvat.scale.set(
      modelParams.scale.x,
      modelParams.scale.y,
      modelParams.scale.z
    );

    hienvat.userData = objectDescription;
    //console.log(hienvat);
    mainScene.add(hienvat);
    collidableObjects.push(hienvat);
    moveObjects[stt.toString()] = hienvat;
  });
}

//add video to scene
function loadVideoToScene(videoUrl, modelParams, userParams, envMap, stt) {
  var loader = new THREE.GLTFLoader(loadingManager);
  loader.load(videoUrl, (object) => {
    var hienvat = object.scene;

    hienvat.traverse(function (child) {
      if (child.isMesh) {
        // child.castShadow = true;
        // child.receiveShadow = true;
        child.material.transparent = true;
        child.material.envMap = envMap;
        //child.material.envMapIntensity = 0;
        child.matrixAutoUpdate = false;
      }
    });

    const pos = hienvat.children[0].position;
    var worldPosition = new THREE.Vector3(
      pos.x * modelParams.scale.x + modelParams.pos.x,
      pos.y * modelParams.scale.y + modelParams.pos.y,
      pos.z * modelParams.scale.z + modelParams.pos.z
    );

    var objectDescription = {
      audioUrl: userParams.audioUrl,
      info: "",
      videoUrl: userParams.videoUrl,
      name: "",
      worldPos: worldPosition,
      clickActions: userParams.clickActions,
      hoverActions: userParams.hoverActions,
    };

    if (userParams.nameUrl) {
      var loader = new THREE.FileLoader(loadingManager);
      loader.load(userParams.nameUrl, function (name) {
        objectDescription.name = name;
      });
    }

    if (userParams.infoUrl) {
      var loader = new THREE.FileLoader(loadingManager);
      loader.load(userParams.infoUrl, function (info) {
        objectDescription.info = info;
      });
    }

    for (var i = 0; i < hienvat.children.length; i++) {
      hienvat.children[i].userData = objectDescription;
    }

    hienvat.position.set(
      modelParams.pos.x,
      modelParams.pos.y,
      modelParams.pos.z
    );

    hienvat.scale.set(
      modelParams.scale.x,
      modelParams.scale.y,
      modelParams.scale.z
    );

    hienvat.userData = objectDescription;
    //console.log(hienvat);
    mainScene.add(hienvat);
    collidableObjects.push(hienvat);
    moveObjects[stt.toString()] = hienvat;
  });
}

//basic light
function addBasicLights(mainScene, subScene) {
  var light = new THREE.AmbientLight(0xb2b2b2, 1);
  light.position.set(0, -15, 0);
  mainScene.add(light);

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
}

//skybox
function addSkybox(mainScene, subScene) {
  var _r = "texture/skybox/";
  var urls = [
    _r + "px.jpg",
    _r + "nx.jpg",
    _r + "py.jpg",
    _r + "ny.jpg",
    _r + "pz.jpg",
    _r + "nz.jpg",
  ];
  //var envmap = new THREE.CubeTextureLoader().load(urls);
  //mainScene.background = envmap;
  subScene.background = new THREE.Color(0xededed);

  //envmap.dispose();
}

//add live video
function loadLiveVideoToScene(liveVideoUrl, modelParams, userParams, stt) {
  var loader = new THREE.GLTFLoader(loadingManager);
  loader.load(liveVideoUrl, (object) => {
    var hienvat = object.scene;

    var livevideo = document.getElementById("live-video");
    var texture = new THREE.VideoTexture(livevideo);
    hienvat.traverse(function (child) {
      if (child.isMesh) {
        // child.castShadow = true;
        // child.receiveShadow = true;
        //child.material.transparent = true;
        //child.material.envMap = envMap;
        //child.material.envMapIntensity = 0;
        child.matrixAutoUpdate = false;

        child.material = new THREE.MeshBasicMaterial({ map: texture });
      }
    });

    hienvat.position.set(
      modelParams.pos.x,
      modelParams.pos.y,
      modelParams.pos.z
    );

    hienvat.scale.set(
      modelParams.scale.x,
      modelParams.scale.y,
      modelParams.scale.z
    );

    const pos = hienvat.children[0].position;
    var worldPosition = new THREE.Vector3(
      pos.x * modelParams.scale.x + modelParams.pos.x,
      pos.y * modelParams.scale.y + modelParams.pos.y,
      pos.z * modelParams.scale.z + modelParams.pos.z
    );

    var objectDescription = {
      name: "",
      worldPos: worldPosition,
      clickActions: userParams.clickActions,
      hoverActions: userParams.hoverActions,
    };

    if (userParams.nameUrl) {
      var loader = new THREE.FileLoader(loadingManager);
      loader.load(userParams.nameUrl, function (name) {
        objectDescription.name = name;
      });
    }

    //webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      var constraints = {
        video: { width: 1280, height: 720, facingMode: "user" },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // apply the stream to the video element used in the texture

          livevideo.srcObject = stream;
        })
        .catch(function (error) {
          console.error("Unable to access the camera/webcam.", error);
        });
    } else {
      console.error("MediaDevices interface not available.");
    }

    hienvat.userData = objectDescription;
    //console.log(hienvat);
    mainScene.add(hienvat);
    collidableObjects.push(hienvat);
    moveObjects[stt.toString()] = hienvat;
  });
}
