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
        w.addEventListener("close", function() {
            initList();
        });
    }
    function getAccordionItemRow(id, titulo) {
        var tvr = Titanium.UI.createTableViewRow({
            height: "45",
            filter: titulo
        });
        var view = Titanium.UI.createView({
            top: "0",
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "45"
        });
        var label = Titanium.UI.createLabel({
            text: titulo,
            left: "5%",
            color: "#000"
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
            var eliminaDialog = Ti.UI.createOptionDialog({
                buttonNames: [ "Aceptar", "Cancelar" ],
                title: "¿Está seguro que desea eliminar esta lista?",
                cancel: 2,
                selectedIndex: 2,
                destructive: 0
            });
            eliminaDialog.show();
            eliminaDialog.addEventListener("click", function(e) {
                if (0 == e.index) {
                    var lista_contactos = Alloy.createCollection("lista_contacto");
                    lista_contactos.fetch();
                    lista_contactos.each(function(lista_contacto) {
                        lista_contacto.get("id") == id && lista_contacto.destroy();
                    });
                    var listas = Alloy.createCollection("lista");
                    listas.fetch();
                    var lista = listas.get(id);
                    var options = {
                        success: function() {
                            $.tabla.deleteRow(tvr, {});
                        }
                    };
                    lista.destroy(options);
                }
            });
        });
        boton.addEventListener("click", function() {
            openwin();
        });
        view.add(label);
        view.add(boton);
        view.add(elimina);
        tvr.add(view);
        return tvr;
    }
    function getStaticAccordionItemRow() {
        var tvr = Titanium.UI.createTableViewRow({
            filter: ""
        });
        var view = Titanium.UI.createView({
            top: "0",
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "45"
        });
        var label = Titanium.UI.createLabel({
            left: "5%",
            color: "#000",
            text: "Nueva Lista",
            width: "70%"
        });
        var boton = Titanium.UI.createButton({
            backgroundImage: "/contacts-icon.png",
            right: "3%",
            borderRadius: 5,
            height: "30",
            top: "5",
            width: "10%"
        });
        boton.addEventListener("click", function() {
            openwin();
        });
        view.add(label);
        view.add(boton);
        tvr.add(view);
        return tvr;
    }
    function initList() {
        data = [];
        $.tabla.setData(data);
        var listas = Alloy.createCollection("lista");
        listas.fetch();
        data.push(getStaticAccordionItemRow());
        listas.each(function(lista) {
            data.push(getAccordionItemRow(lista.get("id"), lista.get("titulo")));
        });
        $.tabla.setData(data);
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
    var data = [];
    initList();
    $.buscar.addEventListener("change", function() {
        var filteredData = [];
        filteredData.push(getStaticAccordionItemRow());
        var value = $.buscar.value;
        if ("" != value) {
            for (var row in data) data[row].filter.match(value) && filteredData.push(data[row]);
            $.tabla.setData(filteredData);
        } else $.tabla.setData(data);
    });
    $.configContactos.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;