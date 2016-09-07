angular.registerService('DatabaseService', function ($q, Msg) {
    "use strict";

    var self = this;

    var n = 10;

    var config = {
        apiKey: "AIzaSyB6JJOocfwEkSE47u68AYcH2jXt_Bg4GAs",
        authDomain: "mandaditoshop.firebaseapp.com",
        databaseURL: "https://mandaditoshop.firebaseio.com",
        storageBucket: "mandaditoshop.appspot.com",
    };

    this.Entities = [
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
                FechaCreacion: "REAL",
                FUM: "REAL"
            }
        },
        {
            name: 'Configuracion',
            fields: {
                TopRows: "INTEGER",
            }
        }
    ];

    this.openDatabase = function () {
        var defered = $q.defer();
        var promise = defered.promise;


        if (window.openDatabase) {
            persistence.store.websql.config(persistence, "MandaditoShop", 'database', 5 * 1024 * 1024);
        } else {
            persistence.store.memory.config(persistence);
        }

        defered.resolve();

        return promise;

    }

    this.schemaSync = function () {
        persistence.schemaSync();
    }

    this.saveRow = function (data, callBack) {
        persistence.add(data);

        persistence.flush(null, function () {
            var getType = {};
            if (getType.toString.call(callBack) == '[object Function]') callBack();
        });
    }

    this.removeRow = function (data, callBack) {
        persistence.remove(data);

        persistence.flush(null, function () {
            var getType = {};
            if (getType.toString.call(callBack) == '[object Function]') callBack();
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
        var defered = $q.defer();
        var promise = defered.promise;


        var objects = new Array;
        entity
            .all()
            .list(null, function (results) {
                results.forEach(function (t) {
                    var object = new Object;
                    var getType = {};
                    for (var name in t) {
                        if (t.hasOwnProperty(name)) {
                            var tipo = getType.toString.call(t[name]);
                            if (tipo != '[object Function]' && tipo!='[object Object]') {
                                object[name] = t[name] == null ? "": t[name].toString(); 
                            }                            
                        }
                    }

                    objects.push(object);
                })

                defered.resolve(objects);
            });

        return promise;


    }

    this.getById = function (entity, value, callBack) {
        entity
            .all()
            .filter("id", '=', value)
            .one(null, callBack);
    }

    this.getList = function (entity, property, value) {
        var objects = new Array;

        entity
            .all()
            .filter(property, 'like', '%' + value + '%')
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
        var defered = $q.defer();
        var promise = defered.promise;


        self.openDatabase().then(function () {
            self.defineEntities(self.Entities);

            self.initCfg();
        });

        defered.resolve();

        return promise;

    }

    this.initCfg = function () {
        var entity = this.Configuracion;
        entity
            .all()
            .one(null,
                function (cfg) {
                    if (!cfg) cfg = new entity();

                    cfg.TopRows = 10;

                    persistence.add(cfg);

                    persistence.flush();
                }
            );
    }

});