// Simple javascript snippet for adding kippt links to tweets in twitter.
// Based on the kippt button fork https://github.com/jenius/kippt-button
// How to run: Copy & Paste this code to Google Chrome console while on twitter.com :P
// I'm looking for someone to help me port this into a browser extension, if you know how, please email me
// 2012
// Juha Tauriainen juha@bin.fi https://github.com/juhq
/*jslint browser: true, plusplus: true */
(function (document, window) {
    "use strict";
    var kipptcss, kippt_style_tag, elements, i, element, title, url, button;
    if (document.getElementsByClassName("kippt-css").length === 0) {

        // css
        kipptcss = ".kippt-save-button {" +
                  "  background:url('http://addons.kippt.com/save-button/img/kippt-btn.png') no-repeat;" +
                  "  height:20px;" +
                  "  width:62px;" +
                  "  display:block;" +
                  "  position:relative;" +
                  "  margin-top:5px;" +
                  "}" +
                  ".kippt-save-button:hover {" +
                  "  background-position:0 -30px;" +
                  "}" +
                  ".kippt-save-button:active {" +
                  "  background-position:0 -60px;" +
                  "}" +
                  ".kippt-save-button span {" +
                  "  display: none;" +
                  "}";

        // inject styles
        kippt_style_tag = document.createElement('style');
        kippt_style_tag.className = "kippt-css";
        kippt_style_tag.innerHTML = kipptcss;
        document.getElementsByTagName('head')[0].appendChild(kippt_style_tag);
    }

    function createButton(parent, url, title, source, via) {
        // no dublicate buttons
        if (parent.getElementsByClassName("kippt-save-button").length > 0) {
            return;
        }
        button = document.createElement("a");
        button.className = "kippt-save-button";
        button.innerHTML = '<span>Kippt it!</span>';
        parent.appendChild(button);

        // add click event
        button.addEventListener('click', function (e) { // ie
            if (e.preventDefault()) { e.preventDefault(); }

            var windowUrl = "https://kippt.com/extensions/new?url=" + url + "&title=" + escape(title) + "&source=" + source + "&via=" + via;
            window.open(windowUrl, "kippt-popup", "location=no,menubar=no,status=no,titlebar=no,scrollbars=no,width=420,height=192");
            return false;
        });
    }

    elements = document.getElementsByClassName("stream-items")[0].getElementsByClassName("content");
    for (i = 0; i < elements.length; i++) {
        element = elements[i];
        title = element.getElementsByClassName("js-tweet-text")[0].textContent.trim();
        url = element.getElementsByClassName("js-permalink")[0].href;
        createButton(element, url, title, "twitter.com", "kippt button on twitter ;)");
    }

}(document, window));