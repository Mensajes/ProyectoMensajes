function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addAccordionItem() {
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
            text: "Mensaje",
            left: "5%",
            color: "#000"
        });
        var dataLabel = Titanium.UI.createLabel({
            height: "0",
            objVisible: "false",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            backgroundColor: "#e7e9e7",
            color: "#000"
        });
        var boton = Titanium.UI.createButton({
            title: "Guardar",
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
            } else {
                dataLabel.height = Ti.UI.SIZE;
                tvrTexto.height = 80;
                viewTexto.height = 140;
                dataLabel.objVisible = true;
            }
        });
        view.add(label);
        view.add(boton);
        viewTexto.add(dataLabel);
        tvr.add(view);
        tvrTexto.add(viewTexto);
        $.tabla.appendRow(tvr);
        $.tabla.appendRow(tvrTexto);
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
        value: "Buscar"
    });
    $.__views.index.add($.__views.buscar);
    $.__views.lupa = Ti.UI.createButton({
        top: "5%",
        right: "3%",
        width: "12%",
        height: "10%",
        id: "lupa",
        backgroundImage: "/blue-search-icon.png"
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
    var __alloyId2 = [];
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        id: "__alloyId3"
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.row = Ti.UI.createView({
        borderColor: "#afafaf",
        borderRadius: "5",
        height: "40",
        backgroundColor: "#e7e9e7",
        id: "row"
    });
    $.__views.__alloyId3.add($.__views.row);
    $.__views.newLista = Ti.UI.createLabel({
        left: "5%",
        color: "#000",
        text: "Nuevo Mensaje",
        id: "newLista"
    });
    $.__views.row.add($.__views.newLista);
    $.__views.rowButton = Ti.UI.createButton({
        right: "3%",
        borderRadius: 5,
        backgroundColor: "#0089e3",
        height: "30",
        top: "5",
        width: "30%",
        title: "Crear",
        id: "rowButton"
    });
    $.__views.row.add($.__views.rowButton);
    $.__views.tabla = Ti.UI.createTableView({
        top: "35%",
        height: "80%",
        data: __alloyId2,
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
    $.configMensajes.open();
    __defers["$.__views.agregar!click!addAccordionItem"] && $.__views.agregar.addEventListener("click", addAccordionItem);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;