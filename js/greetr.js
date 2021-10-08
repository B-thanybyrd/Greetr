(function(global,$){

    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    }

// hidden within the scope of the IIFE and never directly accessible

    var supportedLangs = ['en', 'es'];

    // informal greeting
    var greetings = {
        en: 'Hello',
        es: 'Hola',
    };

    // formal greeting
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
    };

    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
    };

    // The prototype

    Greetr.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
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