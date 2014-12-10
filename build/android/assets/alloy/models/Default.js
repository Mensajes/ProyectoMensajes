var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            email: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "default",
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

model = Alloy.M("default", exports.definition, []);

collection = Alloy.C("default", exports.definition, model);

exports.Model = model;

exports.Collection = collection;