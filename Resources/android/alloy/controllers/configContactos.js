function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openwin() {
        var w = Alloy.createController("lista").getView();
        w.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "configContactos";
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
        title: "Contactos",
        id: "agregar"
    });
    $.__views.index.add($.__views.agregar);
    $.__views.contactoIcon = Ti.UI.createButton({
        top: "18%",
        left: "5%",
        width: "12%",
        height: "10%",
        id: "contactoIcon",
        backgroundImage: "/blue-address-book-icon.png"
    });
    $.__views.index.add($.__views.contactoIcon);
    openwin ? $.__views.contactoIcon.addEventListener("click", openwin) : __defers["$.__views.contactoIcon!click!openwin"] = true;
    var __alloyId0 = [];
    $.__views.__alloyId1 = Ti.UI.createTableViewRow({
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.row = Ti.UI.createView({
        borderColor: "#afafaf",
        borderRadius: "5",
        height: "40",
        backgroundColor: "#e7e9e7",
        id: "row"
    });
    $.__views.__alloyId1.add($.__views.row);
    $.__views.newLista = Ti.UI.createLabel({
        color: "#000",
        left: "5%",
        text: "Nueva Lista",
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
    openwin ? $.__views.rowButton.addEventListener("click", openwin) : __defers["$.__views.rowButton!click!openwin"] = true;
    $.__views.tabla = Ti.UI.createTableView({
        top: "35%",
        height: "80%",
        data: __alloyId0,
        id: "tabla"
    });
    $.__views.index.add($.__views.tabla);
    $.__views.configContactos = Ti.UI.createTab({
        window: $.__views.index,
        title: "Contactos",
        id: "configContactos"
    });
    $.__views.configContactos && $.addTopLevelView($.__views.configContactos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.agregar.addEventListener("click", function() {
        var texto = Ti.UI.createLabel({
            text: "Prueba",
            color: "#000",
            left: "5%"
        });
        var editar = Ti.UI.createButton({
            title: "Editar",
            right: "3%",
            height: "30",
            top: "5",
            borderRadius: "5",
            backgroundColor: "#0089e3",
            width: "30%"
        });
        var tvr = Ti.UI.createTableViewRow({});
        var view = Ti.UI.createView({
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40"
        });
        view.add(texto);
        view.add(editar);
        tvr.add(view);
        $.tabla.appendRow(tvr);
    });
    $.configContactos.open();
    __defers["$.__views.contactoIcon!click!openwin"] && $.__views.contactoIcon.addEventListener("click", openwin);
    __defers["$.__views.rowButton!click!openwin"] && $.__views.rowButton.addEventListener("click", openwin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;