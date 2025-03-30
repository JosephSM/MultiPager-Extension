console.log("multipager.js");
console.log(document);

document.addEventListener("mouseup", (e) => {
  var iframe = document.getElementById("Sefaria");
  var idoc = iframe.contentDocument || iframe.contentWindow.document; // ie compatibility

  console.log(idoc.getSelection().toString());
});

if (window.location !== window.parent.location) {
  // The page is in an iFrames
  console.log("The page is in an iFrame");
} else {
  // The page is not in an iFrame
  console.log("The page is not in an iFrame");
}
