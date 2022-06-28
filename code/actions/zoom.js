
//zoom picture
function zoomIn() {
  frame.style.backgroundSize = "180%";
}

function zoomOut() {
  frame.style.backgroundSize = "contain";
  frame.style.backgroundPosition = "50% 50%";
}


function movePicture(e) {

  var zoomer = e.currentTarget;
  if (zoomer.style.backgroundSize != "contain") {
    var offsetX, offsetY;
    if (e.offsetX != null) {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    } else {
      offsetX = e.touches[0].pageX;
      offsetY = e.touches[0].pageY;
    }

    x = (offsetX / zoomer.offsetWidth) * 100;
    y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "%" + y + "%";
  }

}


//zoom sub scene
function zoomSubScene(event) {
  var fov = subCamera.fov + event.deltaY * 0.05;
  subCamera.fov = THREE.Math.clamp(fov, 5, 75);
  subCamera.updateProjectionMatrix();
}
