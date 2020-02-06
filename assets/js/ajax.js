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
    WF.forecastContainer.innerHTML = `<p>Loading weather forecast . . .</p>`;

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

/******************************************************************************
 * GET DAILY HIGH TEMP
 * Takes an object array and a float parameter. Finds and returns the highest
 * value for the parameter in the array.
 * resource: getting max values in json array:
 *           https://stackoverflow.com/questions/22949597/
 *           getting-max-values-in-json-array#22949724
 * @param  {Array} arr - object array
 * @return {Float} highest temp found
 *****************************************************************************/
WF.getDailyHigh = (arr) => {
    let _max;

    for (var i = arr.list.length - 1; i >= 0; i--) {
        if (_max === null || _max === undefined || arr.list[i].main.temp_max > _max) {
            _max = arr.list[i].main.temp_max;
        }
    }

    return _max;
};

/******************************************************************************
 * GET DAILY LOW TEMP
 * Takes an object array and a float parameter. Finds and returns the lowest
 * value for the parameter in the array.
 * resource: getting max values in json array:
 *           https://stackoverflow.com/questions/22949597/
 *           getting-max-values-in-json-array#22949724
 * @param  {Array} arr - object array
 * @return {Float} lowest temp found
 *****************************************************************************/
WF.getDailyLow = (arr) => {
    let _low;

    for (var i = arr.list.length - 1; i >= 0; i--) {
        if (_low === null || _low === undefined || arr.list[i].main.temp_min < _low) {
            _low = arr.list[i].main.temp_min;
        }
    }

    return _low;
};

/******************************************************************************
 * PARSE BY DAYS
 * Takes a parsed JSON object and breaks it up by days (by the timestamp).
 * resource: add a key value pair to a javascript object:
 *           https://stackoverflow.com/questions/1168807/
 *           how-can-i-add-a-key-value-pair-to-a-javascript-object#1168814
 * @param  {Object} data - parsed JSON object array
 *****************************************************************************/
WF.parseByDays = (data) => {
    for (var i = 0; i < data.list.length; i++) {
        switch(new Date(data.list[i].dt * 1000).getDay()) {
            case 0:
                WF.sunday = WF.sunday || {};
                WF.sunday.list = WF.sunday.list || [];
                WF.sunday.list.push({'dt': data.list[i].dt,'main': data.list[i].main, 'weather': data.list[i].weather});
                break;
            case 1:
                WF.monday = WF.monday || {};
                WF.monday.list = WF.monday.list || [];
                WF.monday.list.push({'dt': data.list[i].dt,'main': data.list[i].main, 'weather': data.list[i].weather});
                break;
            case 2:
                WF.tuesday = WF.tuesday || {};
                WF.tuesday.list = WF.tuesday.list || [];
                WF.tuesday.list.push({'dt': data.list[i].dt,'main': data.list[i].main, 'weather': data.list[i].weather});
                break;
            case 3:
                WF.wednesday = WF.wednesday || {};
                WF.wednesday.list = WF.wednesday.list || [];
                WF.wednesday.list.push({'dt': data.list[i].dt,'main': data.list[i].main, 'weather': data.list[i].weather});
                break;
            case 4:
                WF.thursday = WF.thursday || {};
                WF.thursday.list = WF.thursday.list || [];
                WF.thursday.list.push({'dt': data.list[i].dt,'main': data.list[i].main, 'weather': data.list[i].weather});
                break;
            case 5:
                WF.friday = WF.friday || {};
                WF.friday.list = WF.friday.list || [];
                WF.friday.list.push({'dt': data.list[i].dt,'main': data.list[i].main, 'weather': data.list[i].weather});
                break;
            case 6:
                WF.saturday = WF.saturday || {};
                WF.saturday.list = WF.saturday.list || [];
                WF.saturday.list.push({'dt': data.list[i].dt,'main': data.list[i].main, 'weather': data.list[i].weather});
                break;
            default: break;
        }
    }
};

WF.buildForecast = () => {
    WF.forecast = [];

    if (WF.sunday) {
        WF.forecast.push({day: 'Sunday', high: WF.getDailyHigh(WF.sunday), low: WF.getDailyLow(WF.sunday)});
    }
};

WF.updateTheDOM = (data) => {
    let _table = `<h2>Weather Forecast for ${data.city.name}</h2>
                    <table><tr>`;

    WF.parseByDays(data);

    _table += `</tr></table>`;

    WF.forecastContainer.innerHTML = _table;
};

/******************************************************************************
 * INITIALIZER
 * Do all the things - kicks off the XMLHttpRequest, etc.
 *****************************************************************************/
document.forecast.submit.addEventListener('click', function() {
    // DOM elements
    WF.userInput         = document.forecast.city.value;
    WF.forecastContainer = document.getElementById('js-forecast-container');

    // API URI
    WF.baseURI = 'https://api.openweathermap.org/data/2.5/forecast';
    WF.city    = WF.userInput;
    WF.apiKey  = 'efb3e20ecbe6d6d8220230bbafc45108';
    WF.fullURI = WF.baseURI + '?q=' + WF.city + ',%20US,%20US&units=imperial&apiKey=' + WF.apiKey;

    // call the API and update the DOM
    WF.loadForecast(WF.fullURI, WF.updateTheDOM);
});
