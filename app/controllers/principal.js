$.principal.open();


var picker = Ti.UI.createPicker({
});

$.fecha.addEventListener('click', function(e) {
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
 
});


$.hora.addEventListener('click', function(e){
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
});


$.enviar.addEventListener('click', function sendmail(e){
	var sendgrid = require('tisendgrid')('kokeloker', '74d3f6a2');
 	
 	var email_to_address = "vardilesduarte@gmail.com";
 	var email_from_address = "jpobleteriquelme@gmail.com";
	var email_subject = "Asunto Importante";
	var email_message_text = $.mensaje.value + " " + $.fecha.value + " " + $.hora.value;
	
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
	        alert('Mensaje Enviado');
	    }
	});
});

