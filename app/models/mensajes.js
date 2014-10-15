exports.definition = {
    config : {
         columns : {
            "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "titulo" : "TEXT",
            "mensaje" : "TEXT"
        },
        defaults : {
        	
        },
        adapter : {
            type : "sql",
            collection_name : "mensajes",
            idAttribute: "id"
        }
 
    },
 
    extendModel : function(Model) {
        _.extend(Model.prototype, {
            // Extend, override or implement Backbone.Model
        });
 
        return Model;
    },
 
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
            // Extend, override or implement Backbone.Collection
        });
 
        return Collection;
    }
};