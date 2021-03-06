var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "TEXT",
            nombre: "TEXT",
            email: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "contacto",
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

model = Alloy.M("contacto", exports.definition, []);

collection = Alloy.C("contacto", exports.definition, model);

exports.Model = model;

exports.Collection = collection;