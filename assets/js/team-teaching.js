// resources:
// https://www.w3schools.com/js/js_object_prototypes.asp
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

/******************************************************************************
 * Aliens Object
 * Not strictly JSON, but you can use JSON if you want. Just parse your JSON
 * before using it to get it to this state: JSON.parse(text);
 *****************************************************************************/
var aliens = {

    et : {
        species: 'E.T.',
        origin: 'unknown',
        discovered: 'Earth',
        isHazardous: false,
        biology: {
            blood: 'white',
            skeleton: 'endoskeleton'
        },
        weapons: [],
        message: 'wants to go home.'
    },

    predator : {
        species: 'Predator',
        origin: 'unknown',
        discovered: 'Earth',
        isHazardous: true,
        biology: {
            blood: 'green',
            skeleton: 'endoskeleton'
        },
        weapons: ['shoulder-mounted cannon', 'retractable blades'],
        message: 'will remove your spine!'
    },

    xenomorph : {
        species: 'Xenomorph',
        origin: 'unknown',
        discovered: 'LV-426',
        isHazardous: true,
        biology: {
            blood: 'acid',
            skeleton: 'exoskeleton'
        },
        weapons: ['claws', 'proboscis', 'tail', 'acidic blood'],
        message: 'will punch through your skull!'
    }

};

/******************************************************************************
 * Alien Constructor Function
 *****************************************************************************/
function Alien(options) {
    // Scope-safe check. Makes sure all instances of "Alien" are called with
    // the "new" keyword.
    if(!(this instanceof Alien)) {
        return new Alien(options);
    }

    // Loop through properties of "options" object and assign them to "this."
    // Same as if each property was mapped individually.
    // E.g.: this.make  = options.make;
    //       this.model = options.model;
    //       etc.
    for(var property in options) {
        if(options.hasOwnProperty(property)) {
            // Doesn't work with dot-notation (this.property). Don't know why.?.?
            this[property] = options[property];
        }
    }
}

/******************************************************************************
 * GET ARMAMENTS
 * Logs a list of the alien's weapons.
 *****************************************************************************/
Alien.prototype.getArmaments = function() {
    let _returnStatement = '';

    if (this.weapons === undefined || this.weapons.length === 0) {
        _returnStatement += this.species + ' is a peaceful creature. '
                          + this.species + ' just ' + this.message;
        return _returnStatement;
    } else {
        _returnStatement += this.species + ' is equipped with:\n\n';

        for (var i = 0; i < this.weapons.length; i++) {
            _returnStatement += ' - ' + this.weapons[i] + '\n';
        }
        _returnStatement += '\n' + this.species + ' ' + this.message;
        return _returnStatement;
    }
}

/******************************************************************************
 * GET INFO
 * Get a pre-scripted message about the alien.
 *****************************************************************************/
Alien.prototype.getInfo = function() {
    if (this.isHazardous) {
        return 'WARNING!!! ' + this.species + ' is HAZARDOUS!!! KEEP AWAY!!!';
    } else {
        return this.species + ' is friendly. Go ahead and pet the little fella!';
    }
}

/******************************************************************************
 * GET PROPERTY
 * Prompts the user for a requested property and returns that property.
 * @return {String} [description]
 *****************************************************************************/
Alien.prototype.getProperty = function() {
    let _query = prompt();
    return this[_query];
}

/******************************************************************************
 * SET PROPERTY
 * Prompts the user for a key/value pair to add to the object's properties.
 *****************************************************************************/
Alien.prototype.setProperty = function() {
    let _key = prompt('Property key: ');
    let _value = prompt('Property value: ');
    this[_key] = _value;
}

/******************************************************************************
 * New instances of 'Alien'
 *****************************************************************************/
var et        = new Alien(aliens.et);
var predator  = new Alien(aliens.predator);
var xenomorph = new Alien(aliens.xenomorph);

/******************************************************************************
 * INITIALIZER
 * Do all the things.
 *****************************************************************************/
// (function init() {
//     xenomorph.getInfo();
// })();
