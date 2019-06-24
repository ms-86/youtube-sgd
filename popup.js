let disableRelatedVideos = document.getElementById('related-video-switch');

disableRelatedVideos.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'var div1 = document.getElementById("related"); div1.style.display = "none";'});
  });
};

let disableCommentsSection = document.getElementById('comments-section-switch');

disableCommentsSection.onclick = function(element) {
	if (this.checked) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'var div1 = document.getElementById("comments"); div1.style.display = "none";'});
		});
	}
	else
	{
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'var div1 = document.getElementById("comments"); div1.style.display = "block";'});
		});
	}
  
};