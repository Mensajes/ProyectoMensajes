var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            idLista: "INTEGER PRIMARY KEY AUTOINCREMENT",
            id: "TEXT",
            nombre: "TEXT",
            email: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "lista_contacto",
            idAttribute: "idLista"
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

model = Alloy.M("lista_contacto", exports.definition, []);

collection = Alloy.C("lista_contacto", exports.definition, model);

exports.Model = model;

exports.Collection = collection;