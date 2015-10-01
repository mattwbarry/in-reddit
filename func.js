chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	function(tabs){
		
		url = tabs[0].url;
		$.getJSON("http://www.reddit.com/search.json?q=url" + encodeURIComponent(':' + url), function(data) { 
			var posts = data.data.children;

		    if (posts.length > 0) {
		    	chrome.browserAction.setBadgeText({'text': 'y'});
		    	chrome.browserAction.setBadgeBackgroundColor({'color': '#00ff00'});
		    	postData = posts[0].data;
				console.log(postData);
		    	if (postData.title.length > 25) {
    				postData.title = postData.title.substring(0, 24) + "...";
		    	}
		    	$('#title').html(postData.title);
		    	$('#title').attr('href', 'http://www.reddit.com' + postData.permalink);
		    	$('#subreddit').attr('href', 'http://www.reddit.com/r/' + postData.subreddit);
		    	$('#subreddit').html(postData.subreddit);
				$('#score').html(postData.score)
		    }
		    else {
		    	chrome.browserAction.setBadgeText({'text': 'n'});
		    	chrome.browserAction.setBadgeBackgroundColor({'color': '#ff0000'});
		    	$('body').html('Nope. Post it yourself!');
		    }

		});
		

	}
);
