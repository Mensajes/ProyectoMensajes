function openwin(){
	var w = Alloy.createController('lista').getView();
	w.open();
	w.addEventListener('close',function(e){
		initList();
	});
};

var data = [];

function getAccordionItemRow(id,titulo){
	var tvr = Titanium.UI.createTableViewRow({
		height: "45",
		filter: titulo
	});
	
	var view = Titanium.UI.createView({
		top: "0",
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "45"
	});
	
	var label = Titanium.UI.createLabel({
		text: titulo,
		left:'5%',
		color: '#000'
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
			title:"¿Está seguro que desea eliminar esta lista?",
			cancel: 2,
			selectedIndex: 2,
	  		destructive: 0,
		});		
		eliminaDialog.show();		
		eliminaDialog.addEventListener('click', function(e){
			if(e.index == 0){
				//aca se debe eliminar el modelo
			    var lista_contactos = Alloy.createCollection('lista_contacto'); 
				lista_contactos.fetch(); // Grab data from persistent storage
				lista_contactos.each(
					function (lista_contacto){
						if (lista_contacto.get('id') == id){
							lista_contacto.destroy();
						}							
					}
				);
				var listas = Alloy.createCollection('lista');
				listas.fetch();
				var lista = listas.get(id);
				var options = {
		            success: function(model, response) {		                
					    //luego que se elimino el modelo se muestra el cambio en el tableview
					    $.tabla.deleteRow(tvr,{});
		            },
		        };		
				lista.destroy(options);
			}
		});
	});
	
	
	boton.addEventListener('click', function(e) {
		openwin();	
	});
	
	view.add(label);
	view.add(boton);
	view.add(elimina);
	tvr.add(view);
	return tvr;
}

function getStaticAccordionItemRow(){
	var tvr = Titanium.UI.createTableViewRow({
		filter: ""
	});
	var view = Titanium.UI.createView({
		top: "0",
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "45"
	});
	
	var label = Titanium.UI.createLabel({
		left:'5%',
		color: '#000',
		text:'Nueva Lista',
		width: '70%'
	});
	var boton = Titanium.UI.createButton({
		backgroundImage: "/contacts-icon.png",
		right: '3%',
		borderRadius: 5,
		height: "30",
		top: "5",
		width: "10%"	
	});
	
	boton.addEventListener('click', function(e) {
		openwin();
	});	
	
	view.add(label);
	view.add(boton);
	tvr.add(view);
	return tvr;
}

function initList(){
	data = [];
	$.tabla.setData(data);
	var listas = Alloy.createCollection('lista'); 
	listas.fetch(); // Grab data from persistent storage
	data.push(getStaticAccordionItemRow());
	listas.each(
		function (lista){
			data.push(getAccordionItemRow(lista.get('id'),lista.get('titulo')));	
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

$.configContactos.open();
