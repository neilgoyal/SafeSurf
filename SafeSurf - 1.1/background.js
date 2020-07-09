chrome.extension.onRequest.addListener(function(prediction){
    if (prediction == 1){
        chrome.browserAction.setPopup({popup: 'popup_mal.html'})
        chrome.tabs.create({url:"popup_mal.html"});
    }
    else if (prediction == -1){
        chrome.browserAction.setPopup({popup: 'popup_safe.html'})
    }
});
