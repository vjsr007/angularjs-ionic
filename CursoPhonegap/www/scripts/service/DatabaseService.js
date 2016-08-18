app.Angular.service('DatabaseService', function ($ionicPopup)  {
    "use strict";

    var self = this;

    var Entities = [
        {
            name: 'User',
            fields: {
                UserName: "TEXT",
                Name: "TEXT",
                Active: "BOOL",
            }
        }
    ];

    this.openDatabase = function () {
        if (window.openDatabase) {
            persistence.store.websql.config(persistence, "cursophonegap", 'database', 5 * 1024 * 1024);
        } else {
            persistence.store.memory.config(persistence);
        }
    }

    this.schemaSync = function () {
        persistence.schemaSync();
    }

    this.addRow = function (data) {
        persistence.add(data);

        persistence.flush(null, function () {
            var params = {
                $scope: this,
                $ionicPopup: $ionicPopup,
                title: "DatabaseService",
                template: "<label>Sucess!!!</label>",
                //callBack: function () {
                //    alert("OK")
                //}
            }

            utils.mostrarMensaje(params);
        });
    }

    this.defineEntities = function (Entities) {
        Entities.forEach(function (entity) {
            self[entity.name] = persistence.define(entity.name, entity.fields);
        });

        persistence.schemaSync();
    }

    this.resetDatabase = function () {
        persistence.reset();
        persistence.schemaSync();
    }

    this.load = function () {
        this.openDatabase();

        this.defineEntities(Entities);
    }

});