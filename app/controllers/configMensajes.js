function addAccordionItem(id,titulo, text){
	
	var tvr = Titanium.UI.createTableViewRow({});
	var tvrTexto = Titanium.UI.createTableViewRow({
		height: 0
	});
	
	var view = Titanium.UI.createView({
		//top: '10',
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "40"
		
	});
	
	var viewTexto = Titanium.UI.createView({
		//top: '10',
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "40",
		backgroundColor:'#e7e9e7',
		
	});
	
	var label = Titanium.UI.createLabel({
		text: titulo,
		left:'5%',
		color: '#000'
	});
	
	var dataLabel = Titanium.UI.createTextArea({
		height:'0', 
	    objVisible:'false', 
	    //text: text,
	    backgroundColor:'#e7e9e7',
	    color: "#000",
	    width: '100%',
	    value: text,
	    font: {fontSize:15, fontWeight:'bold'},
	    returnKeyType: Ti.UI.RETURNKEY_GO,
	    textAlign: 'left'	    
	});
	
	var boton = Titanium.UI.createButton({
		right: '14%',
		borderRadius: 5,
		//backgroundColor: "#089ad4",
		//backgroundColor: "#0089e3",
		backgroundImage: "/pencil-icon.png",
		height: "30",
		top: "5",
		width: "10%"	
	});
	
	var elimina = Titanium.UI.createButton({
		right: '3%',
		borderRadius: 5,
		height: "30",
		top: "5",
		width: "10%",
		backgroundImage: "/denied-icon.png"			
	});
	
	elimina.addEventListener('click', function(e) {
	    //aca se debe eliminar el modelo
	    var mensajes = Alloy.createCollection('mensaje'); 
		mensajes.fetch(); // Grab data from persistent storage
		var mensaje = mensajes.get(id);		
		var options = {
            success: function(model, response) {		                
			    //luego que se elimino el modelo se muestra el cambio en el tableview
			    $.tabla.deleteRow(tvr,{});
			    $.tabla.deleteRow(tvrTexto,{});
            },
            error: function(model, response) {
				
            }
        };		
		mensaje.destroy(options);
	});
	
	boton.addEventListener('click', function(e) {
		if(dataLabel.objVisible == true)
    	{
        	dataLabel.height = 0;
        	tvrTexto.height = 0;
        	dataLabel.objVisible = false;
        	//boton.title = "Editar";
        	boton.backgroundImage = "/pencil-icon.png";	
        	//aca va el llamado al modelo y se guarda el mensaje modificado
        	var mensajes = Alloy.createCollection('mensaje'); 
			mensajes.fetch(); // Grab data from persistent storage
			var mensaje = mensajes.get(id);	
			
        	mensaje.set('mensaje', dataLabel.value);
        	mensaje.save();
    	}
    	else
    	{
        	dataLabel.height = Ti.UI.SIZE;
        	tvrTexto.height = 80;
        	viewTexto.height = 140;
        	dataLabel.objVisible = true;
        	//boton.title = "Guardar";
        	boton.backgroundImage = "/memorycard-icon.png";
    	}
	});
	
	view.add(label);
	view.add(boton);
	view.add(elimina);
	viewTexto.add(dataLabel);
	tvr.add(view);
	tvrTexto.add(viewTexto);
	
	$.tabla.insertRowAfter(1,tvrTexto);
	$.tabla.insertRowAfter(1,tvr);
	//$.tabla.appendRow(tvr);
	//$.tabla.appendRow(tvrTexto);
}

function addStaticAccordionItem(e){
	
	var tvr = Titanium.UI.createTableViewRow({});
	var tvrTexto = Titanium.UI.createTableViewRow({
		height: 0
	});
	
	var view = Titanium.UI.createView({
		//top: '10',
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "40"
		
	});
	
	var viewTexto = Titanium.UI.createView({
		//top: '10',
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "40",
		backgroundColor:'#e7e9e7',
		
	});
	
	var label = Titanium.UI.createTextField({
		value:'Nuevo Titulo',
		left:'5%',
		color: '#000'
	});
	
	var dataLabel = Titanium.UI.createTextArea({
		height:'0', 
	    objVisible:'false', 
	    //text:'',
	    backgroundColor:'#e7e9e7',
	    color: "#000",
	    width: '100%',
	    //value: 'edgar',
	    font: {fontSize:15},
	    returnKeyType: Ti.UI.RETURNKEY_GO,
	    textAlign: 'left'
	    
	});
	
	var boton = Titanium.UI.createButton({
		//title: 'Crear',
		backgroundImage: "/compose-icon.png",
		right: '3%',
		borderRadius: 5,
		//backgroundColor: "#089ad4",
		//backgroundColor: "#0089e3",
		height: "30",
		top: "5",
		width: "10%"	
	});
	
	
	boton.addEventListener('click', function(e) {
		if(dataLabel.objVisible == true)
    	{
        	dataLabel.height = 0;
        	tvrTexto.height = 0;
        	dataLabel.objVisible = false;
        	//boton.title = "Crear";
        	boton.backgroundImage = "/compose-icon.png";	
        	
        	if (dataLabel.value != ""){
        		//alert(dataLabel.value);
	        	var mensaje = Alloy.createModel('mensaje',{titulo: label.value, mensaje: dataLabel.value});
	        	mensaje.save();        		        	
	        	addAccordionItem(mensaje.get('id'),label.value, dataLabel.value);
	        	
	        	label.value = 'Nuevo Titulo';
	        	dataLabel.value = '';
        	}	
    	}
    	else
    	{
        	dataLabel.height = Ti.UI.SIZE;
        	tvrTexto.height = 80;
        	viewTexto.height = 140;
        	dataLabel.objVisible = true;
        	//boton.title = "Guardar";
        	boton.backgroundImage = "/memorycard-icon.png";
    	}
	});
	
	view.add(label);
	view.add(boton);
	viewTexto.add(dataLabel);
	tvr.add(view);
	tvrTexto.add(viewTexto);
	$.tabla.insertRowBefore(0,tvrTexto);
	$.tabla.insertRowBefore(0,tvr);
	//$.tabla.appendRow(tvrTexto);
}

function initList(){
	var mensajes = Alloy.createCollection('mensaje'); 
	mensajes.fetch(); // Grab data from persistent storage
	mensajes.each(
		function (mensaje){
			addAccordionItem(mensaje.get('id'),mensaje.get('titulo'),mensaje.get('mensaje'));
		}
	);
}

addStaticAccordionItem();
initList();

$.configMensajes.open();