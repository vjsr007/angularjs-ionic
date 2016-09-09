angular.registerService('Firebase3Service', function ($q, DatabaseService, Msg) {
    "use strict";

    var self = this;
    var config = {
        apiKey: "AIzaSyB6JJOocfwEkSE47u68AYcH2jXt_Bg4GAs",
        authDomain: "mandaditoshop.firebaseapp.com",
        databaseURL: "https://mandaditoshop.firebaseio.com",
        storageBucket: "mandaditoshop.appspot.com",
    };

    this.user = {};

    this.load = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        try {
            if (firebase.apps.length == 0)
                firebase.initializeApp(config);

            self.onAuthStateChanged();

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
        var email = 'vjsanchezr@hotmail.com';
        var password = 'vj007...';
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

    this.upload = function (entidad, postData, uid) {
        var database = firebase.database();
        var userId = firebase.auth().currentUser.uid;

        var ref = (uid != null ? database.ref().child(userId + '/' + entidad + '/' + uid) : database.ref().child(userId + '/' + entidad));

        ref.set(postData);
    }

    this.download = function (entidad) {
        var database = firebase.database();
        var userId = firebase.auth().currentUser.uid;
        var ref = database.ref().child(userId + '/' + entidad)

        ref.on('value', function (snapshot) {
            console.log(snapshot.val());
        });
    }

    this.onAuthStateChanged = function () { 
        firebase.auth().onAuthStateChanged(function (user) {
            // [START_EXCLUDE silent]
            // [END_EXCLUDE]
            if (user) {

                self.user = user;
                // User is signed in.
                //var displayName = user.displayName;
                //var email = user.email;
                //var emailVerified = user.emailVerified;
                //var photoURL = user.photoURL;
                //var isAnonymous = user.isAnonymous;
                //var uid = user.uid;
                //var providerData = user.providerData;
            }
        });
    }

});