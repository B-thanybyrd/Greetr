(function(global,$){

    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    }

// hidden within the scope of the IIFE and never directly accessible

    var supportedLangs = ['en', 'es', 'pl'];

    // informal greeting
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        pl: 'Ellohay'
    };

    // formal greeting
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        pl: 'Eetingsgray'
    };

    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        pl: 'Oggedlay Inay'
    };

    // The prototype

    Greetr.prototype = {
        fullName: function() {

            console.log(this.language);
            if (this.language === 'pl') {
                function pigLatin(str) {
                    // Convert string to lowercase
                    str = str.toLowerCase()
                    // Initialize array of vowels
                    const vowels = ["a", "e", "i", "o", "u"];
                    // Initialize vowel index to 0
                    let vowelIndex = 0;
                  
                    if (vowels.includes(str[0])) {
                      // If first letter is a vowel
                      return str + "way";
                    } else {
                      // If the first letter isn't a vowel i.e is a consonant
                      for (let char of str) {
                        // Loop through until the first vowel is found
                        if (vowels.includes(char)) {
                          // Store the index at which the first vowel exists
                          vowelIndex = str.indexOf(char);
                          break;
                        }
                      }
                      // First char to uppercase
                      var up = str.slice(vowelIndex).charAt(0).toUpperCase() + str.slice(vowelIndex).slice(1);
                      
                      // Compose final string
                      return up + str.slice(0, vowelIndex) + "ay";
                    }
                  }
            return pigLatin(this.firstName) + ' ' + pigLatin(this.lastName);

            } else {
            return this.firstName + ' ' + this.lastName;
            }
        },

        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
        },

        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        greet: function(formal) {
            var msg;

            //if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                 msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable

            return this;

        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            return this;
        },

        setLang: function(lang) {
            
            this.language = lang;
            this.validate();
            return this;

        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);
            
            return this;
        }
    };

    // the actual object is created here, allowing us to 'new' an object without calling 'new'

    Greetr.init = function(firstname, lastname, language) {
            
            var self = this;
            self.language = language || 'en';
            self.firstName = firstname || '';
            self.lastName = lastname || '';   

            self.validate();

    }

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G'
    global.Greetr = global.G$ = Greetr;

}(window,$));