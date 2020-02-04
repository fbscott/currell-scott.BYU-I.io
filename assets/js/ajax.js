/******************************************************************************
 * WEATHER FORECASTER
 * <add description>
 *
 * DOM Dependencies - . . .
 *
 * JS Dependencies - None. Vanilla JS.
 *
 * @author Scott Currell
 *****************************************************************************/

// global namespace: Weather Forecaster (WF)
var WF = WF || {};

/******************************************************************************
 * LOAD DOCUMENT
 * Perform an XMLHttpRequest (AJAX) request and pass the response data to the
 * callback.
 *****************************************************************************/
WF.loadForecast = (url, loadCallback) => {
    // placeholder while loading
    WF.forecastContainer.innerHTML = `<p>Loading . . .</p>`;

    let _xhr = new XMLHttpRequest();

    _xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // response (parsed as JSON)
            let _jsonObject = JSON.parse(_xhr.responseText);

            // pass the parsed response to the DOM loader
            loadCallback(_jsonObject);
        }
    };

    _xhr.open('GET', url, true);
    _xhr.send();
};

WF.log = (data) => {
    console.table(data);
};

/******************************************************************************
 * INITIALIZER
 * Do all the things - kicks off the XMLHttpRequest
 *****************************************************************************/
document.forecast.submit.addEventListener('click', function() {
    // DOM elements
    WF.forecastContainer = document.getElementById('js-forecast-container');
    WF.fullURI = 'http://api.openweathermap.org/data/2.5/forecast?q=denver,%20US,%20US&units=imperial&apiKey=efb3e20ecbe6d6d8220230bbafc45108';
    WF.loadForecast(WF.fullURI, WF.log);
});
