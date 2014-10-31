function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addAccordionItem(titulo, text) {
        var tvr = Titanium.UI.createTableViewRow({});
        var tvrTexto = Titanium.UI.createTableViewRow({
            height: 0
        });
        var view = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40"
        });
        var viewTexto = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40",
            backgroundColor: "#e7e9e7"
        });
        var label = Titanium.UI.createLabel({
            text: titulo,
            left: "5%",
            color: "#000"
        });
        var dataLabel = Titanium.UI.createTextArea({
            height: "0",
            objVisible: "false",
            backgroundColor: "#e7e9e7",
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
            title: "Editar",
            right: "14%",
            borderRadius: 5,
            backgroundColor: "#0089e3",
            height: "30",
            top: "5",
            width: "20%"
        });
        var elimina = Titanium.UI.createButton({
            right: "3%",
            borderRadius: 5,
            height: "30",
            top: "5",
            width: "10%",
            backgroundImage: "/blue-cross-icon.png"
        });
        boton.addEventListener("click", function() {
            if (true == dataLabel.objVisible) {
                dataLabel.height = 0;
                tvrTexto.height = 0;
                dataLabel.objVisible = false;
                boton.title = "Editar";
            } else {
                dataLabel.height = Ti.UI.SIZE;
                tvrTexto.height = 80;
                viewTexto.height = 140;
                dataLabel.objVisible = true;
                boton.title = "Guardar";
            }
        });
        view.add(label);
        view.add(boton);
        view.add(elimina);
        viewTexto.add(dataLabel);
        tvr.add(view);
        tvrTexto.add(viewTexto);
        $.tabla.insertRowAfter(1, tvrTexto);
        $.tabla.insertRowAfter(1, tvr);
    }
    function addStaticAccordionItem() {
        var tvr = Titanium.UI.createTableViewRow({});
        var tvrTexto = Titanium.UI.createTableViewRow({
            height: 0
        });
        var view = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40"
        });
        var viewTexto = Titanium.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40",
            backgroundColor: "#e7e9e7"
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
            title: "Crear",
            right: "3%",
            borderRadius: 5,
            backgroundColor: "#0089e3",
            height: "30",
            top: "5",
            width: "30%"
        });
        boton.addEventListener("click", function() {
            if (true == dataLabel.objVisible) {
                dataLabel.height = 0;
                tvrTexto.height = 0;
                dataLabel.objVisible = false;
                boton.title = "Crear";
                if ("" != dataLabel.value) {
                    var mensaje = Alloy.createModel("mensaje", {
                        titulo: label.value,
                        mensaje: dataLabel.value
                    });
                    mensaje.save();
                    addAccordionItem(label.value, dataLabel.value);
                    label.value = "Nuevo Titulo";
                    dataLabel.value = "";
                }
            } else {
                dataLabel.height = Ti.UI.SIZE;
                tvrTexto.height = 80;
                viewTexto.height = 140;
                dataLabel.objVisible = true;
                boton.title = "Guardar";
            }
        });
        view.add(label);
        view.add(boton);
        viewTexto.add(dataLabel);
        tvr.add(view);
        tvrTexto.add(viewTexto);
        $.tabla.insertRowBefore(0, tvrTexto);
        $.tabla.insertRowBefore(0, tvr);
    }
    function initList() {
        var mensajes = Alloy.createCollection("mensaje");
        mensajes.fetch();
        mensajes.each(function(mensaje) {
            addAccordionItem(mensaje.get("titulo"), mensaje.get("mensaje"));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "configMensajes";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
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
        backgroundImage: "/blue-search-icon.png",
        id: "lupa"
    });
    $.__views.index.add($.__views.lupa);
    $.__views.agregar = Ti.UI.createButton({
        top: "18%",
        borderRadius: "5",
        backgroundColor: "#0071bc",
        width: "30%",
        title: "Agregar",
        id: "agregar"
    });
    $.__views.index.add($.__views.agregar);
    addAccordionItem ? $.__views.agregar.addEventListener("click", addAccordionItem) : __defers["$.__views.agregar!click!addAccordionItem"] = true;
    $.__views.tabla = Ti.UI.createTableView({
        top: "35%",
        height: "80%",
        id: "tabla"
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
    addStaticAccordionItem();
    initList();
    $.configMensajes.open();
    __defers["$.__views.agregar!click!addAccordionItem"] && $.__views.agregar.addEventListener("click", addAccordionItem);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;