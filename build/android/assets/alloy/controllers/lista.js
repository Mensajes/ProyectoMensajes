function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createCheckbox(specs) {
        function togglecheck() {
            if (viw.checked) {
                viw.checked = false;
                viw.backgroundColor = specs.unCheckedColor || "white";
            } else {
                viw.checked = true;
                viw.backgroundColor = specs.checkedColor || "#079fbb";
            }
        }
        "object" != typeof specs && (specs = {});
        specs.width = specs.width || 35;
        specs.backgroundColor = specs.unCheckedColor || "white";
        specs.height = specs.height || 35;
        specs.border = specs.border || 5;
        specs.right = specs.right || "3%";
        specs.borderColor = specs.borderColor || "silver";
        specs.borderRadius = specs.borderRadius || 35;
        var viw = Ti.UI.createView(specs);
        viw.addEventListener("click", togglecheck);
        return viw;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.ventana = Ti.UI.createWindow({
        backgroundColor: "#f3fafc",
        id: "ventana",
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_ADJUST_PAN
    });
    $.__views.ventana && $.addTopLevelView($.__views.ventana);
    $.__views.nombre = Ti.UI.createTextField({
        borderColor: "#afafaf",
        color: "#000",
        borderRadius: "5",
        borderWidth: "2",
        width: "78%",
        top: "5%",
        left: "5%",
        id: "nombre",
        hintText: "Nombre Lista"
    });
    $.__views.ventana.add($.__views.nombre);
    $.__views.guardar = Ti.UI.createButton({
        top: "5%",
        right: "3%",
        width: "13%",
        height: "9%",
        backgroundImage: "/memorycard-icon.png",
        id: "guardar"
    });
    $.__views.ventana.add($.__views.guardar);
    $.__views.contactList = Ti.UI.createTableView({
        top: "18%",
        height: "88%",
        id: "contactList"
    });
    $.__views.ventana.add($.__views.contactList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = [];
    var singleValue = [ "id", "fullName" ];
    var multiValue = [ "email", "phone" ];
    var people = Ti.Contacts.getAllPeople();
    for (var i = 0, ilen = people.length; ilen > i; i++) {
        var person = people[i];
        if ("{}" != JSON.stringify(person[multiValue[1]]) && "{}" != JSON.stringify(person[multiValue[0]])) {
            var newContact = Ti.UI.createTableViewRow();
            var vista = Ti.UI.createView({
                borderColor: "#afafaf",
                borderRadius: "5",
                height: "45"
            });
            var nombreContacto = Ti.UI.createLabel({
                text: person[singleValue[1]],
                left: "5%",
                color: "#000"
            });
            var checkbox = createCheckbox({});
            vista.add(nombreContacto);
            vista.add(checkbox);
            newContact.checkbox = checkbox;
            newContact.nombre = person[singleValue[1]];
            var m = person[multiValue[0]].home;
            null == m && (m = person[multiValue[0]].other);
            newContact.email = m.toString();
            Ti.API.info("edgar: " + newContact.email);
            newContact.add(vista);
            data.push(newContact);
        }
    }
    $.guardar.addEventListener("click", function() {
        var seleccion = false;
        for (var i in data) data[i].checkbox.checked && (seleccion = true);
        if ("" != $.nombre.value && seleccion) {
            var lista = Alloy.createModel("lista", {
                titulo: $.nombre.value
            });
            lista.save();
            var id = lista.get("id");
            for (var i in data) if (data[i].checkbox.checked) {
                var lista_contacto = Alloy.createModel("lista_contacto", {
                    id: id,
                    nombre: data[i].nombre,
                    email: data[i].email
                });
                lista_contacto.save();
            }
        }
        $.ventana.close();
    });
    $.contactList.setData(data);
    $.ventana.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;