// global namespace: Memory Match (MM)
var MM = MM || {};

/******************************************************************************
 * IS VALID NUMBER
 * Validation check. See if a passed number already exists in an array.
 * @param  {Int}   num - number to check against the array
 * @param  {Array} arr - existing numbers
 * @return {Bool}
 *****************************************************************************/
MM.isValidNumber = (num, arr = []) => {

    if (!arr.includes(num)) {
        return true;
    } else {
        return false;
    }
};

/******************************************************************************
 * RANDOM NUMBER GENERATOR
 * Generates and returns a random number between and including a min/max range.
 * Minimum and maximum inclusive.
 * @param  {int}   max - maximum value
 * @param  {int}   min - minimum value
 * @param  {Array} arr - for validation check
 * @return {Int} randomized number from min to max inclusive
 *****************************************************************************/
MM.getRandomNumber = (max, min = 0, arr = []) => {

    // random number between and including range
    const RAND = Math.floor(Math.random() * max);

    // make sure random number doesn't already exist in the array
    if (MM.isValidNumber(RAND, arr)) {
        // TODO: refactor this double array push
        //       it's a clumsy way of getting the duplicate
        //       numbers I want for the panels
        arr.push(RAND);
        return RAND;
    } else {
        // recursive call if validation fails
        return MM.getRandomNumber(max, min, arr);
    }
};

/******************************************************************************
 * GET IMAGE INDICES
 * Creates and returns an array of random numbers.
 * @return {Array} - array of random numbers
 *****************************************************************************/
MM.getImageIndices = () => {

    const MAX = 20;
    const MIN = 0;

    let _numsArr = [];

    for (let i = 0; i < 6; i++) {
        // TODO: fix hackiness from other array push in MM.getRandomNumber
        _numsArr.push(MM.getRandomNumber(MAX, MIN, _numsArr));
    }

    return _numsArr;
};

/******************************************************************************
 * ARRAY SHUFFLER
 * Takes an array as a parameter and shuffles its contents. Returns the
 * original array in a different order.
 * Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#answer-2450976
 * @param  {Array} array - array to be shuffled
 * @return {Array} shuffled array
 *****************************************************************************/
MM.shuffleArray = array => {
  let _currentIndex = array.length;
  let _temporaryValue;
  let _randomIndex;

  // While there remain elements to shuffle...
  while (0 !== _currentIndex) {

    // Pick a remaining element...
    _randomIndex = Math.floor(Math.random() * _currentIndex);
    _currentIndex -= 1;

    // And swap it with the current element.
    _temporaryValue = array[_currentIndex];
    array[_currentIndex] = array[_randomIndex];
    array[_randomIndex] = _temporaryValue;
  }

  return array;
}

/******************************************************************************
 * IS A MATCH
 * Checks to see if two data attributes are the same
 * @param {Array} arr - array of DOM elements
 * @return {Bool} _isMatch
 *****************************************************************************/
MM.isMatch = (arr) => {

    let _isMatch = false;

    for (let i = 0; i < arr.length; i++) {
        if (arr.length === 2 &&
            arr[0].dataset.index === arr[1].dataset.index) {
            _isMatch = true;
        }
    }

    return _isMatch;
};

/******************************************************************************
 * PANEL FLIPPER
 * Flips the panels over when clicked
 *****************************************************************************/
MM.flipPanels = (el) => {

    let _el = el.currentTarget;

    // flip a max of 2 panels at a time, but only those that are not already flipped or disabled
    if (!_el.classList.contains('flip', 'disabled') && MM.flippedCount < MM.maxFlipCount) {

        _el.classList.toggle('flip');

        MM.flippedPanels = document.getElementsByClassName('js-panel-flip flip');

        // check flipped panels to make sure they're a match
        if (MM.isMatch(MM.flippedPanels)) {
            [].forEach.call(MM.flippedPanels, function(flippedPanel) {
                // prevent them from flipping back over once matched
                flippedPanel.classList.add('disabled', 'js-disabled');
                MM.maxFlipCount += 1;
            });
        }

        let _disabledPanels = document.getElementsByClassName('js-disabled');

        [].forEach.call(_disabledPanels, function(disabledPanel) {
            disabledPanel.classList.remove('flip');
            // remove click handler
            // allows other panels to be flipped after match
            disabledPanel.removeEventListener('click', MM.flipPanels);
        });

        MM.flippedCount++;
        MM.score++;

    // flip a panel back over if it's already flipped
    } else if(_el.classList.contains('flip', 'disabled')) {

        _el.classList.toggle('flip');
        
        MM.flippedCount--;
    }
};

/******************************************************************************
 * ON PANEL CLICK
 * Listens for panel click event
 *****************************************************************************/
MM.onPanelClick = () => {

    // all panels
    MM.panels = document.getElementsByClassName('js-panel-flip');

    // flip panels on click
    for (let i = 0; i < MM.panels.length; i++) {
        let _flipper = MM.panels[i];
        // _flipper.addEventListener('click', MM.flipPanels.bind(_flipper));
        _flipper.addEventListener('click', MM.flipPanels);
    }
};

/******************************************************************************
 * UPDATE THE DOM
 * @param  {Object} data - parsed JSON object array
 *****************************************************************************/
MM.updateTheDOM = data => {

    const IMG_INDICES = MM.shuffleArray(MM.getImageIndices());

    // build panel container
    let _panels = `<div class="row">`;

    // add 12 panels to the container
    for (let i = 0; i < IMG_INDICES.length; i++) {
        // break panels up into rows of four
        if (i != 0 && i % 4 === 0) {
            _panels += `</div><div class="row">`;
        }

        // individual panel markup
        _panels += `<div class="column large-3">
                     <div class="panel-container">
                       <div class="panel-flip js-panel-flip" data-index="img-${IMG_INDICES[i]}">
                         <div class="panel-front">
                           <img src="./assets/img/question_mark.png" width="113" height="113" />
                         </div>
                         <div class="panel-back"
                              style="background-image: url(${data.hits[IMG_INDICES[i]].webformatURL})">
                         </div>
                       </div>
                     </div>
                   </div>`;
    }

    // close container
    _panels += `</div>`;

    // update the DOM
    MM.panelContainer.innerHTML = _panels;

    // add flip logic
    MM.onPanelClick();
};

/******************************************************************************
 * LOAD DOCUMENT
 * Perform an XMLHttpRequest (AJAX) request and pass the response data to the
 * callback.
 * @param {String}   url           - API url
 * @param {Function} localCallback - callback that will handle the AJAX
 *                                     response
 *****************************************************************************/
MM.ajax = (url, loadCallback) => {

    // placeholder while loading
    MM.panelContainer.innerHTML = `<div class="row"><div class="column"><p>Loading game . . .</p></div></div>`;

    let _xhr = new XMLHttpRequest();

    _xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
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
 * INITIALIZER
 * Do all the things
 *****************************************************************************/
MM.init = () => {

    MM.maxFlipCount = 2;
    MM.flippedCount = 0; // number of flipped panels
    MM.score = 0;
    MM.panelContainer = document.getElementById('js-panel-container');
    MM.baseURL = 'https://pixabay.com/api/';
    MM.key = '15462183-52054d7c5a68977efe09803b8';
    MM.query = 'bbq';

    MM.ajax(MM.baseURL + '?key=' +
            MM.key + '&q=' +
            MM.query + '&image_type=photo',
            MM.updateTheDOM);

};

MM.init();
