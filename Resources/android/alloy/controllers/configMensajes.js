function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getAccordionItemRow(id, titulo, text) {
        var tvr = Titanium.UI.createTableViewRow({});
        var view = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "45"
        });
        var viewTexto = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40",
            backgroundColor: "#d5ece6",
            height: 0
        });
        var label = Titanium.UI.createLabel({
            text: titulo,
            left: "5%",
            color: "#000"
        });
        var dataLabel = Titanium.UI.createTextArea({
            top: "22%",
            height: "0",
            objVisible: "false",
            backgroundColor: "#d5ece6",
            color: "#000",
            width: "100%",
            value: text,
            font: {
                fontSize: 15,
                fontWeight: "bold"
            },
            returnKeyType: Ti.UI.RETURNKEY_GO,
            textAlign: "left"
        });
        var boton = Titanium.UI.createButton({
            right: "14%",
            borderRadius: 5,
            backgroundImage: "/pencil-icon.png",
            height: "35",
            top: "5",
            width: "11%"
        });
        var elimina = Titanium.UI.createButton({
            right: "3%",
            borderRadius: 5,
            height: "35",
            top: "5",
            width: "11%",
            backgroundImage: "/denied-icon.png"
        });
        elimina.addEventListener("click", function() {
            var mensajes = Alloy.createCollection("mensaje");
            mensajes.fetch();
            var mensaje = mensajes.get(id);
            var options = {
                success: function() {
                    $.tabla.deleteRow(tvr, {});
                }
            };
            mensaje.destroy(options);
        });
        boton.addEventListener("click", function() {
            if (true == dataLabel.objVisible) {
                dataLabel.height = 0;
                viewTexto.height = 0;
                dataLabel.objVisible = false;
                boton.backgroundImage = "/pencil-icon.png";
                var mensajes = Alloy.createCollection("mensaje");
                mensajes.fetch();
                var mensaje = mensajes.get(id);
                mensaje.set("mensaje", dataLabel.value);
                mensaje.save();
            } else {
                dataLabel.height = Ti.UI.SIZE;
                viewTexto.height = 80;
                dataLabel.objVisible = true;
                boton.backgroundImage = "/memorycard-icon.png";
            }
        });
        view.add(label);
        view.add(boton);
        view.add(elimina);
        viewTexto.add(dataLabel);
        tvr.add(view);
        tvr.add(viewTexto);
        return tvr;
    }
    function getStaticAccordionItemRow() {
        var tvr = Titanium.UI.createTableViewRow({});
        var view = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40"
        });
        var viewTexto = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40",
            backgroundColor: "#e7e9e7",
            height: 0
        });
        var label = Titanium.UI.createTextField({
            value: "Nuevo Titulo",
            left: "5%",
            color: "#000"
        });
        var dataLabel = Titanium.UI.createTextArea({
            height: "0",
            objVisible: "false",
            backgroundColor: "#e7e9e7",
            color: "#000",
            width: "100%",
            font: {
                fontSize: 15
            },
            returnKeyType: Ti.UI.RETURNKEY_GO,
            textAlign: "left"
        });
        var boton = Titanium.UI.createButton({
            backgroundImage: "/compose-icon.png",
            right: "3%",
            borderRadius: 5,
            height: "30",
            top: "5",
            width: "10%"
        });
        boton.addEventListener("click", function() {
            if (true == dataLabel.objVisible) {
                dataLabel.height = 0;
                viewTexto.height = 0;
                tvr.height = 60;
                dataLabel.objVisible = false;
                boton.backgroundImage = "/compose-icon.png";
                if ("" != dataLabel.value) {
                    var mensaje = Alloy.createModel("mensaje", {
                        titulo: label.value,
                        mensaje: dataLabel.value
                    });
                    mensaje.save();
                    addAccordionItem(mensaje.get("id"), label.value, dataLabel.value);
                    label.value = "Nuevo Titulo";
                    dataLabel.value = "";
                }
            } else {
                dataLabel.height = 60;
                viewTexto.height = 80;
                tvr.height = 200;
                dataLabel.objVisible = true;
                boton.backgroundImage = "/memorycard-icon.png";
            }
        });
        view.add(label);
        view.add(boton);
        viewTexto.add(dataLabel);
        tvr.add(view);
        tvr.add(viewTexto);
        return tvr;
    }
    function initList() {
        var mensajes = Alloy.createCollection("mensaje");
        mensajes.fetch();
        data.push(getStaticAccordionItemRow());
        mensajes.each(function(mensaje) {
            data.push(getAccordionItemRow(mensaje.get("id"), mensaje.get("titulo"), mensaje.get("mensaje")));
        });
        $.tabla.setData(data);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "configMensajes";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#f3fafc",
        id: "index",
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_ADJUST_PAN
    });
    $.__views.buscar = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        width: "78%",
        top: "5%",
        left: "5%",
        id: "buscar",
        hintText: "Buscar"
    });
    $.__views.index.add($.__views.buscar);
    $.__views.lupa = Ti.UI.createButton({
        top: "5%",
        right: "3%",
        width: "12%",
        height: "10%",
        backgroundImage: "/magnifying-glass-icon.png",
        id: "lupa"
    });
    $.__views.index.add($.__views.lupa);
    $.__views.tabla = Ti.UI.createTableView({
        top: "20%",
        height: "80%",
        id: "tabla",
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_ADJUST_PAN
    });
    $.__views.index.add($.__views.tabla);
    $.__views.configMensajes = Ti.UI.createTab({
        window: $.__views.index,
        title: "Mensajes",
        id: "configMensajes"
    });
    $.__views.configMensajes && $.addTopLevelView($.__views.configMensajes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.buscar.addEventListener("change", function() {});
    var data = [];
    initList();
    $.configMensajes.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;