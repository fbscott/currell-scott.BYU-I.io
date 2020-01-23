/*******************************************************************
 * FIRST EXAMPLE
 ******************************************************************/
// DOM elements
var toggleButton = document.getElementById('js-button');
var revealEl     = document.getElementById('js-reveal');

// toggle boolean
var isHidden = true;

/**
 * REVEAL TEXT
 * Shows DOM element
 */
function revealText() {
   if (isHidden) {
   // show the element
      revealEl.classList.remove('hide');
    // change button text
    this.innerHTML = 'Hide Text';
  } else {
  // hide the element
   revealEl.classList.add('hide');
    // change button text
    this.innerHTML = 'Show Text';
  }
  
  // update bool
  isHidden = !isHidden;
}

// event listener
toggleButton.addEventListener('click', revealText);

/*******************************************************************
 * SECOND EXAMPLE
 ******************************************************************/
// DOM elements
var coloredListItems = document.getElementsByClassName('js-list-item');

/**
 * Loop through all the various <li>'s and apply thier
 * respective HEX color values.
 */
for (var i = coloredListItems.length - 1; i >= 0; i--) {
   // get the color from the <li>'s data attribute'
   var _color = coloredListItems[i].dataset.color;
  
  // set CSS color value
  coloredListItems[i].style.color = _color;
}

/*******************************************************************
 * THIRD EXAMPLE
 ******************************************************************/
// DOM elements
var textChanger  = document.text_changer;
var changeButton = textChanger.change_props;
var target       = document.getElementById('js-target');

/**
 * Change the color of the target text element on button click.
 */
function changeProperties(e) {
   // DOM elements
  var _textColor = textChanger.color.value;
  var _textSize  = textChanger.size.value;
  
   // Keep button from trying to navigte.
  // Was causing 404 in console.
   e.preventDefault();
  
  // CSS properties to change in the DOM
  target.style.color    = _textColor;
  target.style.fontSize = _textSize;
}

// event listener
changeButton.addEventListener('click', changeProperties);
