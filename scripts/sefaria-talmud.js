function makeItHappen(arr, f) {
  arr.forEach((x) => setTimeout(() => f(), x));
}

makeItHappen([500, 1000, 1500, 2000, 3000, 4000, 10000], () => {
  console.log("sefaria-talmud.js");
  console.log(document);

  if (window.location !== window.parent.location) {
    // The page is in an iFrames
    console.log("The page is in an iFrame");
    document.querySelector(".cookiesNotification").remove();
    document.querySelector(".transLangPrefSuggBann").remove();
    document.querySelector("#bannerMessage").remove();
    // document.querySelector(".readerControlsOuter").remove();
    let rco = document.querySelector(".readerControlsOuter");
    rco.style.background = "transparent";
    rco.style.position = "fixed";
    rco.style.width = "100%";
    let hrc = document.querySelector("header.readerControls");
    hrc.style.background = "None";
    hrc.style.boxShadow = "None";
    let rtt = document.querySelector(".readerTextToc");
    console.log(rco, hrc, rtt);
    rtt.remove();
    let sb = hrc.querySelector(".saveButton.tooltip-toggle");
    let rb = hrc.querySelector(".rightButtons");
    // rb.firstElementChild().remove();
    sb.remove();
    document.querySelector("div.header[role=banner]").remove();
    let rc = document.querySelector(".readerContent");
    rc.style.height = "100%";
    document.querySelector("#panelWrapBox").style.height = "100%";
    document.querySelector("#panelWrapBox").style.top = "0px";
  } else {
    // The page is not in an iFrame
    console.log("The page is not in an iFrame");
  }
});
