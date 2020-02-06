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

WF.getDailyHigh = (data) => {};

WF.getDailyLow = (data) => {};

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
    WF.userInput = document.forecast.city.value;
    WF.forecastContainer = document.getElementById('js-forecast-container');
    // API URI
    WF.baseURI = 'https://api.openweathermap.org/data/2.5/forecast';
    WF.city    = WF.userInput;
    WF.apiKey  = 'efb3e20ecbe6d6d8220230bbafc45108';
    WF.fullURI = WF.baseURI + '?q=' + WF.city + ',%20US,%20US&units=imperial&apiKey=' + WF.apiKey;
    // call the API and update the DOM
    WF.loadForecast(WF.fullURI, WF.updateTheDOM);
});
