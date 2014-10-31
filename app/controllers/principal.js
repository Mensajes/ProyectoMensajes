$.principal.open();


var picker = Ti.UI.createPicker({
});

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




/*$.hora.addEventListener('click', function(e){
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
});*/

/*$.fecha.addEventListener('click', function(e) {
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
 
});*/

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
	
	texto.addEventListener('change', function(e){
		xhr = Titanium.Network.createHTTPClient();
		var query = texto.value; // or whatever you want to forward geocode
		xhr.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query);
		xhr.onload = function() {
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
				view.add(label);
				row.add(view);
				tablaLugares.appendRow(row);
				
		    }
		};
		xhr.send();
	});
	
	aview.add(texto);
	aview.add(tablaLugares);
	var lugaresDialog = Ti.UI.createOptionDialog({
		title:"Ubicación", 
		androidView: aview,
		cancel: 2,
		selectedIndex: 2,
	  	destructive: 0,
	  	buttonNames: ['Aceptar', 'Cancelar']
	});
	lugaresDialog.show();
};

var mensajeDialog = Ti.UI.createOptionDialog({
		title:"Mensajes Predet.", 
		cancel: 2,
		selectedIndex: 2,
	  	destructive: 0,
	  	options: ['1° Mensaje', '2° Mensaje', '3° Mensaje'],
	  	buttonNames: ['Aceptar', 'Cancelar'],
});

function selectMensaje(e){
	mensajeDialog.show();
};

mensajeDialog.addEventListener('click',function(e){
    //alert('You Clicked' + e.source.options[e.index]);
    $.mensaje.value = e.source.options[e.index];
});

var contactosDialog = Ti.UI.createOptionDialog({
		title:"Listas Contactos", 
		cancel: 2,
		selectedIndex: 2,
	  	destructive: 0,
	  	options: ['1° Lista', '2° Lista', '3° Lista'],
	  	buttonNames: ['Aceptar', 'Cancelar'],
});

function selectLista(e){
	contactosDialog.show();
};

contactosDialog.addEventListener('click',function(e){
//    alert('You Clicked' + e.source.options[e.index]);
    $.destino.value = e.source.options[e.index];
});



/************************ ENVIAR CORREOS *******************************/

$.enviar.addEventListener('click', function sendmail(e){
	var sendgrid = require('tisendgrid')('kokeloker', '74d3f6a2');
 	
 	var email_to_address = "vardilesduarte@gmail.com";
 	var email_from_address = "jpobleteriquelme@gmail.com";
	var email_subject = "Asunto Importante";
	var email_message_text = $.mensaje.value + "\n" + $.fecha.value + "\n" + $.hora.value + "\n" + $.destino.value + "\n" + $.lugar.value;
	
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
