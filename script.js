// ==UserScript==
// @name     Wordpress Theme script
// @version  1
// @grant    none
// @include  *
// @namespace WordpresThemeScript
// ==/UserScript==


var font_size = 20;
var font_url = "https://fonts.googleapis.com/css?family=Open+Sans";
var font_family = "Open Sans";

var backgroundColor = "#000";
var foregroundColor = "#fff";
var linkColor = "#ff6666"


var rules = ":root{--font-size:${font_size};--font-url:${font_url};--font-family:${font_family};--background-color:${backgroundColor};--color:${foregroundColor};--link-color:${linkColor};}";


var includedSites = ["wordpress", "gravitytales", "wuxiaworld", "webnovel"]

function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

function hideElement(elem){
	if (elem != null) {
		elem.style.visibility = "hidden";
	}
}

function hideElements(elements) {
	for (i = 0; i < elements.length; i++) {
		var elem = document.getElementById(elements[i]);
		hideElement(elem);
	}
}

function removeGoogleAds() {
	try{
		s = document.getElementsByClassName("lite-ad");
		for (i = 0; i < s.length; i++) {
			s[i].style = "display:none !important;";
		}
	}catch(err){}
}

function isSelectedSite(){
	var generatorElem = document.getElementsByName("generator");
	if(generatorElem != null && generatorElem.length > 0){
		generatorContent = generatorElem[0].getAttribute("content").toLowerCase();
		
		if(generatorContent.includes("wordpress")){
			return true;
		}	
	}
	if(window.location.pathname.includes("wp")){
		return true;
	}
	var domainPath = window.location.hostname.toLowerCase();
	for(i = 0; i < includedSites.length; i++)
	{
		if(domainPath.includes(includedSites[i])){
			return true;
		}
	}
	return false;
}

function ApplyStyles(){
	
	console.log("Checking if selected site");

	if(isSelectedSite()){
		console.log("Is Selected Site");
		head = document.getElementsByTagName("head")[0];
		
		//text = '<style>' + font_face + '.wrapper{margin: 0 !important; width: 100%;} #a-page{margin:0 !important;} *{border:none !important;box-shadow:none !important;outline: none !important;text-shadow:none !important; background-color: ' + backgroundColor + ' !important; background: ' + backgroundColor + ' !important; color: ' + foregroundColor + ' !important;font-size:' + font_size + 'px !important; ' + font_rules + '}a{text-decoration:underline !important;color: ' + linkColor + ' !important;}#lite-content{padding:0 !important;}p{text-indent:1em !important; text-align: left !important; } </style>';

		
		head.innerHTML += "<style>" + rules + "</style>";
		
		removeGoogleAds();

		hideElements(["wpadminbar"]);
	}
}

console.log("Applying Onload");
	
document.body.onload = ApplyStyles();;
