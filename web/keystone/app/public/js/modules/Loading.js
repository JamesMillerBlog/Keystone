export let urlid = [],
	models = [],
	linkid = [],
	modelName = [];

$( ".url" ).each(function( index ) {
  urlid[index] = $( this ).text();
});

$( ".link" ).each(function( number ) {
  linkid[number] = $( this ).text();
});

$( ".name" ).each(function( no ) {
  modelName[no] = $( this ).text();
});

export function loadPage(e, selected) {
    var link = $(selected).attr('href');
    console.log("CLICKED "+ link +"!");
    e.preventDefault();
    $( "#loadingScreen" ).css({"z-index": "100"});
	$( "#loadingScreen" ).animate({
	    opacity: 1,
	  }, 500, function() {
	    // Animation complete.
	    window.location.href = link;
	});
};

export function activateForm() {
	let clicked = true;
	let model = $( "#title" ).text();
	let user = $( "#username" ).text();
	let email = $( "#email" ).text();
	$( ".formFeedback" ).keydown(function() {
		self = this;
		if(clicked) {
			$(this).val('');
			clicked = false;
		}
		if(event.keyCode == 13) {
			event.preventDefault();
			if(!clicked) saveDetails(user, email, this.value, model);
	    }

    	$( ".submitForm" ).click(function() { 
    		if(!clicked) saveDetails(user, email, self.value, model);  
    	});
	});
	
	function saveDetails(user, email, details, modelID) {
		clicked = true;
		$.ajax({ 
		   type: "POST",
		   data: { details, user, email },
		   url: "/api/post/"+modelID+"/update",
		   success: function(data){        
		     console.log("email(data.postOne.description)");
		   }
		});
	}
}