var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            email: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "config",
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

model = Alloy.M("config", exports.definition, []);

collection = Alloy.C("config", exports.definition, model);

exports.Model = model;

exports.Collection = collection;