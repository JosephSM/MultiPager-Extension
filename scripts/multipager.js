if (window === window.top) {
  // inside iframe

  var eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

  eventer(messageEvent, function (e) {
    let [prop, val, obj] = e.data;
    //THIS IS BE DONE DIRECTLY ON THE INDEX.HTML PAGE!!!!!!!!
    // let iframe = Array.from(document.querySelectorAll("iframe")).filter((x) => x.contentWindow === e.source)[0]
    // let title = Array.from(document.querySelectorAll(".accordian-item>div")).filter(x => x.querySelector("iframe").contentWindow === e.source)[0].firstElementChild.innerText
    // if (prop === "noscroll")
    //     settingsProxy.accordions[title].noscroll = val
    // else if (prop === "scrollY"){
    //     settingsProxy.accordions[title].scrollY = val
    // }

    // console.log(`Prop ${prop} set to ${val} on ${e.origin}`, e);
    // const iframes = Array.from(document.querySelectorAll("iframe"));

    // for (const iframe of iframes) {
    //   // Don't send it back to the source iframe
    //   if (iframe.contentWindow !== e.source) {
    //     iframe.contentWindow.postMessage([prop, val, obj], "*");
    //   } else if (prop === "Page Loaded") {
    //     iframe.contentWindow.postMessage(["Settings Drop", "hello", "hi"], "*");
    //   }
    // }
  });
}

window.addEventListener("message", function (e) {
  if (e.data?.type === "forward-paste-to-ocr") {
    // Relay to the OCR iframe
    const ocrIframe = Array.from(document.querySelectorAll("iframe")).find(
      (f) => f.src.includes("i2ocr") || f.dataset.role === "ocr"
    );

    if (ocrIframe?.contentWindow) {
      ocrIframe.contentWindow.postMessage(
        {
          type: "simulate-paste",
          file: e.data.file,
        },
        "*"
      );
    }
  }
});
