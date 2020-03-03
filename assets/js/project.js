// global namespace
var PROJ = PROJ || {};

/******************************************************************************
 * LOAD DOCUMENT
 * Perform an XMLHttpRequest (AJAX) request and pass the response data to the
 * callback.
 *****************************************************************************/
PROJ.ajax = (url, loadCallback) => {

    // placeholder while loading
    PROJ.container.innerHTML = `<div class="column"><p>Loading weather forecast . . .</p></div>`;

    let _xhr = new XMLHttpRequest();

    _xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // response (parsed as JSON)
            let _jsonObject = JSON.parse(_xhr.responseText);

            // pass the parsed response to the DOM loader
            loadCallback(_jsonObject);
            PROJ.flipPanels();
            PROJ.evenHeights();
        }
    };

    _xhr.open('GET', url, true);
    _xhr.send();
};

/******************************************************************************
 * UPDATE THE DOM
 * @param  {Object} data - parsed JSON object array
 *****************************************************************************/
PROJ.updateTheDOM = data => {

    let _cards = `<div class="row">`;

    for (var i = 0; i < 12; i++) {
        if (i != 0 && i % 4 == 0) {
            _cards += `</div><div class="row">`;
        }

        _cards += `<div class="column large-3">
                     <div class="panel-container">
                       <div class="panel-flip js-panel-flip">
                         <div class="panel-front js-even-height">
                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                         </div>
                         <div class="panel-back js-even-height">
                           <img src="${data.hits[i].webformatURL}" />
                         </div>
                       </div>
                     </div>
                   </div>`;
    }

    _cards += `</div>`;

    PROJ.container.innerHTML = _cards;
};

/******************************************************************************
 * EVEN HEIGHTS
 * Makes all panels the same height
 *****************************************************************************/
PROJ.evenHeights = () => {
    const _flips = document.getElementsByClassName('js-panel-flip');
    const _panels = document.getElementsByClassName('js-even-height');
    let _panelHeight = 0;

    // get largest panel height
    [].forEach.call(_panels, el => {
        if (el.offsetHeight > _panelHeight) { _panelHeight = el.offsetHeight }
    });

    // set all flips to the same height
    [].forEach.call(_flips, el => {
        el.setAttribute("style", "min-height:" + ( _panelHeight + 60 ) + "px");
    });

    // set all panels to the same height
    [].forEach.call(_panels, el => {
        el.setAttribute("style", "min-height:" + _panelHeight + "px");
    });
};

/******************************************************************************
 * PANEL FLIPPER
 * Flips the panels over when clicked
 *****************************************************************************/
PROJ.flipPanels = () => {
    // all panels
    const _flippers = document.getElementsByClassName('js-panel-flip');

    // flip panels on click
    for (var i = 0; i < _flippers.length; i++) {
        _flippers[i].addEventListener('click', function() {
            this.classList.toggle('flip');
        });
    }
};

/******************************************************************************
 * INITIALIZER
 * Do all the things
 *****************************************************************************/
PROJ.init = () => {

    PROJ.container = document.getElementById('js-panel-container');
    PROJ.baseURL = 'https://pixabay.com/api/';
    PROJ.key = '15462183-52054d7c5a68977efe09803b8';
    PROJ.query = 'yellow+flowers';

    PROJ.ajax(PROJ.baseURL + '?key=' +
              PROJ.key + '&q=' +
              PROJ.query + '&image_type=photo',
              PROJ.updateTheDOM);

};

PROJ.init();
