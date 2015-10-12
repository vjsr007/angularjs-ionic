/*!
* utils.js v1.0.0
*
*
* Autor: Víctor J. Sánchez Rivas
* Fecha: 2015-10-09
*/
var utils = {};

(function (self) {
    "use strict";

    /*================================================================
                            IONIC
    ==================================================================*/
    self.mostrarConfirmar = function (params) {
        params.$scope.data = {}

        // An elaborate, custom popup
        var myPopup = params.$ionicPopup.show({
            template: params.template,
            title: params.title,
            subTitle: params.subTitle,
            scope: params.$scope,
            buttons: [
              { text: 'Cancelar' },
              {
                  text: '<b>Aceptar</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      e.preventDefault();

                      if (params.callBack) params.callBack(params.$scope);
                  }
              }
            ]
        });
        myPopup.then(function (res) {
            console.log('Click Aceptar', res);
        });
        if (params.$timeout) {
            params.$timeout(function () {
                myPopup.close();
            }, 3000);
        }
    };

    self.mostrarMensaje = function (params) {
        var alertPopup = params.$ionicPopup.alert({
            title: params.title,
            template: params.template
        });
        alertPopup.then(function (res) {
            if (params.callBack) params.callBack(params.$scope);
        });
    };

    /*================================================================
                            GENERAL
    ==================================================================*/
    self.url2json = function (url, complete) {
        /// <summary>Convierte una URL string a JSON.</summary>
        /// <param name="url" type="String">URL a serializar</param>
        /// <param name="complete" type="bool">URL completa o solo datos</param>
        /// <returns type="Object"></returns>
        var obj = {};

        function arr_vals(arr) {
            if (arr.indexOf(',') > 1) {
                var vals = arr.slice(1, -1).split(',');
                var arr = [];
                for (var i = 0; i < vals.length; i++)
                    arr[i] = vals[i];
                return arr;
            }
            else
                return arr.slice(1, -1);
        }

        function eval_var(avar) {
            if (avar[1].indexOf('[') == 0)
                obj[avar[0]] = arr_vals(avar[1]);
            else
                obj[avar[0]] = avar[1];
        }

        if (url.indexOf('?') > -1 || !complete) {
            if (complete) {
                var params = url.split('?')[1];
            }
            else {
                var params = url;
            }
            if (params.indexOf('&') > 2) {
                var vars = params.split('&');
                for (var i in vars)
                    eval_var(vars[i].split('='));
            }
            else
                eval_var(params.split('='));
        }

        return obj;
    }

    self.CreateTable = function(data, id) {
        /// <summary>Crea table a partir de array object.</summary>
        /// <param name="data" type="Object">Array object a dibujar</param>
        /// <param name="id" type="string">ID tag de la tabla</param>
        /// <returns type="JQuery("table")"></returns>
        cols = self.GetHeaders(data[0]);

        var table = $('<table style="width:100%" id="' + id + '"></table>');
        var th = $('<tr></tr>');
        for (var i = 0; i < cols.length; i++) {
            th.append('<th>' + cols[i] + '</th>');
        }
        table.append(th);

        for (var j = 0; j < data.length; j++) {
            var obj = data[j];
            var tr = $('<tr></tr>');
            for (var k = 0; k < cols.length; k++) {
                var columnName = cols[k];
                tr.append('<td>' + obj[columnName] + '</td>');
            }
            table.append(tr);
        }
        return table;
    }

    self.GetHeaders = function(obj) {
        /// <summary>Obtiene los nombres de las propiedades de un Objeto.</summary>
        /// <param name="obj" type="Object">Objeto</param>
        /// <returns type="Object"></returns>
        var cols = new Array();
        var p = obj;
        for (var key in p) {
            cols.push(key);
        }
        return cols;
    }

    self.download = function (url, data, method, callBack) {
        /// <summary>Descarga un archivo de una URL.</summary>
        /// <param name="url" type="String">URL de la descarga</param>
        /// <param name="data" type="Object">Filtros a enviar</param>
        /// <param name="method" type="String">Metodo POST GET</param>
        /// <param name="callBack" type="Function">Callback que se lanza en evento load de iframe</param>
        /// <returns type="File"></returns>
        var inputs = "";
        var iframeX;
        var downloadInterval;
        var sUsrAg = navigator.userAgent;

        if (url && data) {
            if ($("#iframeX")) $("#iframeX").remove();
            iframeX = $('<iframe name="iframeX" id="iframeX" ></iframe>').appendTo('body').hide();

            iframeX.load(function () {
                if (callBack != null) callBack
            });

            //split params into form inputs
            $.each(data, function (p, val) {
                inputs += "<input type='hidden' name='" + p + "' value='" + val + "' />";
            });

            //create form to send request
            $('<form enctype="multipart/form-data" action="' + url + '" method="' + (method || 'post') + '" target="iframeX" >' + inputs + '</form>')
                .appendTo('body')
                .submit()
                .remove();
        }
    };

    self.formateaFechaJSON = function (Fecha, Formato) {
        /// <summary>Formatea fecha JSON.</summary>
        /// <param name="Fecha" type="Date JSON">Fecha JSON a formatear</param>
        /// <param name="Formato" type="String">Formato ej. dd/mm/yyyy</param>
        var date = new Date(parseInt((Fecha.toString()).replace("/Date(", "").replace(")/", ""), 10));
        return dateFormat(date, Formato);
    }

    self.isDate = function (txtDate) {
        /// <summary>Valida si un texto es fecha.</summary>
        /// <param name="txtDate" type="String">Fecha en texto.</param>
        var currVal = txtDate;
        if (currVal == '')
            return false;


        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var dtArray = currVal.match(rxDatePattern); // is format OK?

        if (dtArray == null)
            return false;

        //mm/dd/yyyy
        dtDay = dtArray[1];
        dtMonth = dtArray[3];
        dtYear = dtArray[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    }

    self.validMoney = function (e, Text) {
        /// <summary>Validar formato de moneda de un texto.</summary>
        /// <param name="e" type="Object">Event</param>
        /// <param name="Text" type="Text">Texto a validar</param>
        /// <returns type="bool"></returns>
        if (((e.which == 46) || (e.which >= 48 && e.which <= 57) || (e.which == 8) || (e.which == 45))) {
            var splitText = Text.val().split(".");
            if (e.which == 46) {
                if (splitText.length > 1) {
                    return false;
                }
            }
            if (e.which == 45) {
                splitText = Text.val().split("-");
                if (Text.val().length > 0) {
                    return false;
                }
                if (splitText.length > 1) {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }

    self.validInt = function (e, Text) {
        /// <summary>Validar tipo entero de un texto.</summary>
        /// <param name="e" type="Object">Event</param>
        /// <param name="Text" type="Text">Texto a validar</param>
        /// <returns type="bool"></returns>
        if ((e.which >= 48 && e.which <= 57) || (e.which == 8)) {
            return true;
        }
        else {
            return false;
        }
    }

    self.keydownHandler = function(e) {

        var key = e.which || e.keyCode;

        if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers   
            key >= 48 && key <= 57 ||
            // Numeric keypad
            key >= 96 && key <= 105 ||
            // Backspace and Tab and Enter
            key == 8 || key == 9 || key == 13 ||
            // Home and End
            key == 35 || key == 36 ||
            // left and right arrows
            key == 37 || key == 39 ||
            // Del and Ins
            key == 46 || key == 45)
            return true;

        return false;
    }

    /*================================================================
                            PROTOTIPOS
    ==================================================================*/

    Number.prototype.formatMoney = function (c, d, t) {
        /// <summary>Aplica formatode moneda a un numero.</summary>
        /// <param name="c" type="Number">Numero a formatear</param>
        /// <param name="d" type="String">Caracter decimal</param>
        /// <param name="t" type="String">Caracter de miles</param>
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    Date.prototype.format = function (mask, utc) {
        /// <summary>Formatea variable Date.</summary>
        /// <param name="mask" type="String">mask o formato</param>
        /// <param name="utc" type="String">aplicar UTC date</param>
        dateFormat.masks = {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        dateFormat.i18n = {
            dayNames: [
                "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab",
                "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
            ],
            monthNames: [
                "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ]
        };

        var dateFormat = function () {
            var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) val = "0" + val;
                    return val;
                };

            return function (date, mask, utc) {
                var dF = dateFormat;

                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }


                date = date ? new Date(date) : new Date;
                try {
                    if (isNaN(date)) throw SyntaxError("invalid date");
                }
                catch (e) {

                }

                mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                var _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    m = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    M = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d: d,
                        dd: pad(d),
                        ddd: dF.i18n.dayNames[D],
                        dddd: dF.i18n.dayNames[D + 7],
                        m: m + 1,
                        mm: pad(m + 1),
                        mmm: dF.i18n.monthNames[m],
                        mmmm: dF.i18n.monthNames[m + 12],
                        yy: String(y).slice(2),
                        yyyy: y,
                        h: H % 12 || 12,
                        hh: pad(H % 12 || 12),
                        H: H,
                        HH: pad(H),
                        M: M,
                        MM: pad(M),
                        s: s,
                        ss: pad(s),
                        l: pad(L, 3),
                        L: pad(L > 99 ? Math.round(L / 10) : L),
                        t: H < 12 ? "a" : "p",
                        tt: H < 12 ? "am" : "pm",
                        T: H < 12 ? "A" : "P",
                        TT: H < 12 ? "AM" : "PM",
                        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

                return mask.replace(token, function ($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            };
        }();

        return dateFormat(this, mask, utc);
    };

    Number.prototype.round = function (decimales) {/// <summary>Redondea el numero a la cantidad de decimales especificados</summary>
        places = Math.pow(10, places);
        return Math.round(this * decimales) / decimales;
    };

    String.prototype.removeAll = function (text) {/// <summary>Elimina todas las apariciones y devuelve el texto generado</summary>
        return this.split(text).join("");
    }

    String.prototype.replaceAll = function (value, replacement) {/// <summary>Reemplaza todas las apariciones y devuelve el texto generado</summary>
        return this.split(value).join(replacement);
    }

    Date.prototype.toIsoDate = function () {/// <summary>Convierte a texto con el formato ISO yyyy-MM-dd donde yyyy es el año, MM es el nómero del mes y dd es el dia del mes</summary>
        return this.toISOString().substring(0, 10);
    };

    String.prototype.coalesce = function () {/// <summary>Si el valor actual es nulo, vacío o solo consiste por espacios en blanco, devuelve algun parámetro en orden que no sea nulo, vacío ni que consista solo por espacios en blanco</summary>

        if (EsNuloVacioEspaciosBlanco(this)) {
            for (var i = 0, max = arguments.length; i < max; i++) {
                if (!EsNuloVacioEspaciosBlanco(arguments[i])) {
                    return arguments[i];
                }
            }
        }
        return this;

        function EsNuloVacioEspaciosBlanco(texto) {
            return texto == null || texto.trim && texto.trim() == "" || texto.toString().trim() == "";
        }
    };

    String.prototype.format = function () {
        var argsFormat = arguments;
        function replace(match, number) {
            return typeof argsFormat[number] != 'undefined' ? argsFormat[number] : match;
        }
        return this.replace(/{(\d+)}/g, replace);
    };

    /*================================================================
                            PLUGIN JQUERY
    ==================================================================*/

    jQuery.fn.forceInteger = function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;
            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers   
                key >= 48 && key <= 57 ||
                // Numeric keypad
                key >= 96 && key <= 105 ||
                // Backspace and Tab and Enter
                key == 8 || key == 9 || key == 13 ||
                // Home and End
                key == 35 || key == 36 ||
                // left and right arrows
                key == 37 || key == 39 ||
                // Del and Ins
                key == 46 || key == 45)
                return true;

            return false;
        });
        //});
    }

    jQuery.fn.styleTable = function (options) {
        //<summary> Aplica estilos a tabla dinamica</summary>
        var defaults = {
            css: 'styleTable'
        };
        options = $.extend(defaults, options);

        return this.each(function () {

            var input = $(this);
            input.addClass(options.css);

            input.find("tr").bind('mouseover mouseout', function (event) {
                if (event.type == 'mouseover') {
                    $(this).children("td").addClass("ui-state-hover").css("cursor", "pointer");
                } else {
                    $(this).children("td").removeClass("ui-state-hover");
                }
            })

            input.find("th").addClass("ui-state-default");
            input.find("td").addClass("ui-widget-content");

            input.find("tr").each(function () {
                $(this).children("td:not(:first)").addClass("first");
                $(this).children("th:not(:first)").addClass("first");
            });
        });
    };

    $.fn.aplicarMoneda = function (options) {
        //<summary> Aplica estilos de moneda a input[type="text"]</summary>
        var defaults = {
            css: 'moneda'
        };

        options = $.extend(defaults, options);

        var controls = this;
        controls.each(function () {
            var input = $(this).filter('input[type="text"]');
            var isFocused = input.is(":focus");

            input.unbind('blur');

            input.bind('blur', function () {
                if ($(this).val() != null && $(this).val() != "" && $.isNumeric($(this).val()))
                    $(this).val(parseFloat($(this).val()).formatMoney(2, '.', ','));
            });
            input.bind('focus', function () {
                if ($(this).val() != null && $(this).val() != "")
                    $(this).val($(this).val().replace(/,/g, ""));
            });
            if (input.val() != null && input.val() != "" && !isFocused && $.isNumeric(input.val())) {
                input.val(parseFloat(input.val()).formatMoney(2, '.', ','));
            }
            input.attr('maxlength', '15');
            input.css('text-align', 'right');

            input.keypress(function (e) { return validMoney(e, $(this)); });

            input.data("value", input.val());

            setInterval(function () {
                var isFocused = input.is(":focus");
                var data = input.data("value"),
                    val = input.val();

                if (data !== val && !isFocused) {
                    if (input.val() != null && input.val() != "" && $.isNumeric(val)) {
                        input.val(parseFloat(input.val()).formatMoney(2, '.', ','));
                    }
                    input.data("value", val);
                }
            }, 100);
        });

        function validMoney(e, Text) {
            //<summary> Valida inputs solo numeros decimales</summary>
            if (((e.which == 46) || (e.which >= 48 && e.which <= 57) || (e.which == 8) || (e.which == 45))) {
                var splitText = Text.val().split(".");
                if (e.which == 46) {
                    if (splitText.length > 1) {
                        return false;
                    }
                }
                if (e.which == 45) {
                    splitText = Text.val().split("-");
                    if (Text.val().length > 0) {
                        return false;
                    }
                    if (splitText.length > 1) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }

        return controls
    };
    
    $.fn.removerMoneda = function (options) {
        //<summary> Remueve estilo de moneda a input[type="text"]</summary>
        var defaults = {
            css: 'moneda'
        };

        options = $.extend(defaults, options);

        var controls = this;
        controls.each(function () {
            var input = $(this).filter('input[type="text"]');
            var isFocused = input.is(":focus");

            if (input.val() != null && input.val() != "" && !isFocused) {
                input.val(input.val().replace(/,/g, ""));
            }
        });

        return controls
    };

})(utils);
