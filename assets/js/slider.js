var cube = cube || {};

cube.sides      = document.getElementsByClassName('js-cube-side');
cube.transZ     = document.cubeValues.transZ;
cube.transZdisp = document.getElementById('js-transZ-value');
cube.rot        = document.cubeValues.rot;
cube.rotdisp    = document.getElementById('js-rot-value');
cube.transZVal  = 122;
cube.rotVal     = 0;

cube.transZ.oninput = function() {
    cube.transZdisp.innerHTML = this.value;

    cube.sides[0].style.transform = "rotateY(0deg)   translateZ(" + this.value + "px) rotate(" + cube.rotVal + "deg)";
    cube.sides[1].style.transform = "rotateY(90deg)  translateZ(" + this.value + "px) rotate(" + cube.rotVal + "deg)";
    cube.sides[2].style.transform = "rotateY(180deg) translateZ(" + this.value + "px) rotate(" + cube.rotVal + "deg)";
    cube.sides[3].style.transform = "rotateY(-90deg) translateZ(" + this.value + "px) rotate(" + cube.rotVal + "deg)";
    cube.sides[4].style.transform = "rotateX(90deg)  translateZ(" + this.value + "px) rotate(" + cube.rotVal + "deg)";
    cube.sides[5].style.transform = "rotateX(-90deg) translateZ(" + this.value + "px) rotate(" + cube.rotVal + "deg)";

    if (this.value) {
        cube.transZVal = this.value;
    }
};

cube.rot.oninput = function() {
    cube.rotdisp.innerHTML = this.value;

    cube.sides[0].style.transform = "rotateY(0deg)   translateZ(" + cube.transZVal + "px) rotate(" + this.value + "deg)";
    cube.sides[1].style.transform = "rotateY(90deg)  translateZ(" + cube.transZVal + "px) rotate(" + this.value + "deg)";
    cube.sides[2].style.transform = "rotateY(180deg) translateZ(" + cube.transZVal + "px) rotate(" + this.value + "deg)";
    cube.sides[3].style.transform = "rotateY(-90deg) translateZ(" + cube.transZVal + "px) rotate(" + this.value + "deg)";
    cube.sides[4].style.transform = "rotateX(90deg)  translateZ(" + cube.transZVal + "px) rotate(" + this.value + "deg)";
    cube.sides[5].style.transform = "rotateX(-90deg) translateZ(" + cube.transZVal + "px) rotate(" + this.value + "deg)";

    if (this.value) {
        cube.rotVal = this.value;
    }
}
