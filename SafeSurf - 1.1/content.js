var testdata;
var prediction;

// Checks if '@' is in URL
function isAlphaNumericURL(){
    var search ="@";
    var url = window.location.href;
    if(url.match(search)==null){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}

// Checks if links in anchor tags <a></a> are loaded from different domains
function isAnchorFromDifferentDomain(){
    var totalCount = document.querySelectorAll("a").length
    var identicalCount = getIdenticalDomainCount("a");
    if(((totalCount-identicalCount)/totalCount)<0.31){
        console.log("NP");
        return -1;
    }
    else if((((totalCount-identicalCount)/totalCount)>=0.31) && (((totalCount-identicalCount)/totalCount)<=0.67)){
        console.log("Maybe");
        return 0;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Checks if the favicon is loaded from another domain
function isFaviconDomainUnidentical(){
    var reg = /[a-zA-Z]\//;
    var url = window.location.href;
    if(document.querySelectorAll("link[rel*='shortcut icon']").length>0){
        var faviconurl = document.querySelectorAll("link[rel*='shortcut icon']")[0].href;
        if((url.substring(0,url.search(reg)+1))==(faviconurl.substring(0,faviconurl.search(reg)+1))){
            console.log("NP");
            return -1;
        }
        else{
            console.log("P");
            return 1;
        }
    }
    else{
        console.log("NP");
        return -1;
    }
}

//Detect invalid/blank form submissions
function isFormActionInvalid(){
    var totalCount = document.querySelectorAll("form").length
    var identicalCount = getIdenticalDomainCount("form");
    if(document.querySelectorAll('form[action]').length<=0){
        console.log("NP");
        return -1;
    }
    else if(identicalCount!=totalCount){
        console.log("Maybe");
        return 0;
    }
    else if(document.querySelectorAll('form[action*=""]').length>0){
        console.log("P");
        return 1;
    }
    else{
        console.log("NP");
        return -1;
    }
}

//Check for '-' in URL
function isHypenURL(){
    var reg = /[a-zA-Z]\//;
    var srch ="-";
    var url = window.location.href;
    if(((url.substring(0,url.search(reg)+1)).match(srch))==null){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}


function getIdenticalDomainCount(tag){
    var i;
    var identicalCount=0;
    var reg = /[a-zA-Z]\//;
    var url = window.location.href;
    var mainDomain = url.substring(0,url.search(reg)+1);
    var nodeList = document.querySelectorAll(tag);
    if(tag=="img" || tag=="script"){
        nodeList.forEach(function(element,index) {
        i = nodeList[index].src
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }
      });
    }
    else if(tag=="form"){
        nodeList.forEach(function(element,index) {
        i = nodeList[index].action
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }
      });
    }
    else if(tag=="a"){
        nodeList.forEach(function(element,index) {
        i = nodeList[index].href
        if((mainDomain==(i.substring(0,i.search(reg)+1))) && ((i.substring(0,i.search(reg)+1))!=null) && ((i.substring(0,i.search(reg)+1))!="")){
           identicalCount++;
        }
      });
    }
    else{
        nodeList.forEach(function(element,index) {
        i = nodeList[index].href
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }
      });
    }
    return identicalCount;
}

//Check if site is uding IFrame
function isIframePresent(){
    if(document.querySelectorAll('iframe').length<=0){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Identifies if URL has multiple HTTPS
function isIllegalHttpsURL(){
    var srch1 ="//";
    var srch2 = "https";
    var url = window.location.href;
    if(((url.substring(url.search(srch1))).match(srch2))==null){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Checks if images are loaded from different domains
function isImgFromDifferentDomain(){
    var totalCount = document.querySelectorAll("img").length
    var identicalCount = getIdenticalDomainCount("img");
    if(((totalCount-identicalCount)/totalCount)<0.22){
        console.log("NP");
        return -1;
    }
    else if((((totalCount-identicalCount)/totalCount)>=0.22) && (((totalCount-identicalCount)/totalCount)<=0.61)){
        console.log("Maybe");
        return 0;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Does URL Have IP address in it
function isIPInURL(){
    var reg =/\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}/;
    var url = window.location.href
    if(reg.exec(url)==null){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Checks if length of URL is more than 75 characters
function isLongURL(){
    var url = window.location.href;
    if(url.length<54){
        console.log("NP");
        return -1;
    }
    else if(url.length>=54 && url.length<=75){
        console.log("Maybe");
        return 0;
    }
    else{
        console.log("P");
        return 1;
    }
}

function isMailToAvailable(){
    if(document.querySelectorAll('a[href^=mailto]').length<=0){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}


// Checks if anchor tag has mailto
function isMultiDomainURL(){
    var reg = /[a-zA-Z]\//;
    var srch ="-";
    var url = window.location.href;
    if((url.substring(0,url.search(reg)+1)).split('.').length < 5){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Checks if URL is redirecting using //
function isRedirectingURL(){
    var reg1 = /^http:/
    var reg2 = /^https:/
    var srch ="//";
    var url = window.location.href;
    if(url.search(srch)==5 && reg1.exec(url)!=null && (url.substring(7)).match(srch)==null){
        console.log("NP");
        return -1;
    }
    else if(url.search(srch)==6 && reg2.exec(url)!=null && (url.substring(8)).match(srch)==null){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Checks if scripts are loaded from different domain
function isScLnkFromDifferentDomain(){
    var totalCount = document.querySelectorAll("script").length + document.querySelectorAll("link").length
    var identicalCount = getIdenticalDomainCount("script") + getIdenticalDomainCount("link");
    if(((totalCount-identicalCount)/totalCount)<0.17){
        console.log("NP");
        return -1;
    }
    else if((((totalCount-identicalCount)/totalCount)>=0.17) && (((totalCount-identicalCount)/totalCount)<=0.81)){
        console.log("Maybe");
        return 0;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Checks if phisher has tampered with status bar
function isStatusBarTampered(){
    if((document.querySelectorAll("a[onmouseover*='window.status']").length<=0) || (document.querySelectorAll("a[onclick*='location.href']").length<=0)){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}

//Does URL have less than 20 characters
function isTinyURL(){
    var url = window.location.href;
    if(url.length>20){
        console.log("NP");
        return -1;
    }
    else{
        console.log("P");
        return 1;
    }
}


function predict(data,weight){
    var f = 0;
    // weights of trained SVM
    weight = [3.33346292e-01,-1.11200396e-01,-7.77821806e-01,1.11058590e-01,3.89430647e-01,1.99992062e+00,4.44366975e-01,-2.77951957e-01,-6.00531647e-05,3.33200243e-01,2.66644002e+00,6.66735991e-01,5.55496098e-01,5.57022408e-02,2.22225591e-01,-1.66678858e-01];
    // Computing forward pass to determine of phishing or not
    for(var j=0;j<data.length;j++) {
      f += data[j] * weight[j];
    }
    return f > 0 ? 1 : -1;
}

//array of the data collected from website
testdata = [isIPInURL(),isLongURL(),isTinyURL(),isAlphaNumericURL(),isRedirectingURL(),isHypenURL(),isMultiDomainURL(),isFaviconDomainUnidentical(),isIllegalHttpsURL(),isImgFromDifferentDomain(),isAnchorFromDifferentDomain(),isScLnkFromDifferentDomain(),isFormActionInvalid(),isMailToAvailable(),isStatusBarTampered(),isIframePresent()];

//predicts phishing or not
prediction = predict(testdata);


// Sends prediction to background.js
chrome.extension.sendRequest(prediction);



