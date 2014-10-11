function addAccordionItem(e){
	
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
		text:'Mensaje',
		left:'5%',
		color: '#000'
	});
	
	var dataLabel = Titanium.UI.createLabel({
		height:'0', 
	    objVisible:'false', 
	    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	    backgroundColor:'#e7e9e7',
	    color: "#000"
	});
	
	var boton = Titanium.UI.createButton({
		title: 'Guardar',
		right: '3%',
		borderRadius: 5,
		//backgroundColor: "#089ad4",
		backgroundColor: "#0089e3",
		height: "30",
		top: "5",
		width: "30%"	
	});
	
	boton.addEventListener('click', function(e) {
		if(dataLabel.objVisible == true)
    	{
        	dataLabel.height = 0;
        	tvrTexto.height = 0;
        	dataLabel.objVisible = false;	
    	}
    	else
    	{
        	dataLabel.height = Ti.UI.SIZE;
        	tvrTexto.height = 80;
        	viewTexto.height = 140;
        	dataLabel.objVisible = true;
    	}
	});
	
	view.add(label);
	view.add(boton);
	viewTexto.add(dataLabel);
	tvr.add(view);
	tvrTexto.add(viewTexto);
	$.tabla.appendRow(tvr);
	$.tabla.appendRow(tvrTexto);
}

$.configMensajes.open();