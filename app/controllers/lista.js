var data = [];
var singleValue = ['id', 'fullName'];
var multiValue = ['email', 'phone'];
var people = Ti.Contacts.getAllPeople();
for (var i=0, ilen=people.length; i<ilen; i++){
	var person = people[i];
	if (JSON.stringify(person[multiValue[1]]) != '{}'){
		if (JSON.stringify(person[multiValue[0]]) != '{}'){
			//Ti.API.info('phone:' + JSON.stringify(person[multiValue[1]]));
			var newContact = Ti.UI.createTableViewRow();
			var vista = Ti.UI.createView({
				borderColor: "#afafaf",
				borderRadius: "5",
				height: "45",
			});				
			var nombreContacto = Ti.UI.createLabel({
				text: person[singleValue[1]],
				left:'5%',
				color: '#000'
			});			
			/*
			var check = Ti.UI.createSwitch({
				type: Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
				width: "45",
				height: "45",
				right: "3%",
				borderColor: "#afafaf",
				borderRadius: "5",
				//backgroundColor: "#fff",
				//color: "#fff",
				value: "false"
			});
			
			/*
			 check.addEventListener('change', function(e){
				Ti.API.info(check.value);
				if(check.value == true){
					check.backgroundColor = "#fff";
					check.color = "#fff";
				} else{
					check.backgroundColor = "#0071bc";
					check.color = "#0071bc";
				}	
			});
			
			*/
			var checkbox = createCheckbox({});
			vista.add(nombreContacto);
			vista.add(checkbox);
			newContact.checkbox = checkbox;
			newContact.nombre = person[singleValue[1]];
			newContact.email = person[multiValue[0]];
			newContact.add(vista);
			data.push(newContact);
		}
	}
};

function createCheckbox (specs) {
    if(typeof specs != "object")
        specs = {};
    specs.width = specs.width || 35;    
    specs.backgroundColor = specs.unCheckedColor || "white";
    specs.height = specs.height || 35;
    specs.border = specs.border || 5;
    specs.right =  specs.right || "3%";
    specs.borderColor = specs.borderColor || "silver";
    specs.borderRadius = specs.borderRadius || 35;
    var viw = Ti.UI.createView(specs);
    function togglecheck () {
        if(!viw.checked) {
            viw.checked = true;
            viw.backgroundColor = specs.checkedColor || "#079fbb";
        }
        else {
            viw.checked = false;
            viw.backgroundColor = specs.unCheckedColor || "white";
        }           
    }
    viw.addEventListener("click",togglecheck);
    return viw;
}

$.guardar.addEventListener('click',function(e){
	if ($.nombre.value != ""){
		var lista = Alloy.createModel('lista',{titulo: $.nombre.value});
		lista.save();
		var id = lista.get('id');
		for (var i in data){
			if (data[i].checkbox.checked){
				var lista_contacto = Alloy.createModel('lista_contacto',{id: id, nombre: data[i].nombre, email: data[i].email});
				lista_contacto.save();						
			}
		}
	}
	$.ventana.close();
});
$.contactList.setData(data);
$.ventana.open();

