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
        alert("Elegir Lugar");
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
        editable: "false"
    });
    $.__views.win.add($.__views.fecha);
    mostrarCalendario ? $.__views.fecha.addEventListener("click", mostrarCalendario) : __defers["$.__views.fecha!click!mostrarCalendario"] = true;
    $.__views.calendarIcon = Ti.UI.createButton({
        top: "5%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/blue-calendar-icon.png",
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
        editable: "false"
    });
    $.__views.win.add($.__views.hora);
    mostrarReloj ? $.__views.hora.addEventListener("click", mostrarReloj) : __defers["$.__views.hora!click!mostrarReloj"] = true;
    mostrarReloj ? $.__views.hora.addEventListener("focus", mostrarReloj) : __defers["$.__views.hora!focus!mostrarReloj"] = true;
    $.__views.clockIcon = Ti.UI.createButton({
        top: "18%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/blue-clock-icon.png",
        id: "clockIcon"
    });
    $.__views.win.add($.__views.clockIcon);
    mostrarReloj ? $.__views.clockIcon.addEventListener("click", mostrarReloj) : __defers["$.__views.clockIcon!click!mostrarReloj"] = true;
    mostrarReloj ? $.__views.clockIcon.addEventListener("focus", mostrarReloj) : __defers["$.__views.clockIcon!focus!mostrarReloj"] = true;
    $.__views.mensaje = Ti.UI.createPicker({
        left: "5%",
        top: "31%",
        width: "65%",
        borderColor: "#afafaf",
        borderRadius: "5",
        borderWidth: "2",
        height: "10%",
        id: "mensaje",
        type: Titanium.UI.PICKER_TYPE_PLAIN
    });
    $.__views.win.add($.__views.mensaje);
    var __alloyId9 = [];
    $.__views.__alloyId10 = Ti.UI.createPickerRow({
        title: "Mensaje Uno",
        id: "__alloyId10"
    });
    __alloyId9.push($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createPickerRow({
        title: "Mensaje Dos",
        id: "__alloyId11"
    });
    __alloyId9.push($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createPickerRow({
        title: "Mensaje Tres",
        id: "__alloyId12"
    });
    __alloyId9.push($.__views.__alloyId12);
    $.__views.mensaje.add(__alloyId9);
    $.__views.mensajeIcon = Ti.UI.createButton({
        top: "31%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/blue-balloon-plus-icon.png",
        id: "mensajeIcon"
    });
    $.__views.win.add($.__views.mensajeIcon);
    $.__views.destino = Ti.UI.createPicker({
        left: "5%",
        width: "65%",
        borderColor: "#afafaf",
        borderRadius: "5",
        borderWidth: "2",
        top: "44%",
        height: "10%",
        id: "destino",
        type: Titanium.UI.PICKER_TYPE_PLAIN
    });
    $.__views.win.add($.__views.destino);
    var __alloyId13 = [];
    $.__views.__alloyId14 = Ti.UI.createPickerRow({
        title: "Lista Uno",
        id: "__alloyId14"
    });
    __alloyId13.push($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createPickerRow({
        title: "Lista Dos",
        id: "__alloyId15"
    });
    __alloyId13.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createPickerRow({
        title: "Lista Tres",
        id: "__alloyId16"
    });
    __alloyId13.push($.__views.__alloyId16);
    $.__views.destino.add(__alloyId13);
    $.__views.destinoIcon = Ti.UI.createButton({
        right: "10%",
        height: "10%",
        width: "12%",
        top: "44%",
        backgroundImage: "/blue-user-icon.png",
        id: "destinoIcon"
    });
    $.__views.win.add($.__views.destinoIcon);
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
        editable: "false"
    });
    $.__views.win.add($.__views.lugar);
    dialogoLugar ? $.__views.lugar.addEventListener("click", dialogoLugar) : __defers["$.__views.lugar!click!dialogoLugar"] = true;
    dialogoLugar ? $.__views.lugar.addEventListener("focus", dialogoLugar) : __defers["$.__views.lugar!focus!dialogoLugar"] = true;
    $.__views.lugarIcon = Ti.UI.createButton({
        top: "57%",
        right: "10%",
        height: "10%",
        width: "12%",
        backgroundImage: "/blue-home-icon.png",
        id: "lugarIcon"
    });
    $.__views.win.add($.__views.lugarIcon);
    $.__views.enviar = Ti.UI.createButton({
        bottom: "5%",
        borderRadius: 5,
        backgroundColor: "#0071bc",
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
        var sendgrid = require("tisendgrid")("kokeloker", "74d3f6a2");
        var email_to_address = "vardilesduarte@gmail.com";
        var email_from_address = "jpobleteriquelme@gmail.com";
        var email_subject = "Asunto Importante";
        var email_message_text = $.mensaje.value + " " + $.fecha.value + " " + $.hora.value;
        var email = {
            to: email_to_address,
            from: email_from_address,
            subject: email_subject,
            text: email_message_text
        };
        var message = sendgrid.Email(email);
        sendgrid.send(message, function(e) {
            if (e) {
                console.log(JSON.stringify(e));
                alert(e.errors[0]);
            } else alert("Mensaje Enviado");
        });
    });
    __defers["$.__views.fecha!click!mostrarCalendario"] && $.__views.fecha.addEventListener("click", mostrarCalendario);
    __defers["$.__views.calendarIcon!click!mostrarCalendario"] && $.__views.calendarIcon.addEventListener("click", mostrarCalendario);
    __defers["$.__views.hora!click!mostrarReloj"] && $.__views.hora.addEventListener("click", mostrarReloj);
    __defers["$.__views.hora!focus!mostrarReloj"] && $.__views.hora.addEventListener("focus", mostrarReloj);
    __defers["$.__views.clockIcon!click!mostrarReloj"] && $.__views.clockIcon.addEventListener("click", mostrarReloj);
    __defers["$.__views.clockIcon!focus!mostrarReloj"] && $.__views.clockIcon.addEventListener("focus", mostrarReloj);
    __defers["$.__views.lugar!click!dialogoLugar"] && $.__views.lugar.addEventListener("click", dialogoLugar);
    __defers["$.__views.lugar!focus!dialogoLugar"] && $.__views.lugar.addEventListener("focus", dialogoLugar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;