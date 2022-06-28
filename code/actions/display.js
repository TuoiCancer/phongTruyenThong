//display model
function displayModel(object) {
  document.getElementById("sub-container").style.display = "block";
  document.getElementById("sub-scene").style.display = "block";

  var hv = object;
  hv.position.set(0, 0, 0);

  const box = new THREE.Box3().setFromObject(hv);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  hv.position.x += hv.position.x - center.x;
  hv.position.y += hv.position.y - center.y;
  hv.position.z += hv.position.z - center.z;

  subCamera.near = size / 100;
  subCamera.far = size * 100;
  subCamera.updateProjectionMatrix();

  subCamera.position.copy(center);
  subCamera.position.x += size / 2.0;
  subCamera.position.y += size / 5.0;
  subCamera.position.z += size / 0.75;
  subCamera.lookAt(new THREE.Vector3());

  subCamera.fov = size;
  subCamera.updateProjectionMatrix();

  group.rotation.x = 0;
  group.rotation.y = Math.PI;

  group.add(hv);
  subScene.add(group);
  console.log(group);

}

//display close button
function displayCloseBtn() {
  document.getElementById("btn-close").style.display = "block";
}

//display title
function displayTitle(title) {
  document.getElementById("object-name").style.display = "block";
  document.getElementById("text-name").innerHTML = title;
}

//display info text
function displayInfo(info) {
  document.getElementById("info").style.display = "block";
  document.getElementById("info-text").innerHTML = info;
}

//display sound
function playAudio(audioUrl) {
  var sound = document.getElementById("sound");
  sound.style.display = "block";
  sound.src = audioUrl;
  sound.controls = "controls";
  sound.play();
}

//display image
function displayPicture(picUrl) {
  document.getElementById("sub-container").style.display = "block";
  document.getElementById("frame").style.display = "block";

  var img = "url" + "(" + picUrl + ")";
  document.getElementById("frame").style.backgroundImage = img;
}

//display video
function displayVideo(videoUrl) {
  document.getElementById("sub-container").style.display = "block";
  var video = document.getElementById("myvideo");
  video.style.display = "block";

  // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //   navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
  //     video.src = "https://www.youtube.com/watch?v=keIt6LJEC44";
  //     video.play();
  //   });
  // }
  video.src = videoUrl;
  video.play();
}

//hide sub scene
function hideAll() {
  document.getElementById("btn-screen").style.display = "block";
  document.getElementById("sub-container").style.display = "none";
  document.getElementById("frame").style.display = "none";
  document.getElementById("sub-scene").style.display = "none";
  //document.getElementById("sound").style.display = "none";
  document.getElementById("myvideo").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("mySidepanel").style.width = "0";
  document.getElementById("btn-close").style.display = "none";

  if (group.children.length > 0) {

    group.children[0].position.set(0, -15, 0);
    mainScene.add(group.children[0]);

  }

  //document.getElementById("sound").src = "";
  document.getElementById("myvideo").src = "";

  window.isSubScene = false;
  document.getElementById("main-container").focus();
}

//for sub scene info
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
  document.getElementById("mySidepanel").style.height = "95%";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
