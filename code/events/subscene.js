//mouse down
function subSceneMouseDown(docEvent) {
    var event = getEvent(docEvent);
    mouseDownSub = true;
    startRotateModel(event, group);
}
//mouse move
function subSceneMouseMove(docEvent) {
    var event = getEvent(docEvent);
    if (mouseDownSub == true) {
        whileRotateModel(event, group);
    }
}
//mouse up
function subSceneMouseUp(docEvent) {
    mouseDownSub = false;
}
//mouse out
function subSceneMouseOut(docEvent) {
    mouseDownSub = false;
}

//wheel
function subSceneMouseWheel(docEvent) {
    zoomSubScene(docEvent);
}

