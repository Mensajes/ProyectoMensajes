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
                viw.backgroundColor = specs.checkedColor || "#0071bc";
            }
        }
        "object" != typeof specs && (specs = {});
        specs.width = specs.width || 45;
        specs.backgroundColor = specs.unCheckedColor || "white";
        specs.height = specs.height || 45;
        specs.border = specs.border || 5;
        specs.right = specs.right || "3%";
        specs.borderColor = specs.borderColor || "silver";
        specs.borderRadius = specs.borderRadius || 5;
        var viw = Ti.UI.createView(specs);
        viw.addEventListener("click", togglecheck);
        return viw;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista";
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
        value: "Nombre Lista"
    });
    $.__views.ventana.add($.__views.nombre);
    $.__views.guardar = Ti.UI.createButton({
        top: "5%",
        right: "3%",
        width: "13%",
        height: "9%",
        id: "guardar",
        backgroundImage: "/blue-disk-icon.png"
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
    var singleValue = [ "id", "fullName" ];
    var multiValue = [ "email", "phone" ];
    var people = Ti.Contacts.getAllPeople();
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "#0071bc",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 20,
            fontWeight: "bold"
        },
        message: "Loading...",
        style: Ti.UI.ActivityIndicatorStyle.BIG_DARK,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    var indicatorRow = Ti.UI.createTableViewRow();
    indicatorRow.add(activityIndicator);
    $.contactList.appendRow(indicatorRow);
    activityIndicator.show();
    for (var i = 0, ilen = people.length; ilen > i; i++) {
        var person = people[i];
        if ("{}" != JSON.stringify(person[multiValue[1]]) && "{}" != JSON.stringify(person[multiValue[0]])) {
            Ti.API.info("phone:" + JSON.stringify(person[multiValue[1]]));
            var newContact = Ti.UI.createTableViewRow();
            var vista = Ti.UI.createView({
                borderColor: "#afafaf",
                borderRadius: "5",
                height: "50",
                backgroundColor: "#e7e9e7"
            });
            var nombreContacto = Ti.UI.createLabel({
                text: person[singleValue[1]],
                left: "5%",
                color: "#000"
            });
            var checkbox = createCheckbox({});
            vista.add(nombreContacto);
            vista.add(checkbox);
            newContact.add(vista);
            $.contactList.appendRow(newContact);
        }
    }
    activityIndicator.hide();
    $.ventana.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;