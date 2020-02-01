/******************************************************************************
 * GIF FILE LOADER
 * Fetch gif files via AJAX then display those files in the DOM.
 *
 * DOM Dependencies - #gif-container (results container)
 *
 * JS Dependencies - None. Vanilla JS.
 *
 * @author Scott Currell
 *****************************************************************************/

// global namespace
var GIF = GIF || {};

/******************************************************************************
 * LOAD DOCUMENT
 * Perform an XMLHttpRequest (AJAX) request and pass the response data to the
 * callback.
 *****************************************************************************/
GIF.loadGifData = (url, loadCallback) => {
    // placeholder while loading
    GIF.replyContainer.innerHTML = 'Loading . . .';

    let _xhr = new XMLHttpRequest();

    _xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // response (parsed as JSON)
            let _jsonObject = JSON.parse(_xhr.responseText);

            // pass 'this' to the callback
            // makes loadGifData() reusable
            loadCallback(_jsonObject);
        }
    };

    _xhr.open('GET', url, true);
    _xhr.send();
};

/******************************************************************************
 * BUILD GIF LIST
 * Takes a parsed JSON object and builds an HTML list of links.
 * @param  {Object} data - parsed JSON
 * @return {String} concatenated HTML list of files
 *****************************************************************************/
GIF.buildGifList = data => {
    let _gifList = '<ul>';

    for (let i = data.length - 1; i >= 0; i--) {
        // template literal
        _gifList += `<li>
                       <a id="js-${data[i].id}"
                          class="js-show-gif"
                          href="javascript:void(0);"
                          data-url="${data[i].file}">
                          Gif ${i}
                       </a>
                     </li>`;
    }

    _gifList += '</ul>';

    return _gifList;
};

/******************************************************************************
 * UPDATE THE DOM
 * Receives a parsed XMLHttpRequest response, builds an HTML list of gifs,
 * and appends the to the DOM.
 * @param {Object} JSON - parsed XMLHttpRequest response
 *****************************************************************************/
GIF.updateDOM = JSON => {
    GIF.gifList = GIF.buildGifList(JSON);
    GIF.replyContainer.innerHTML = GIF.gifList;
    GIF.links = document.getElementsByClassName('js-show-gif');

    [].forEach.call(GIF.links, function(el) {
        el.addEventListener('click', function() {
            GIF.gifContainer.innerHTML = `<img src=${this.dataset.url} />`;
        });
    });
};

/******************************************************************************
 * INITIALIZER
 * Do all the things - kicks off the XMLHttpRequest
 *****************************************************************************/
(function init() {
    // DOM elements
    GIF.replyContainer = document.getElementById('gif-reply-container');
    GIF.gifContainer = document.getElementById('gif-container');
    // JSON path (next five lines)
    GIF.baseURI = 'http://replygif.net/api/gifs?tag=';
    GIF.tags    = 'okay,friends';
    GIF.params  = '&tag-operator=and';
    GIF.api     = '&api-key=39YAprx5Yi';
    GIF.fullURI = GIF.baseURI + GIF.tags + GIF.params + GIF.api;

    GIF.loadGifData(GIF.fullURI, GIF.updateDOM);
})();
