function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function mostrarCalendario() {
        picker.showDatePickerDialog({
            value: new Date(),
            callback: function(e) {
                if (e.cancel) Ti.API.info("user canceled dialog"); else {
                    Ti.API.info("value is: " + e.value);
                    Ti.API.info("lets see what this object is" + JSON.stringify(e));
                    selectedDate = e.value;
                    $.fecha.value = String.formatDate(selectedDate, "medium");
                }
            }
        });
    }
    function mostrarReloj() {
        var horaP = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_TIME
        });
        horaP.showTimePickerDialog({
            value: new Date(),
            callback: function(e) {
                if (e.cancel) Ti.API.info("user canceled dialog"); else {
                    Ti.API.info("value is: " + e.value);
                    Ti.API.info("lets see what this object is" + JSON.stringify(e));
                    selectedTime = e.value;
                    $.hora.value = String.formatTime(selectedTime, "medium");
                }
            }
        });
    }
    function dialogoLugar() {
        var aview = Ti.UI.createView({
            height: "400"
        });
        var tablaLugares = Ti.UI.createTableView({
            top: "15%",
            height: "500"
        });
        var texto = Ti.UI.createTextField({
            width: "80%",
            top: "3%",
            hintText: "Buscar"
        });
        var lugaresDialog = Ti.UI.createOptionDialog({
            title: "Ubicación",
            androidView: aview,
            cancel: 2,
            selectedIndex: 2,
            destructive: 0,
            buttonNames: [ "Aceptar", "Cancelar" ]
        });
        var lock = 0;
        texto.addEventListener("change", function() {
            if (0 == lock) {
                lock = 1;
                xhr = Titanium.Network.createHTTPClient();
                var query = texto.value;
                xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&components=country:CL");
                xhr.onload = function() {
                    lock = 0;
                    var json = JSON.parse(this.responseText);
                    tablaLugares.setData([]);
                    Ti.API.info("Nueva Repuesta");
                    for (var i = 0; json.results.length > i; i++) {
                        Ti.API.info("response: " + JSON.stringify(json.results[i].formatted_address));
                        var view = Ti.UI.createView({
                            height: "40"
                        });
                        var row = Ti.UI.createTableViewRow({});
                        var label = Ti.UI.createLabel({
                            text: json.results[i].formatted_address.toString(),
                            left: "5%",
                            color: "#fff",
                            lat: json.results[i].geometry.location.lat.toString(),
                            lon: json.results[i].geometry.location.lng.toString()
                        });
                        row.addEventListener("click", function() {
                            $.lugar.value = label.text;
                            $.lugar.lat = label.lat;
                            $.lugar.lon = label.lon;
                            lugaresDialog.hide();
                        });
                        view.add(label);
                        row.add(view);
                        tablaLugares.appendRow(row);
                    }
                };
                xhr.send();
            }
        });
        aview.add(texto);
        aview.add(tablaLugares);
        lugaresDialog.show();
    }
    function selectMensaje() {
        var aview = Ti.UI.createView({
            height: "400"
        });
        var tablaMensajes = Ti.UI.createTableView({
            height: "400"
        });
        var mensajeDialog = Ti.UI.createOptionDialog({
            title: "Mensajes Predet.",
            androidView: aview,
            cancel: 2,
            selectedIndex: 2,
            destructive: 0,
            buttonNames: [ "Aceptar", "Cancelar" ]
        });
        data = [];
        var mensajes = Alloy.createCollection("mensaje");
        mensajes.fetch();
        mensajes.each(function(mensaje) {
            var view = Ti.UI.createView({
                height: "40"
            });
            var row = Ti.UI.createTableViewRow({
                height: "40"
            });
            var label = Ti.UI.createLabel({
                value: mensaje.get("titulo"),
                left: "5%",
                color: "#fff",
                height: "30"
            });
            row.addEventListener("click", function() {
                $.mensaje.value = mensaje.get("titulo");
                $.mensaje.mensaje_text = mensaje.get("mensaje");
                mensajeDialog.hide();
            });
            view.add(label);
            row.add(view);
            data.push(row);
        });
        aview.add(tablaMensajes);
        tablaMensajes.setData(data);
        mensajeDialog.show();
    }
    function selectLista() {
        var viewContactos = Ti.UI.createView({
            height: "50%"
        });
        var tablaContactos = Ti.UI.createTableView({
            height: "50%"
        });
        var contactosDialog = Ti.UI.createOptionDialog({
            title: "Mensajes Predet.",
            cancel: 2,
            selectedIndex: 2,
            androidView: viewContactos,
            destructive: 0,
            buttonNames: [ "Aceptar", "Cancelar" ]
        });
        data = [];
        var listas = Alloy.createCollection("lista");
        listas.fetch();
        var lista_contactos = Alloy.createCollection("lista_contacto");
        lista_contactos.fetch();
        listas.each(function(lista) {
            var row = Ti.UI.createTableViewRow({
                height: "40"
            });
            var view = Ti.UI.createView({
                height: "40"
            });
            var label = Ti.UI.createLabel({
                value: lista.get("titulo"),
                color: "#fff",
                height: "30"
            });
            view.add(label);
            row.add(view);
            row.addEventListener("click", function() {
                $.destino.value = lista.get("titulo");
                var emails = [];
                lista_contactos.each(function(lista_contacto) {
                    lista_contacto.get("id") == lista.get("id") && emails.push(lista_contacto.get("email"));
                });
                $.destino.emails = emails;
                contactosDialog.hide();
            });
            data.push(row);
        });
        tablaContactos.setData(data);
        viewContactos.add(tablaContactos);
        contactosDialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "principal";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#f3fafc",
        id: "win"
    });
    $.__views.fecha = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        top: "5%",
        left: "5%",
        width: "65%",
        height: "10%",
        id: "fecha",
        editable: "false",
        hintText: "Fecha"
    });
    $.__views.win.add($.__views.fecha);
    mostrarCalendario ? $.__views.fecha.addEventListener("click", mostrarCalendario) : __defers["$.__views.fecha!click!mostrarCalendario"] = true;
    $.__views.calendarIcon = Ti.UI.createButton({
        top: "5%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/calendar-icon.png",
        id: "calendarIcon"
    });
    $.__views.win.add($.__views.calendarIcon);
    mostrarCalendario ? $.__views.calendarIcon.addEventListener("click", mostrarCalendario) : __defers["$.__views.calendarIcon!click!mostrarCalendario"] = true;
    $.__views.hora = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        top: "18%",
        left: "5%",
        width: "65%",
        height: "10%",
        id: "hora",
        editable: "false",
        hintText: "Hora"
    });
    $.__views.win.add($.__views.hora);
    mostrarReloj ? $.__views.hora.addEventListener("click", mostrarReloj) : __defers["$.__views.hora!click!mostrarReloj"] = true;
    mostrarReloj ? $.__views.hora.addEventListener("focus", mostrarReloj) : __defers["$.__views.hora!focus!mostrarReloj"] = true;
    $.__views.clockIcon = Ti.UI.createButton({
        top: "18%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/clock-icon.png",
        id: "clockIcon"
    });
    $.__views.win.add($.__views.clockIcon);
    mostrarReloj ? $.__views.clockIcon.addEventListener("click", mostrarReloj) : __defers["$.__views.clockIcon!click!mostrarReloj"] = true;
    mostrarReloj ? $.__views.clockIcon.addEventListener("focus", mostrarReloj) : __defers["$.__views.clockIcon!focus!mostrarReloj"] = true;
    $.__views.mensaje = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        left: "5%",
        top: "31%",
        width: "65%",
        height: "10%",
        id: "mensaje",
        editable: "false",
        hintText: "Mensaje"
    });
    $.__views.win.add($.__views.mensaje);
    selectMensaje ? $.__views.mensaje.addEventListener("click", selectMensaje) : __defers["$.__views.mensaje!click!selectMensaje"] = true;
    selectMensaje ? $.__views.mensaje.addEventListener("focus", selectMensaje) : __defers["$.__views.mensaje!focus!selectMensaje"] = true;
    $.__views.mensajeIcon = Ti.UI.createButton({
        top: "31%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/email-icon.png",
        id: "mensajeIcon"
    });
    $.__views.win.add($.__views.mensajeIcon);
    selectMensaje ? $.__views.mensajeIcon.addEventListener("click", selectMensaje) : __defers["$.__views.mensajeIcon!click!selectMensaje"] = true;
    $.__views.destino = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        left: "5%",
        width: "65%",
        top: "44%",
        height: "10%",
        id: "destino",
        editable: "false",
        hintText: "Contactos"
    });
    $.__views.win.add($.__views.destino);
    selectLista ? $.__views.destino.addEventListener("click", selectLista) : __defers["$.__views.destino!click!selectLista"] = true;
    selectLista ? $.__views.destino.addEventListener("focus", selectLista) : __defers["$.__views.destino!focus!selectLista"] = true;
    $.__views.destinoIcon = Ti.UI.createButton({
        right: "10%",
        height: "10%",
        width: "12%",
        top: "44%",
        backgroundImage: "/contacts-icon.png",
        id: "destinoIcon"
    });
    $.__views.win.add($.__views.destinoIcon);
    selectLista ? $.__views.destinoIcon.addEventListener("click", selectLista) : __defers["$.__views.destinoIcon!click!selectLista"] = true;
    $.__views.lugar = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        top: "57%",
        left: "5%",
        width: "65%",
        height: "10%",
        id: "lugar",
        editable: "false",
        hintText: "Ubicación"
    });
    $.__views.win.add($.__views.lugar);
    dialogoLugar ? $.__views.lugar.addEventListener("click", dialogoLugar) : __defers["$.__views.lugar!click!dialogoLugar"] = true;
    dialogoLugar ? $.__views.lugar.addEventListener("focus", dialogoLugar) : __defers["$.__views.lugar!focus!dialogoLugar"] = true;
    $.__views.lugarIcon = Ti.UI.createButton({
        top: "57%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/compass-icon.png",
        id: "lugarIcon"
    });
    $.__views.win.add($.__views.lugarIcon);
    dialogoLugar ? $.__views.lugarIcon.addEventListener("click", dialogoLugar) : __defers["$.__views.lugarIcon!click!dialogoLugar"] = true;
    $.__views.enviar = Ti.UI.createButton({
        bottom: "5%",
        borderRadius: 5,
        backgroundColor: "#079fbb",
        width: "30%",
        height: "12%",
        title: "Enviar",
        id: "enviar"
    });
    $.__views.win.add($.__views.enviar);
    $.__views.principal = Ti.UI.createTab({
        window: $.__views.win,
        title: "Principal",
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_ADJUST_PAN,
        id: "principal"
    });
    $.__views.principal && $.addTopLevelView($.__views.principal);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.principal.open();
    var picker = Ti.UI.createPicker({});
    $.enviar.addEventListener("click", function() {
        var aview = Ti.UI.createView({
            height: "400"
        });
        var texto = Ti.UI.createTextField({
            width: "80%",
            top: "3%",
            hintText: "Escriba un correo valido"
        });
        aview.add(texto);
        var correoDialog = Ti.UI.createOptionDialog({
            title: "Correo",
            androidView: aview,
            cancel: 2,
            selectedIndex: 2,
            destructive: 0,
            buttonNames: [ "Aceptar", "Cancelar" ]
        });
        correoDialog.addEventListener("click", function(e) {
            if (0 == e.index) if ("" != texto.value) {
                var patt = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (patt.test(texto.value)) {
                    var config = Alloy.createModel("config", {
                        email: texto.value
                    });
                    config.save();
                } else {
                    alert("Correo no valido!");
                    texto.value = "";
                }
            } else alert("no se ingreso ningun correo!");
            correoDialog.hide();
        });
        var configs = Alloy.createCollection("config");
        configs.fetch();
        var configurado = false;
        var email = "";
        configs.each(function(config) {
            configurado = true;
            email = config.get("email");
        });
        if ("" != $.mensaje.value) if ("" != $.destino.value) if (configurado) {
            var sendgrid = require("tisendgrid")("kokeloker", "74d3f6a2");
            var email_to_address = $.destino.emails;
            var email_from_address = email;
            var email_subject = $.mensaje.value;
            var email_map_url = "https://www.google.cl/maps/@" + $.lugar.lat + "," + $.lugar.lon + ",15z";
            "http://maps.googleapis.com/maps/api/staticmap?center=" + $.lugar.lat + "," + $.lugar.lon + "&zoom=15&size=300x300&sensor=false";
            var email_message_text = $.mensaje.mensaje_text + "\n\n" + "El día " + $.fecha.value + " a las " + $.hora.value + ", en\n\n" + $.lugar.value + "\n\n" + email_map_url;
            var email = {
                to: email_to_address,
                from: email_from_address,
                subject: email_subject,
                text: email_message_text
            };
            var message = sendgrid.Email(email);
            var viewIndicator = Ti.UI.createView({
                height: Ti.UI.SIZE
            });
            var activityIndicator = Ti.UI.createActivityIndicator({
                color: "white",
                font: {
                    fontFamily: "Helvetica Neue",
                    fontSize: 26,
                    fontWeight: "bold"
                },
                message: "Enviando...",
                style: Ti.UI.ActivityIndicatorStyle.BIG,
                top: 10,
                left: 10,
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE
            });
            viewIndicator.add(activityIndicator);
            var enviandoDialog = Ti.UI.createOptionDialog({
                title: "Enviando...",
                androidView: viewIndicator,
                destructive: 0,
                height: Ti.UI.SIZE
            });
            viewIndicator.addEventListener("open", function() {
                activityIndicator.show();
            });
            activityIndicator.show();
            enviandoDialog.show();
            sendgrid.send(message, function(e) {
                enviandoDialog.hide();
                if (e) {
                    console.log(JSON.stringify(e));
                    alert(e.errors[0]);
                } else {
                    alert("¡Mensaje enviado exitosamente!");
                    $.fecha.value = "";
                    $.hora.value = "";
                    $.mensaje.value = "";
                    $.destino = "";
                    $.lugar = "";
                }
            });
        } else {
            alert("No ha sido configurado");
            correoDialog.show();
        } else alert("Seleccionar destinatarios"); else alert("Seleccionar mensaje a enviar");
    });
    __defers["$.__views.fecha!click!mostrarCalendario"] && $.__views.fecha.addEventListener("click", mostrarCalendario);
    __defers["$.__views.calendarIcon!click!mostrarCalendario"] && $.__views.calendarIcon.addEventListener("click", mostrarCalendario);
    __defers["$.__views.hora!click!mostrarReloj"] && $.__views.hora.addEventListener("click", mostrarReloj);
    __defers["$.__views.hora!focus!mostrarReloj"] && $.__views.hora.addEventListener("focus", mostrarReloj);
    __defers["$.__views.clockIcon!click!mostrarReloj"] && $.__views.clockIcon.addEventListener("click", mostrarReloj);
    __defers["$.__views.clockIcon!focus!mostrarReloj"] && $.__views.clockIcon.addEventListener("focus", mostrarReloj);
    __defers["$.__views.mensaje!click!selectMensaje"] && $.__views.mensaje.addEventListener("click", selectMensaje);
    __defers["$.__views.mensaje!focus!selectMensaje"] && $.__views.mensaje.addEventListener("focus", selectMensaje);
    __defers["$.__views.mensajeIcon!click!selectMensaje"] && $.__views.mensajeIcon.addEventListener("click", selectMensaje);
    __defers["$.__views.destino!click!selectLista"] && $.__views.destino.addEventListener("click", selectLista);
    __defers["$.__views.destino!focus!selectLista"] && $.__views.destino.addEventListener("focus", selectLista);
    __defers["$.__views.destinoIcon!click!selectLista"] && $.__views.destinoIcon.addEventListener("click", selectLista);
    __defers["$.__views.lugar!click!dialogoLugar"] && $.__views.lugar.addEventListener("click", dialogoLugar);
    __defers["$.__views.lugar!focus!dialogoLugar"] && $.__views.lugar.addEventListener("focus", dialogoLugar);
    __defers["$.__views.lugarIcon!click!dialogoLugar"] && $.__views.lugarIcon.addEventListener("click", dialogoLugar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;