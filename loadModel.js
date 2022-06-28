function loadModelToScene(userParams) {
  if (userParams.urlName) {
    var loader = new THREE.FileLoader();
    loader.load(userParams.urlName, function (name) {
      userParams.name = name;
    });
  }
  if (userParams.urlInfo) {
    var loader = new THREE.FileLoader();
    loader.load(userParams.urlInfo, function (info) {
      userParams.info = info;
    });
  }
}

function loadAllModel() {
  // load môi trường
  var pmremGenerator = new THREE.PMREMGenerator(mainRenderer);
  var hdrLoader = new THREE.RGBELoader();
  hdrLoader
    .setDataType(THREE.UnsignedByteType)
    .load("./resource/photo_studio_01_1k.hdr", function (texture, textureData) {
      var pngCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
      scene.background = pngCubeRenderTarget.texture;
      scene.environment = pngCubeRenderTarget.texture;
    });
  new THREE.GLTFLoader().load(
    "resource/models/cobokhoahoc/cobokhoahoc.glb",
    function (object) {
      object.scene.title = "cobokhoahoc";
      object.scene.userData = {
        urlName: "resource/models/cobokhoahoc/name.txt",
        urlInfo: "resource/models/cobokhoahoc/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/cobuudien/cobuudien.glb",
    function (object) {
      object.scene.title = "cobuudien";
      object.scene.userData = {
        urlName: "resource/models/cobuudien/name.txt",
        urlInfo: "resource/models/cobuudien/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/cochinhphu/cochinhphu.glb",
    function (object) {
      object.scene.title = "cochinhphu";
      object.scene.userData = {
        urlName: "resource/models/cochinhphu/name.txt",
        urlInfo: "resource/models/cochinhphu/info.txt",
      };

      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/cup_CNTT/cup_CNTT.glb",
    function (object) {
      object.scene.title = "cup_CNTT";
      object.scene.userData = {
        urlName: "resource/models/cup_CNTT/name.txt",
        urlInfo: "resource/models/cup_CNTT/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/cup_saokhue/cup_saokhue.glb",
    function (object) {
      object.scene.title = "cup_saokhue";
      object.scene.userData = {
        urlName: "resource/models/cup_saokhue/name.txt",
        urlInfo: "resource/models/cup_saokhue/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/cup_saovangdatviet/cup_saovangdatviet.glb",
    function (object) {
      object.scene.title = "cup_saovangdatviet";
      object.scene.userData = {
        urlName: "resource/models/cup_saovangdatviet/name.txt",
        urlInfo: "resource/models/cup_saovangdatviet/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/cup_thuongmai/cup_thuongmai.glb",
    function (object) {
      object.scene.title = "cup_thuongmai";
      object.scene.userData = {
        urlName: "resource/models/cup_thuongmai/name.txt",
        urlInfo: "resource/models/cup_thuongmai/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/cup_vifotec/cup_vifotec.glb",
    function (object) {
      object.scene.title = "cup_vifotec";
      object.scene.userData = {
        urlName: "resource/models/cup_vifotec/name.txt",
        urlInfo: "resource/models/cup_vifotec/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/laser/laser2.glb",
    function (object) {
      // object.scene.title = "laser";
      object.scene.userData = {
        urlName: "resource/models/laser/name.txt",
        urlInfo: "resource/models/laser/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);

      object.scene.traverse(function (child) {
        if (child) {
          child.userData = {
            urlName: "resource/models/laser/name.txt",
            urlInfo: "resource/models/laser/info.txt",
          };
          loadModelToScene(child.userData);
        }
      });

      console.log(object.scene);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/models/mayin3D/mayin3D.glb",
    function (object) {
      object.scene.title = "mayin3D";
      object.scene.userData = {
        urlName: "resource/models/mayin3D/name.txt",
        urlInfo: "resource/models/mayin3D/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
}

function loadPictures() {
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_large1/canvas_large1.glb",
    function (object) {
      object.scene.title = "canvas_large1";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_large1/name.txt",
        urlInfo: "resource/pictures/canvas_large1/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small1/canvas_small1.glb",
    function (object) {
      object.scene.title = "canvas_small1";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small1/name.txt",
        urlInfo: "resource/pictures/canvas_small1/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small2/canvas_small2.glb",
    function (object) {
      object.scene.title = "canvas_small2";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small2/name.txt",
        urlInfo: "resource/pictures/canvas_small2/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small3/canvas_small3.glb",
    function (object) {
      object.scene.title = "canvas_small3";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small3/name.txt",
        urlInfo: "resource/pictures/canvas_small3/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small4/canvas_small4.glb",
    function (object) {
      object.scene.title = "canvas_small4";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small4/name.txt",
        urlInfo: "resource/pictures/canvas_small4/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small5/canvas_small5.glb",
    function (object) {
      object.scene.title = "canvas_small5";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small5/name.txt",
        urlInfo: "resource/pictures/canvas_small5/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small6/canvas_small6.glb",
    function (object) {
      object.scene.title = "canvas_small6";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small6/name.txt",
        urlInfo: "resource/pictures/canvas_small6/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small7/canvas_small7.glb",
    function (object) {
      object.scene.title = "canvas_small7";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small7/name.txt",
        urlInfo: "resource/pictures/canvas_small7/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small8/canvas_small8.glb",
    function (object) {
      object.scene.title = "canvas_small8";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small8/name.txt",
        urlInfo: "resource/pictures/canvas_small8/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small9/canvas_small9.glb",
    function (object) {
      object.scene.title = "canvas_small9";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small9/name.txt",
        urlInfo: "resource/pictures/canvas_small9/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small10/canvas_small10.glb",
    function (object) {
      object.scene.title = "canvas_small10";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small10/name.txt",
        urlInfo: "resource/pictures/canvas_small10/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_small11/canvas_small11.glb",
    function (object) {
      object.scene.title = "canvas_small11";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_small11/name.txt",
        urlInfo: "resource/pictures/canvas_small11/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/canvas_square1/canvas_square1.glb",
    function (object) {
      object.scene.title = "canvas_square1";
      object.scene.userData = {
        urlName: "resource/pictures/canvas_square1/name.txt",
        urlInfo: "resource/pictures/canvas_square1/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/kiosk1/kiosk1.glb",
    function (object) {
      object.scene.title = "kiosk1";
      object.scene.userData = {
        urlName: "resource/pictures/kiosk1/name.txt",
        urlInfo: "resource/pictures/kiosk1/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/kiosk2/kiosk2.glb",
    function (object) {
      object.scene.title = "kiosk2";
      object.scene.userData = {
        urlName: "resource/pictures/kiosk2/name.txt",
        urlInfo: "resource/pictures/kiosk2/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/kiosk3/kiosk3.glb",
    function (object) {
      object.scene.title = "kiosk3";
      object.scene.userData = {
        urlName: "resource/pictures/kiosk3/name.txt",
        urlInfo: "resource/pictures/kiosk3/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/kiosk4/kiosk4.glb",
    function (object) {
      object.scene.title = "kiosk4";
      object.scene.userData = {
        urlName: "resource/pictures/kiosk4/name.txt",
        urlInfo: "resource/pictures/kiosk4/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/kiosk5/kiosk5.glb",
    function (object) {
      object.scene.title = "kiosk5";
      object.scene.userData = {
        urlName: "resource/pictures/kiosk5/name.txt",
        urlInfo: "resource/pictures/kiosk5/info.txt",
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
}

function loadVideo() {
  new THREE.GLTFLoader().load(
    "resource/pictures/TV_livevideo/TV_livevideo.glb",
    function (object) {
      object.scene.title = "TV_livevideo";
      object.scene.userData = {};
      scene.add(object.scene);
      collidableObjects.push(object.scene);
    }
  );
  new THREE.GLTFLoader().load(
    "resource/pictures/TV_video/TV_video.glb",
    function (object) {
      object.scene.title = "TV_video";
      object.scene.userData = {
        urlName: "resource/pictures/TV_video/name.txt",
        videoUrl: "resource/pictures/TV_video/CDIT.mp4",
        clickActions: {
          displayVideo: true,
        },
      };
      scene.add(object.scene);
      collidableObjects.push(object.scene);
      loadModelToScene(object.scene.userData);
    }
  );
}
