angular.registerService('DatabaseService', function ($ionicPopup, Msg) {
    "use strict";

    var self = this;

    var Entities = [
        {
            name: 'Articulo',
            fields: {
                Codigo: "TEXT",
                Articulo: "TEXT",
                Departamento: "TEXT",
                Categoria: "TEXT",
                Marca: "TEXT",
                Precio: "REAL",
                Img: "BLOB",
                Active: "BOOL",
            }
        }
    ];

    this.openDatabase = function () {
        if (window.openDatabase) {
            persistence.store.websql.config(persistence, "MandaditoShop", 'database', 5 * 1024 * 1024);
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
            Msg.mostrarMensaje("Sucess!!!");
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

    this.jsonAll = function (entity) {
        var objects = new Array;
        entity
            .all()
            .list(null, function (results) {
                results.forEach(function (t) {
                    var object = new Object;
                    var getType = {};
                    for (var name in t) {
                        if (t.hasOwnProperty(name)) {
                            object[name] = getType.toString.call(t[name]) == '[object Function]' ? (t[name])() : t[name]
                        }
                    }

                    objects.push(object);
                })
            });

        return objects
    }

    this.load = function () {
        this.openDatabase();

        this.defineEntities(Entities);
    }

});