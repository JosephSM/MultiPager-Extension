console.log("sefaria-talmud.js");
console.log(document);

if (window.location !== window.parent.location) {
  // The page is in an iFrames
  console.log("The page is in an iFrame");
  document.querySelector(".cookiesNotification").remove();
document.querySelector("#bannerMessage").remove();
  document.querySelector(".readerControlsOuter").remove();
  document.querySelector("div.header[role=banner]").remove();
  document.querySelector(".readerContent").style.height = "100%";
  document.querySelector("#panelWrapBox").style.height = "100%";
  document.querySelector("#panelWrapBox").style.top = "0px";
} else {
  // The page is not in an iFrame
  console.log("The page is not in an iFrame");
}
