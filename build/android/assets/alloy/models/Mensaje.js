var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            titulo: "TEXT",
            mensaje: "TEXT"
        },
        defaults: {},
        adapter: {
            type: "sql",
            collection_name: "mensaje",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("mensaje", exports.definition, []);

collection = Alloy.C("mensaje", exports.definition, model);

exports.Model = model;

exports.Collection = collection;