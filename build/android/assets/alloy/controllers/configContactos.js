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
    var __alloyId0 = [];
    $.__views.__alloyId1 = Ti.UI.createTableViewRow({
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.row = Ti.UI.createView({
        borderColor: "#afafaf",
        borderRadius: "5",
        height: "40",
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
        height: "30",
        top: "5",
        width: "10%",
        backgroundImage: "/contacts-icon.png",
        id: "rowButton"
    });
    $.__views.row.add($.__views.rowButton);
    openwin ? $.__views.rowButton.addEventListener("click", openwin) : __defers["$.__views.rowButton!click!openwin"] = true;
    $.__views.tabla = Ti.UI.createTableView({
        top: "20%",
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
    $.configContactos.open();
    __defers["$.__views.rowButton!click!openwin"] && $.__views.rowButton.addEventListener("click", openwin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;