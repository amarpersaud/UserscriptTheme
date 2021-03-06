// ==UserScript==
// @name     Wordpress Theme script
// @include  *
// @namespace WordpresThemeScript
// @version      1
// @description  Make background black and text white
// @author       Amar Persaud
// @grant        none


// ==/UserScript==

(function() {
    'use strict';

var enabledGlobally = true;

var font_size = '20px';
var font_url = "https://fonts.googleapis.com/css?family=Open+Sans";
var font_family = '"Open Sans"';

var backgroundColor = "#000";
var foregroundColor = "#fff";
var linkColor = "#ff6666"

var cssLink = "https://cdn.rawgit.com/amarpersaud/UserscriptTheme/master/style.css"

var rules = `:root{--font-size:${font_size};--font-family:${font_family};--background-color:${backgroundColor};--foreground-color:${foregroundColor};--link-color:${linkColor};}`;


var includedSites = ["wp","wordpress", "gravitytales", "wuxiaworld", "webnovel"];
var excludedSites = ["novelupdates"];

var head = document.getElementsByTagName("head")[0];

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
		var s = document.getElementsByClassName("lite-ad");
		for (i = 0; i < s.length; i++) {
			s[i].style = "display:none !important;";
		}
	}catch(err){}
}

function isSelectedSite(){
    if(enabledGlobally){return true;}
	var domainPath = window.location.toLowerCase();

	for(i = 0; i < excludedSites.length; i++)
	{
		if(domainPath.includes(excludedSites[i])){
			return false;
		}
	}
	for(i = 0; i < includedSites.length; i++)
	{
		if(domainPath.includes(includedSites[i])){
			return true;
		}
	}



	var generatorElem = document.getElementsByName("generator");
	if(generatorElem != null && generatorElem.length > 0){
		generatorContent = generatorElem[0].getAttribute("content").toLowerCase();

		if(generatorContent.includes("wordpress")){
			return true;
		}
	}



	if(document.head.innerHTML.includes("wp-")){
		return true;
	}
	if(window.location.pathname.includes("wp-")){
		return true;
	}
	return false;
}

function ApplyStyles(){

	console.log("Checking if selected site");

	if(isSelectedSite()){
		console.log("Is Selected Site");
		head = document.getElementsByTagName("head")[0];

		head.innerHTML += "<style>" + rules + "</style>";

		head.innerHTML += `<link rel="stylesheet" type="text/css" href="` + font_url + `"/>`;

		head.innerHTML += `<link rel="stylesheet" type="text/css" href="` + cssLink + `"/>`;

		removeGoogleAds();

		hideElements(["wpadminbar"]);
	}
}

console.log("Applying Onload");

document.body.onload = ApplyStyles();

})();
