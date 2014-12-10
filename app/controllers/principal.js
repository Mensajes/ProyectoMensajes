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
						height: "40",						
					});					
				    var row = Ti.UI.createTableViewRow({});
				    var label = Ti.UI.createLabel({
						text: (json.results[i].formatted_address).toString(),
						left:'5%',
						color: '#fff',
						lat: (json.results[i].geometry.location.lat).toString(),
						lon: (json.results[i].geometry.location.lng).toString()
					});
					
					row.addEventListener('click',function(e){
						//alert(label.text);
						$.lugar.value = label.text;
						$.lugar.lat = label.lat;
						$.lugar.lon = label.lon;
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
	var aview = Ti.UI.createView({
		height: "400"
	});
	
	var tablaMensajes = Ti.UI.createTableView({
		height: "400"	
	});
	
	var mensajeDialog = Ti.UI.createOptionDialog({
		title:"Mensajes Predet.", 
		androidView: aview,
		cancel: 2,
		selectedIndex: 2,
	  	destructive: 0,
	  	buttonNames: ['Aceptar', 'Cancelar']
	});
	data = [];
	var mensajes = Alloy.createCollection('mensaje'); 
	mensajes.fetch(); // Grab data from persistent storage
	mensajes.each(
		function (mensaje){
			var view = Ti.UI.createView({
				height: "40"
			});
			
			var row = Ti.UI.createTableViewRow({
				height: "40"
			});
			
			var label = Ti.UI.createLabel({
				value: mensaje.get('titulo'),
				left: "5%",
				color: '#fff',
				height: '30'
			});
			
			row.addEventListener('click', function(e){
				$.mensaje.value = mensaje.get('titulo');
				$.mensaje.mensaje_text = mensaje.get('mensaje');
				mensajeDialog.hide();
			});
			view.add(label);
			row.add(view);
			data.push(row);	
		}
	);
	aview.add(tablaMensajes);
	tablaMensajes.setData(data);
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
						//alert(lista_contacto.get('email'));
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
	/***CONFIRMACIÓN CORREO***/
	var aview = Ti.UI.createView({
		height: "400"
	});
	
	var texto = Ti.UI.createTextField({
		width:"80%",
		top: "3%",
		hintText: "Escriba un correo valido"
	});
	aview.add(texto);
	var correoDialog = Ti.UI.createOptionDialog({
		title:"Correo", 
		androidView: aview,
		cancel: 2,
		selectedIndex: 2,
	  	destructive: 0,
	  	buttonNames: ['Aceptar','Cancelar']
	});
	correoDialog.addEventListener('click', function(e){
			if(e.index == 0){
				if (texto.value != ""){
					    var patt = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					if (patt.test(texto.value)){
						var config = Alloy.createModel('config',{email: texto.value});
						config.save();
					} else{
						alert('Correo no valido!');
						texto.value = "";
					}
				} else{
					alert('no se ingreso ningun correo!');
				}
			}
			correoDialog.hide();
	});
		
	/***************************/
	var configs = Alloy.createCollection('config');
	configs.fetch();
	var configurado = false;
	var email = "";
	configs.each(
		function (config){
			configurado = true;
			email = config.get('email');
		}
	);
	if ($.mensaje.value != ""){
		if ($.destino.value != ""){
			if (configurado){
				var sendgrid = require('tisendgrid')('kokeloker', '74d3f6a2');
			 	var email_to_address = $.destino.emails;
			 	var email_from_address = email;
				var email_subject = $.mensaje.value;
				var email_map_url = 'https://www.google.cl/maps/@'+$.lugar.lat+','+$.lugar.lon+',15z';
				var email_map_static_img = 'http://maps.googleapis.com/maps/api/staticmap?center='+$.lugar.lat+','+$.lugar.lon+'&zoom=15&size=300x300&sensor=false';
				var email_message_text = $.mensaje.mensaje_text + "\n\n"+
										"El día " + $.fecha.value + " a las " + $.hora.value + ", en\n\n" + 
										$.lugar.value +"\n\n"+
										email_map_url;
				var email = {
				    to:         email_to_address,
				    from:       email_from_address,
				    subject:    email_subject,
				    text:       email_message_text
				};
				var message = sendgrid.Email(email);
				var viewIndicator = Ti.UI.createView({
					height:Ti.UI.SIZE
				});
				var activityIndicator = Ti.UI.createActivityIndicator({
				  color: 'white',
				  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
				  message: 'Enviando...',
				  style:Ti.UI.ActivityIndicatorStyle.BIG,
				  top:10,
				  left:10,
				  height:Ti.UI.SIZE,
				  width:Ti.UI.SIZE
				});
				viewIndicator.add(activityIndicator);
				var enviandoDialog = Ti.UI.createOptionDialog({
					title:"Enviando...",
					androidView: viewIndicator,
				  	destructive: 0,
				  	height:Ti.UI.SIZE
				});
				viewIndicator.addEventListener('open', function (e) {
				  activityIndicator.show();
				});
				activityIndicator.show();
				enviandoDialog.show();
				sendgrid.send(message, function(e) {
					enviandoDialog.hide();
				    if (e) {
				        console.log(JSON.stringify(e));
				        alert(e.errors[0]);
				    }else{
				    	alert('¡Mensaje enviado exitosamente!');
				    	$.fecha.value = "";
				    	$.hora.value = "";
				    	$.mensaje.value = "";
				    	$.destino = "";
				    	$.lugar = "";
				    }
				});				
			} else{
				alert('No ha sido configurado');
				correoDialog.show();
				
			}	
		}else{
			alert('Seleccionar destinatarios');
		}	
	}else{
		alert('Seleccionar mensaje a enviar');
	}	
});
