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
        var tvr = Titanium.UI.createTableViewRow({
            height: "45",
            filter: id + " " + titulo + " " + text
        });
        var view = Titanium.UI.createView({
            top: "0",
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "45"
        });
        var viewTexto = Titanium.UI.createView({
            top: "45",
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
            top: "0",
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
            var eliminaDialog = Ti.UI.createOptionDialog({
                buttonNames: [ "Aceptar", "Cancelar" ],
                title: "¿Está seguro que desea eliminar este mensaje?",
                cancel: 2,
                selectedIndex: 2,
                destructive: 0
            });
            eliminaDialog.show();
            eliminaDialog.addEventListener("click", function(e) {
                if (0 == e.index) {
                    var mensajes = Alloy.createCollection("mensaje");
                    mensajes.fetch();
                    var mensaje = mensajes.get(id);
                    var options = {
                        success: function() {
                            $.tabla.deleteRow(tvr, {});
                            data.splice(data.indexOf(tvr), 1);
                        }
                    };
                    mensaje.destroy(options);
                }
            });
        });
        boton.addEventListener("click", function() {
            if (true == dataLabel.objVisible) {
                tvr.height = 45;
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
                tvr.height = 125;
                dataLabel.objVisible = true;
                dataLabel.height = Ti.UI.SIZE;
                viewTexto.height = 80;
                viewTexto.top = 45;
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
        var tvr = Titanium.UI.createTableViewRow({
            filter: ""
        });
        var view = Titanium.UI.createView({
            top: "0",
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "45"
        });
        var viewTexto = Titanium.UI.createView({
            top: "45",
            borderColor: "#afafaf",
            borderRadius: "5",
            height: "40",
            backgroundColor: "#e7e9e7",
            height: "0"
        });
        var label = Titanium.UI.createTextField({
            left: "5%",
            color: "#000",
            hintText: "Nuevo Titulo",
            width: "70%"
        });
        var dataLabel = Titanium.UI.createTextArea({
            top: "0",
            height: "0",
            objVisible: "false",
            backgroundColor: "#e7e9e7",
            color: "#000",
            width: "100%",
            font: {
                fontSize: 15
            },
            returnKeyType: Ti.UI.RETURNKEY_GO,
            textAlign: "left",
            hintText: "Nuevo Mensaje"
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
                tvr.height = 45;
                dataLabel.objVisible = false;
                boton.backgroundImage = "/compose-icon.png";
                if ("" != dataLabel.value && "" != label.value) {
                    var mensaje = Alloy.createModel("mensaje", {
                        titulo: label.value,
                        mensaje: dataLabel.value
                    });
                    mensaje.save();
                    var row = getAccordionItemRow(mensaje.get("id"), label.value, dataLabel.value);
                    label.blur();
                    data.push(row);
                    $.tabla.setData(data);
                }
                label.value = "";
                dataLabel.value = "";
            } else {
                dataLabel.height = 60;
                viewTexto.height = 80;
                tvr.height = 125;
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
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#f3fafc",
        id: "index"
    });
    $.__views.buscar = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        width: "78%",
        top: "20",
        left: "5%",
        height: "40",
        id: "buscar",
        hintText: "Buscar"
    });
    $.__views.index.add($.__views.buscar);
    $.__views.lupa = Ti.UI.createButton({
        top: "20",
        right: "3%",
        width: "12%",
        height: "40",
        backgroundImage: "/magnifying-glass-icon.png",
        id: "lupa"
    });
    $.__views.index.add($.__views.lupa);
    $.__views.tabla = Ti.UI.createTableView({
        top: "80",
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
    $.configMensajes.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;