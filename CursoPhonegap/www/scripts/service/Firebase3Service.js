angular.registerService('Firebase3Service', function ($q, DatabaseService, Msg) {
    "use strict";

    var self = this;

    var config = {
        apiKey: "222",
        authDomain: "f.firebaseapp.com",
        databaseURL: "https://f.firebaseio.com",
        storageBucket: "f.appspot.com",
    };


    this.load = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        try {
            firebase.initializeApp(config);

            self.login();

            defered.resolve();
        }
        catch (e) {
            Msg.mostrarMensaje(e);

            defered.reject();
        }

        return promise;
    }

    this.login = function() {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        } else {

            if (email.length < 4) {
                Msg.mostrarMensaje('Please enter an email address.');
                return;
            }
            if (password.length < 4) {
                Msg.mostrarMensaje('Please enter a password.');
                return;
            }
            // Sign in with email and pass.
            // [START authwithemail]
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    Msg.mostrarMensaje('Wrong password.');
                } else {
                    Msg.mostrarMensaje(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
            // [END authwithemail]
        }
    }

    this.add= function(entidad, postData){
        var database = firebase.database();

        database.ref().child(entidad).set(postData)
    }

});