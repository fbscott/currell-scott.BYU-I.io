// global namespace
var PROJ = PROJ || {};

/******************************************************************************
 * LOAD DOCUMENT
 * Perform an XMLHttpRequest (AJAX) request and pass the response data to the
 * callback.
 *****************************************************************************/
PROJ.ajax = (url, loadCallback) => {
    // placeholder while loading
    // PROJ.forecastContainer.innerHTML = `<p>Loading weather forecast . . .</p>`;

    let _xhr = new XMLHttpRequest();

    _xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // response (parsed as JSON)
            let _jsonObject = JSON.parse(_xhr.responseText);

            // pass the parsed response to the DOM loader
            loadCallback(_jsonObject);
            PROJ.evenHeights();
            PROJ.flipPanels();
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
    const _container = document.getElementById('js-panel-container');
    let _cards       = '';

    for (var i = 0; i < 3; i++) {
        _cards += `
          <div class="column large-4">
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
          </div>
        `;
    }

    _container.innerHTML = _cards;
};

PROJ.evenHeights = () => {
    const _panels    = document.getElementsByClassName('js-even-height');
    let _panelHeight = 0;

    // get largest panel height
    [].forEach.call(_panels, el => {
        if (el.offsetHeight > _panelHeight) { _panelHeight = el.offsetHeight }
    });

    // set all panels to the same height
    [].forEach.call(_panels, el => {
        el.setAttribute("style", "min-height:" + _panelHeight + "px");
    });
};

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

PROJ.init = () => {

    PROJ.ajax('https://pixabay.com/api/?key=15462183-52054d7c5a68977efe09803b8&q=yellow+flowers&image_type=photo', PROJ.updateTheDOM);

};

PROJ.init();
