// Simple script that exports a users "Saved For Later" list out of Feedly
// as a JSON string.
//
// This was intended for use in the Google Chrome's "Inspector" tool so your
// mileage may vary if used in other contexts.
//
// Format of JSON is as follows:
//  [
//    {
//      title: "Title",
//      url: "www.example.com/title",
//      time: "Sunday "
//    }
//  ]
//
// How to use:
// 1) Open up Google Chrome
// 2) Login to Feedly and go to the "Saved For Later" list.
// 3) Keep scrolling down the page until all saved documents have been loaded
// 4) Right click on the page and select "Inspect Element"
// 5) Inside the "Inspector" tool, click the "Console" tab.
// 6) Paste the script below into the console
// 7) Type copy(json) into the console
// 
// Once you have followed the steps above, your list should be saved to your 
// clipboard and can be accesed by pressing "cmd + v" or "ctrl + v" to paste
// the file somewhere.
//
// NOTE: You must switch off SSL (http rather than https) or jQuery won't load!

// Feedly doesn't use jQuery so firstly inject it into the page
if(!(window.jQuery)) {
  script = document.createElement('script');
  script.setAttribute('src', 'https://code.jquery.com/jquery-latest.min.js');
  script.setAttribute('type', 'text/javascript');
  script.onload = copyToClipboard;
  document.getElementsByTagName('head')[0].appendChild(script);
} else {
  copyToClipboard();
}

json = ""
function copyToClipboard() {
  // Loop through the DOM, grabbing the information from each bookmark
  map = jQuery("#section0_column0 div.u0Entry.quicklisted").map(function(i, el) {
    var $el = jQuery(el);
    var regex = /published:(.*)\ --/i;
    return {
      title: $el.data("title"),
      url: $el.data("alternate-link"),
      time: regex.exec($el.find("div.lastModified span").attr("title"))[1]
    };
  }).get(); //  Convert jQuery object into an array

  // Convert to a nicely indented JSON string
  json = JSON.stringify(map, undefined, 2)
}
