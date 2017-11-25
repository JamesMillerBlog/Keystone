export class SketchfabModel{
	constructor(urlid, linkid, name, totalLinks, number){
		let version = '1.0.0';
		this.api = null;
		self = this;
		this.client = new Sketchfab( version, this.createIframe(this.createContainer(linkid, name)) );
		this.requestSketchfabModel(urlid);
		this.checkIframeLoaded(number+1, totalLinks);
	}

	createContainer(linkContainer, name){
		let totalContainers = document.getElementsByClassName("linkID").length+1;
		let linkID = "linkID"+ totalContainers;
		let link = document.createElement( "a" );
		// let name = $( ".name" ).text();
		link.setAttribute( "href", linkContainer );
		link.setAttribute( "id", linkID );
		link.setAttribute( "class", "linkID" );

		let title = document.createElement("div");
		title.setAttribute("class", "title");
		title.setAttribute("id", "title" + totalContainers);
		title.append(name);
		

		let scrollID = "scrollID"+ totalContainers;
		let scrollOver = document.createElement( "div" );
		scrollOver.setAttribute( "id", scrollID );
		scrollOver.setAttribute( "class", "scrollOver" );
		$( link ).append( scrollOver );
		$( link ).append( title );
		$( "#sketchContainer" ).append( link );
		return linkID;
	}

	createIframe(container){
		let totalIframes = document.getElementsByTagName("iframe").length+1;
		let iframeID = "iframe"+ totalIframes;
		let iframe = document.createElement( "iframe" );
		iframe.setAttribute( "id", iframeID );
		$( "#" + container ).append( iframe );
		return iframe;
	}

	requestSketchfabModel(urlid){
		self.api = urlid;
		this.client.init( urlid, {
			success: function onSuccess( api ){
				self.api = api;
				api.start();
				api.addEventListener( 'viewerready', function() {
					// API is ready to use
					console.log( 'Viewer is ready' );
					$( "#loadingScreen" ).animate({
					    opacity: 0,
					  }, 500, function() {
					    $( "#loadingScreen" ).css({"z-index": "0"});
					});
				});
			},
			error: function onError() {
				console.log( 'Viewer error' );
			}
		} );
	}

	checkIframeLoaded(iframe, total) {
    	$("#iframe"+iframe).load(function() {
    		let oldParent = document.getElementById('sketchContainer');
			let tempIframe = document.createElement('div');
			tempIframe.setAttribute( "class", 'loadingIframe');
			tempIframe.setAttribute( "id", 'loadingIframe'+iframe );
			oldParent.appendChild(tempIframe);
			if(total == $( ".loadingIframe" ).length) {
				$( "#loadingScreen" ).animate({
				    opacity: 0,
				  }, 500, function() {
				    $( "#loadingScreen" ).css({"z-index": "0"});
				});
				$( ".loadingIframe" ).remove();
			}
		});
	}
}