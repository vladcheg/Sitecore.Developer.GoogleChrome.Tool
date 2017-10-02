document.addEventListener('DOMContentLoaded', function () {
    var contexStore = localStorage['sdt_contextmenu'];
    if (!contexStore) {
        return;
    }
    var context_menus = JSON.parse(contexStore);
    
    if (!context_menus && context_menus.lenght < 1)
    {
        return;
    }

    var parent = chrome.contextMenus.create(
	{
	    "title": "Sitecore", "contexts": ["selection"]
	});

    for (var key in context_menus) {
        var menu = context_menus[key];
        if (menu.url && menu.url.charAt(0) == "/") {
            openWithCurrentDomain(parent, menu);
        }
        else {
            openWithNewDomain(parent, menu);
        }
    }






//var item = chrome.contextMenus.create(
//	{ "title": "Go To Item", "parentId": parent, "contexts": ["selection"], "onclick": goToItemOnClick });
  
//var ticket = chrome.contextMenus.create(
//	{ "title": "Go To Ticket", "parentId": parent, "contexts": ["selection"], "onclick": goToTicketOnClick });

});

function openWithCurrentDomain(parent, menu) {
    var item = chrome.contextMenus.create(
	{
	    "title": menu.name, "parentId": parent, "contexts": ["selection"], "onclick": function (info, tab) {
	        var selectedText = info.selectionText;
	        if (selectedText) {
	            var id = tab.id;
	            var tablink = tab.url;
	            var origin = tablink.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];
	            	            
	                if (menu.tab == "currenttab") {
	                    chrome.tabs.update(id, { url: origin + menu.url.replace(/{selectedText}/g, selectedText) });
	                    return;
	                }
	            
	                chrome.tabs.create({ url: origin + menu.url.replace(/{selectedText}/g, selectedText) });

	        }
	    }
	});
}

function openWithNewDomain(parent, menu) {
    var ticket = chrome.contextMenus.create(
	{
	    "title": "Go To Ticket", "parentId": parent, "contexts": ["selection"], "onclick": function (info, tab) {
	        var selectedText = info.selectionText;

	        if (selectedText) {
	                var id = tab.id;
	                    if (menu.tab == "currenttab") {
	                        chrome.tabs.update(id, { url: menu.url.replace(/{selectedText}/g, selectedText) });
	                        return;
	                    }
	                
	                    chrome.tabs.create({ url: menu.url.replace(/{selectedText}/g, selectedText) });
	            
	        }
	    }
	});
}


//var clickHandler = function(e) {
//    var url = e.pageUrl;
//    var buzzPostUrl = "http://www.google.com/buzz/post?";

//    if (e.selectionText) {
//        // The user selected some text, put this in the message.
//        buzzPostUrl += "message=" + encodeURI(e.selectionText) + "&";
//    }

//    if (e.mediaType === "image") {
//        buzzPostUrl += "imageurl=" + encodeURI(e.srcUrl) + "&";
//    }

//    if (e.linkUrl) {
//        // The user wants to buzz a link.
//        url = e.linkUrl;
//    }

//    buzzPostUrl += "url=" + encodeURI(url);

//    // Open the page up.
//    chrome.tabs.create(
//          {"url" : buzzPostUrl });
//};  