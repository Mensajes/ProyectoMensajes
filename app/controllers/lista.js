
var singleValue = ['id', 'fullName'];

var multiValue = ['email', 'phone'];

var people = Ti.Contacts.getAllPeople();

var activityIndicator = Ti.UI.createActivityIndicator({
  color: '#079fbb',
  font: {fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'},
  message: 'Loading...',
  style: Ti.UI.ActivityIndicatorStyle.BIG_DARK,
  height:Ti.UI.SIZE,
  width:Ti.UI.SIZE
});

var indicatorRow = Ti.UI.createTableViewRow();
indicatorRow.add(activityIndicator);
$.contactList.appendRow(indicatorRow);

activityIndicator.show();

for (var i=0, ilen=people.length; i<ilen; i++){
	var person = people[i];
	
	if (JSON.stringify(person[multiValue[1]]) != '{}'){
		if (JSON.stringify(person[multiValue[0]]) != '{}'){
			Ti.API.info('phone:' + JSON.stringify(person[multiValue[1]]));
		
			var newContact = Ti.UI.createTableViewRow();
			
			var vista = Ti.UI.createView({
				borderColor: "#afafaf",
				borderRadius: "5",
				height: "45",
				//backgroundColor:'#e7e9e7',	
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
			//vista.add(check);
			vista.add(checkbox);
			newContact.add(vista);
			$.contactList.appendRow(newContact);
		}
	}
};

activityIndicator.hide();

function createCheckbox (specs) {
    if(typeof specs != "object")
        specs = {};
    specs.width = specs.width || 35;
    
    specs.backgroundColor = specs.unCheckedColor || "white";
    specs.height = specs.height || 35;
    specs.border = specs.border || 5;
    specs.right =  specs.right || "3%";
    specs.borderColor = specs.borderColor || "silver";
    specs.borderRadius = specs.borderRadius || 10;
    var viw = Ti.UI.createView(specs);

    function togglecheck () {
        if(!viw.checked) {
            viw.checked = true;
            viw.backgroundColor = specs.checkedColor || "#079fbb";
            //backgroundColor: "#079fbb",
        }
        else {
            viw.checked = false;
            viw.backgroundColor = specs.unCheckedColor || "white";
        }           
    }
    viw.addEventListener("click",togglecheck);

    return viw;
}

$.ventana.open();

