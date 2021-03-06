function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __alloyId5 = [];
    $.__views.__alloyId6 = Alloy.createController("principal", {
        id: "__alloyId6"
    });
    __alloyId5.push($.__views.__alloyId6.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId8 = Alloy.createController("configMensajes", {
        id: "__alloyId8"
    });
    __alloyId5.push($.__views.__alloyId8.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId10 = Alloy.createController("configContactos", {
        id: "__alloyId10"
    });
    __alloyId5.push($.__views.__alloyId10.getViewEx({
        recurse: true
    }));
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId5,
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;