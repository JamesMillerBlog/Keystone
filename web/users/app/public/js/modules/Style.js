import { activateForm } from './Loading';

export function styles(iframes) {
	if(iframes > 1) {
		//define the old parent
		let oldParent = document.getElementById('sketchContainer');	
		let wrapper;
		let firstIframe = document.getElementById('linkID1');

		for (var x = 1; x < iframes+1; x++) {
			$( "#linkID"+x ).addClass( "twinModel" );
			let oldChild = document.getElementById('linkID'+x);
			if( isOdd(x) ) {
				totalSections++;
				wrapper = document.createElement('section');
				wrapper.setAttribute( "id", 'section'+totalSections );
				oldParent.appendChild(wrapper);
			}
			wrapper.appendChild(oldChild);
			if( isOdd( iframes ) ) $( "#linkID"+iframes ).removeClass( "twinModel" ).addClass( "oddModel" );
			resizeStyles( iframes );
		}
	} else singleStyle();
	$( ".url" ).remove();
	$( ".link" ).remove();
	$( ".name" ).remove();
}


function singleStyle(){
	$( ".title" ).remove();
	$( ".scrollOver" ).remove();
	let description = $( ".description" ).text();
	description = description.replace(/(<([^>]+)>)/ig,"");
	let form = $("<form class = 'formInput'></form>");
	form.append("<input class = 'formFeedback' type='text' name='feedback' autocomplete = 'off' value='"+ description + "'>")
	form.append("<input class = 'submitForm' type=button value=Save>");
	$( "#sketchContainer" ).append( form );
	$( ".description" ).remove();
	activateForm();
}


let h = window.innerHeight, totalSections = 0;

function resizeStyles(iframes){
	h = window.innerHeight;
	$( "section").height(h/totalSections);	
	$( "iframe").height(h/totalSections);	
	$( ".linkID").height(h/totalSections);	
	if(isOdd(iframes)) $( "#iframe"+iframes ).height(h/totalSections);	

}
function isOdd(num) { return num % 2; }

$( window ).resize(resizeStyles);