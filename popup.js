function restore_options() {
	var url = '';
	
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {		
		var videoToggle = 'related-video-switch';
		var commentToggle = 'comments-section-switch';
		
		url = tabs[0].url + '-' + videoToggle;
		
		chrome.storage.sync.get([url], function(items) { 
			console.log('Key: ' + url);
			console.log('Value: ' + items[url]);
		
			var chbox = new Object();
			chbox.id = videoToggle;
			chbox.checked = items[url];
			
			document.getElementById(videoToggle).checked = items[url];
			
			refresh_section(chbox);
		} );

		url1 = tabs[0].url + '-' + commentToggle;
		
		chrome.storage.sync.get([url1], function(items) { 
			console.log('Key: ' + url1);
			console.log('Value: ' + items[url1]);
		
			var chbox = new Object();
			chbox.id = commentToggle;
			chbox.checked = items[url1];
			
			document.getElementById(commentToggle).checked = items[url1];
			
			refresh_section(chbox);
		} );
	});
}

function save_options() {
	var clickedElem = this;
	
	switch (clickedElem.id) {
		case 'related-video-switch':
			toggleValue = document.getElementById('related-video-switch').checked;
			break;
		case 'comments-section-switch':
			toggleValue = document.getElementById('comments-section-switch').checked;
			break;
		default:
			changedSection = '';
	}
	
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		var url = '';		
		url = tabs[0].url;
		url += '-' + clickedElem.id;

		chrome.storage.sync.set({
			[url]: toggleValue
		},
		function() {
			  // Notify that we saved.
			  console.log('Key: ' + url);
			  console.log('Value: ' + toggleValue);
			  
		});
		
		refresh_section(clickedElem);
		
	});
	
	
}

function refresh_section(elem) {

	var changedSection = '';
	var displayValue = '';
	
	switch (elem.id) {
		case 'related-video-switch':
			changedSection = "related";
			break;
		case 'comments-section-switch':
			changedSection = "comments";
			break;
		default:
			changedSection = '';
	}
	
	if (elem.checked) {
		displayValue = "none";
	}
	else {
		displayValue = "block";
	}

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'var div1 = document.getElementById("'+changedSection+'"); div1.style.display = "'+displayValue+'";'});
			});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('related-video-switch').addEventListener('click', save_options);
document.getElementById('comments-section-switch').addEventListener('click', save_options);