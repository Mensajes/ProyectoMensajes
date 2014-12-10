$.principal.open();


var picker = Ti.UI.createPicker({});

function mostrarCalendario(e) {
	picker.showDatePickerDialog({
		value : new Date(), // some date
		callback : function(e) {
			if (e.cancel) {
				Ti.API.info('user canceled dialog');
			} else {
				Ti.API.info('value is: ' + e.value);
				
				Ti.API.info('lets see what this object is' + JSON.stringify(e));
				selectedDate = e.value;
				$.fecha.value = String.formatDate(selectedDate, 'medium');
			}
		}
	});
 
};

function mostrarReloj(e){
	var horaP = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_TIME
	});

	horaP.showTimePickerDialog({
		value: new Date(),
		callback : function(e) {
			if (e.cancel) {
				Ti.API.info('user canceled dialog');
			} else {
				Ti.API.info('value is: ' + e.value);
				
				Ti.API.info('lets see what this object is' + JSON.stringify(e));
				selectedTime = e.value;
				$.hora.value = String.formatTime(selectedTime, 'medium');
			}
		}
	});	
};

function dialogoLugar(e){	
	var aview = Ti.UI.createView({
		height: "400"
	});
	
	var tablaLugares = Ti.UI.createTableView({
		top: "15%",
		height: "500"	
	});
	
	var texto = Ti.UI.createTextField({
		width:"80%",
		top: "3%",
		hintText: "Buscar"
	});	
	var lugaresDialog = Ti.UI.createOptionDialog({
		title:"Ubicación", 
		androidView: aview,
		cancel: 2,
		selectedIndex: 2,
	  	destructive: 0,
	  	buttonNames: ['Aceptar', 'Cancelar']
	});
	var lock = 0;
	texto.addEventListener('change', function(e){
		if (lock==0){
			lock = 1;
			xhr = Titanium.Network.createHTTPClient();
			var query = texto.value; // or whatever you want to forward geocode
			xhr.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query+'&components=country:CL');
			xhr.onload = function() {
				lock = 0;
			    var json = JSON.parse(this.responseText);
			    tablaLugares.setData([]);
			    Ti.API.info('Nueva Repuesta');
			    for (var i=0; i<json.results.length; i++){
			    	Ti.API.info('response: '+ JSON.stringify(json.results[i].formatted_address));
			    	//JSON.stringify(json.results[i].formatted_address)
			    	var view = Ti.UI.createView({
						//borderColor: "#afafaf",
						//borderRadius: "5",
						height: "40",
						//backgroundColor:'#e7e9e7',	
						
					});					
				    var row = Ti.UI.createTableViewRow({});
				    var label = Ti.UI.createLabel({
						text: JSON.stringify(json.results[i].formatted_address),
						left:'5%',
						color: '#fff'
					});
					
					row.addEventListener('click',function(e){
						//alert(label.text);
						$.lugar.value = label.text;
						lugaresDialog.hide();
						
					});
					view.add(label);
					row.add(view);
					tablaLugares.appendRow(row);
					
			    }
			};
			xhr.send();
		}
	});
		
	
	aview.add(texto);
	aview.add(tablaLugares);
	lugaresDialog.show();
};

function selectMensaje(e){
	var viewMensajes = Ti.UI.createView({
		height: "50%"
	});
	
	var tablaMensajes = Ti.UI.createTableView({
		height: "50%"	
	});
	
	var mensajeDialog = Ti.UI.createOptionDialog({
		title:"Mensajes Predet.", 
		cancel: 2,
		selectedIndex: 2,
		androidView: viewMensajes,
	  	destructive: 0,
	  	buttonNames: ['Aceptar', 'Cancelar'],
	});
	data = [];
	var mensajes = Alloy.createCollection('mensaje'); 
	mensajes.fetch(); // Grab data from persistent storage
	mensajes.each(
		function (mensaje){
			var row = Ti.UI.createTableViewRow({
				height: '40'
			});
			var label = Ti.UI.createLabel({
				value: mensaje.get('titulo'),
				color: "#fff",
				height: '30'
			});
			row.add(label);
			row.addEventListener('click', function(e){
				$.mensaje.value = mensaje.get('titulo');
				$.mensaje.mensaje_text = mensaje.get('mensaje');
				mensajeDialog.hide();
			});
			data.push(row);	
		}
	);
	tablaMensajes.setData(data);
	viewMensajes.add(tablaMensajes);
	mensajeDialog.show();
};


function selectLista(e){
	var viewContactos = Ti.UI.createView({
		height: "50%"
	});
	
	var tablaContactos = Ti.UI.createTableView({
		height: "50%"	
	});
	
	var contactosDialog = Ti.UI.createOptionDialog({
		title:"Mensajes Predet.", 
		cancel: 2,
		selectedIndex: 2,
		androidView: viewContactos,
	  	destructive: 0,
	  	buttonNames: ['Aceptar', 'Cancelar'],
	});
	data = [];
	var listas = Alloy.createCollection('lista'); 
	listas.fetch(); // Grab data from persistent storage
	var lista_contactos = Alloy.createCollection('lista_contacto');
	lista_contactos.fetch();
	listas.each(
		function (lista){
			var row = Ti.UI.createTableViewRow({
				height: '40'
			});
			var view = Ti.UI.createView({
				height: '40'
			});
			var label = Ti.UI.createLabel({
				value: lista.get('titulo'),
				color: "#fff",
				height: '30'
			});
			view.add(label);
			row.add(view);
			row.addEventListener('click', function(e){
				$.destino.value = lista.get('titulo');
				var emails = [];
				lista_contactos.each(function (lista_contacto){
					if(lista_contacto.get('id') == lista.get('id')){
						emails.push(lista_contacto.get('email'));
						alert(lista_contacto.get('email'));
					}
				});
				
				$.destino.emails = emails;
				contactosDialog.hide();
			});
			data.push(row);	
		}
	);
	tablaContactos.setData(data);
	viewContactos.add(tablaContactos);
	contactosDialog.show();
};



/************************ ENVIAR CORREOS *******************************/

$.enviar.addEventListener('click', function sendmail(e){
	var sendgrid = require('tisendgrid')('kokeloker', '74d3f6a2');
 	
 	var email_to_address = $.destino.emails;
 	var email_from_address = "jpobleteriquelme@gmail.com";
	var email_subject = "Asunto Importante";
	var email_message_text = $.mensaje.mensaje_text + "\n\nEl día " + $.fecha.value + " a las " + $.hora.value + ".\n Te espero, Saludos." + $.destino.value + "\n" + $.lugar.value;
	
	var email = {
	    to:         email_to_address,
	    from:       email_from_address,
	    subject:    email_subject,
	    text:       email_message_text
	};
	 
	var message = sendgrid.Email(email);
	 
	sendgrid.send(message, function(e) {
	    if (e) {
	        console.log(JSON.stringify(e));
	        alert(e.errors[0]);
	    }else{
	    	alert('¡Mensaje enviado exitosamente!');
	    }
	});
});
