
$.agregar.addEventListener("click", function(e){
	var texto = Ti.UI.createLabel({
		text: "Prueba",
		color: "#000",
		left: "5%"
	});
	
	var editar = Ti.UI.createButton({
		title: "Editar",
		right:"3%",
		height: "30",
		top: "5",
		borderRadius: "5",
		//backgroundColor: "#089ad4",
		backgroundColor: "#0089e3",
		width: "30%"
	});
	
	var tvr = Ti.UI.createTableViewRow({});
	
	var view = Ti.UI.createView({
		borderColor: "#afafaf",
		borderRadius: "5",
		height: "40"	
	});
	
	

	view.add(texto);
	view.add(editar);
	tvr.add(view);
	$.tabla.appendRow(tvr);
});

function openwin(e){
	var w = Alloy.createController('lista').getView();
	w.open();
};

$.configContactos.open();
