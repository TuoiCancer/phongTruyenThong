//contextmenu
window.addEventListener(
    "contextmenu",
    function () {
        event.preventDefault();
    },
    false
);
//resize window
window.addEventListener("resize", onWindowResize, false);

//event resize
function onWindowResize() {
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.updateProjectionMatrix();
    mainRenderer.setSize(window.innerWidth, window.innerHeight);

    subCamera.aspect = ((window.innerWidth * 0.8) / window.innerHeight) * 0.95;
    subCamera.updateProjectionMatrix();
    subRenderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.95);
}
