var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            titulo: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "lista",
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

model = Alloy.M("lista", exports.definition, []);

collection = Alloy.C("lista", exports.definition, model);

exports.Model = model;

exports.Collection = collection;