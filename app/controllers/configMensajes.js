var data = [];

function getAccordionItemRow(id,titulo, text){
	var tvr = Titanium.UI.createTableViewRow({
		height: "45",
		filter: id+' '+titulo+' '+text
	});
	
	var view = Titanium.UI.createView({
		top: "0",
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "45"
	});
	
	var viewTexto = Titanium.UI.createView({
		top: "45",
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "40",
		backgroundColor:'#d5ece6',
		height: 0
	});
	var label = Titanium.UI.createLabel({
		text: titulo,
		left:'5%',
		color: '#000'
	});
	var dataLabel = Titanium.UI.createTextArea({
		top: '0',
		height:'0', 
	    objVisible:'false', 
	    backgroundColor:'#d5ece6',
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
		backgroundImage: "/pencil-icon.png",
		height: "35",
		top: "5",
		width: "11%"	
	});
	var elimina = Titanium.UI.createButton({
		right: '3%',
		borderRadius: 5,
		height: "35",
		top: "5",
		width: "11%",
		backgroundImage: "/denied-icon.png"			
	});
	
	elimina.addEventListener('click', function(e) {
		var eliminaDialog = Ti.UI.createOptionDialog({
			buttonNames: ['Aceptar', 'Cancelar'],
			title:"¿Está seguro que desea eliminar este mensaje?",
			androidView: viewDialog,
			cancel: 2,
			selectedIndex: 2,
	  		destructive: 0,
		});		
		eliminaDialog.show();		
		eliminaDialog.addEventListener('click', function(e){
			if(e.index == 0){
				//aca se debe eliminar el modelo
			    var mensajes = Alloy.createCollection('mensaje'); 
				mensajes.fetch(); // Grab data from persistent storage
				var mensaje = mensajes.get(id);		
				var options = {
		            success: function(model, response) {		                
					    //luego que se elimino el modelo se muestra el cambio en el tableview
					    $.tabla.deleteRow(tvr,{});
		            },
		        };		
				mensaje.destroy(options);
			}
		});
	});
	
	
	boton.addEventListener('click', function(e) {
		if(dataLabel.objVisible == true)
    	{
    		tvr.height = 45;
        	dataLabel.height = 0;
        	viewTexto.height = 0;
        	dataLabel.objVisible = false;
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
    		tvr.height = 125;
    		dataLabel.objVisible = true;
        	dataLabel.height = Ti.UI.SIZE;
        	viewTexto.height = 80;
        	viewTexto.top = 45;
        	boton.backgroundImage = "/memorycard-icon.png";
    	}
	});
	
	view.add(label);
	view.add(boton);
	view.add(elimina);
	viewTexto.add(dataLabel);
	tvr.add(view);
	tvr.add(viewTexto);
	return tvr;
}

function getStaticAccordionItemRow(e){
	var tvr = Titanium.UI.createTableViewRow({
		filter: ""
	});
	var view = Titanium.UI.createView({
		top: "0",
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "45"
	});
	var viewTexto = Titanium.UI.createView({
		top: "45",
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "40",
		backgroundColor:'#e7e9e7',
		height: "0"
	});
	var label = Titanium.UI.createTextField({
		left:'5%',
		color: '#000',
		hintText:'Nuevo Titulo',
		width: '70%'
	});
	var dataLabel = Titanium.UI.createTextArea({
		top: '0',
		height:'0', 
	    objVisible:'false', 
	    backgroundColor:'#e7e9e7',
	    color: "#000",
	    width: '100%',
	    font: {fontSize:15},
	    returnKeyType: Ti.UI.RETURNKEY_GO,
	    textAlign: 'left',
	    hintText:'Nuevo Mensaje'
	});
	var boton = Titanium.UI.createButton({
		backgroundImage: "/compose-icon.png",
		right: '3%',
		borderRadius: 5,
		height: "30",
		top: "5",
		width: "10%"	
	});
	boton.addEventListener('click', function(e) {
		if(dataLabel.objVisible == true)
    	{
        	dataLabel.height = 0;
        	viewTexto.height = 0;
        	tvr.height = 45;
        	dataLabel.objVisible = false;
        	boton.backgroundImage = "/compose-icon.png";	
        	if (dataLabel.value != "" && label.value != ""){
	        	var mensaje = Alloy.createModel('mensaje',{titulo: label.value, mensaje: dataLabel.value});
	        	mensaje.save();        		        	
	        	var row = getAccordionItemRow(mensaje.get('id'),label.value, dataLabel.value);
	        	label.blur();
	        	data.push(row);
	        	$.tabla.setData(data);
        	}	
        	label.value = '';
	        dataLabel.value = '';
    	}
    	else
    	{
        	dataLabel.height = 60;
        	viewTexto.height = 80;
        	tvr.height = 125;
        	dataLabel.objVisible = true;
        	boton.backgroundImage = "/memorycard-icon.png";
    	}
	});	
	view.add(label);
	view.add(boton);
	viewTexto.add(dataLabel);
	tvr.add(view);
	tvr.add(viewTexto);
	return tvr;
}

function initList(){
	var mensajes = Alloy.createCollection('mensaje'); 
	mensajes.fetch(); // Grab data from persistent storage
	data.push(getStaticAccordionItemRow());
	mensajes.each(
		function (mensaje){
			data.push(getAccordionItemRow(mensaje.get('id'),mensaje.get('titulo'),mensaje.get('mensaje')));	
		}
	);
	$.tabla.setData(data);
}
initList();

$.buscar.addEventListener('change',function(e){
	var filteredData = [];
	filteredData.push(getStaticAccordionItemRow());
	var value = $.buscar.value;
	if (value!=""){
		for (var row in data){
			if (data[row].filter.match(value)){
				filteredData.push(data[row]);
			}
		}
		$.tabla.setData(filteredData);
	} else {
		$.tabla.setData(data);
	}
});

$.configMensajes.open();