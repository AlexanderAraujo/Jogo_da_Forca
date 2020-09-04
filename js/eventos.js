function keyUpLetterInput(obj, e) {
    obj.value = obj.value.toUpperCase();
	
	if (e.keyCode === 13){
    	buscaLetra();
	}
}

function keyUpLetterInput2(obj, e) {
	obj.value = obj.value.toUpperCase();
	
	if (e.keyCode === 13){
    	tentaPalavra();
	}
}	

function apenasLetras(evt, e) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
        ((evt.which) ? evt.which : 0));

    if (charCode > 31 && (charCode < 65 || charCode > 90) &&
        (charCode < 97 || charCode > 122 && charCode < 199) || charCode > 200 && charCode < 231 || charCode > 231) {		        
        return false;
    }

    return true;
}

function apenasLetras2(evt, e) {
	document.getElementById("digitaLetra").addEventListener('keydown', function(e) {    
	    if (e.key == "Enter") {
	      tentaPalavra();
	    }
	});			

    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
        ((evt.which) ? evt.which : 0));
    
    if (charCode > 32 && (charCode < 65 || charCode > 90) &&
        (charCode < 97 || charCode > 122 && charCode < 199) || charCode > 200 && charCode < 231 || charCode > 231) {		        
        return false;
    }

    return true;
}