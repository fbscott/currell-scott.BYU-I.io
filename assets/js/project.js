// global namespace
var PROJ = PROJ || {};

// all panels
PROJ.flippers = document.getElementsByClassName('js-panel-flip');
PROJ.panels   = document.getElementsByClassName('js-even-height');
PROJ.panelHeight = 0;

// get largest panel height
[].forEach.call(PROJ.panels, function(el) {
    if (el.offsetHeight > PROJ.panelHeight) { PROJ.panelHeight = el.offsetHeight }
});

// set all panels to the same height
[].forEach.call(PROJ.panels, function(el) {
    el.setAttribute("style", "min-height:" + PROJ.panelHeight + "px");
});

// flip panels on click
for (var i = 0; i < PROJ.flippers.length; i++) {
    PROJ.flippers[i].addEventListener('click', function() {
        this.classList.toggle('flip');
    });
}
