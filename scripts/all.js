window.onload = () => {
  //   console.log("Dom loaded");
  if (window.self !== window.top) {
    // The page is in an iFrame

    //Add No Scroll Button
    const noScrollBtn = document.createElement("button");
    noScrollBtn.className = "no-scroll-btn";
    noScrollBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M0 192l176 0L176 0 160 0C71.6 0 0 71.6 0 160l0 32zm0 32L0 352c0 88.4 71.6 160 160 160l64 0c88.4 0 160-71.6 160-160l0-128-192 0L0 224zm384-32l0-32C384 71.6 312.4 0 224 0L208 0l0 192 176 0z"/>
      </svg>
    `;
    document.body.insertBefore(noScrollBtn, document.body.firstChild);

    // When childSettings object is changed proxyHandler is run
    let childSettings = {
      noscroll: false,
      selection: "",
      scrollY: 0,
    };

    const proxyHandler = {
      set(obj, prop, value) {
        obj[prop] = value;
        console.log(`Property ${prop} changed to ${value}: ${obj}`);
        // parent.postMessage([prop, value, obj], "*");
        parent.postMessage([prop, value, obj], "https://josephsm.github.io");
        if (prop === "noscroll") {
          if (window.location.href.startsWith("https://www.sefaria.org")) {
            document
              .querySelector("div.textColumn")
              .classList.toggle("no-scroll");
          } else if (window.location.href.startsWith("https://alldaf.org/p")) {
            document.querySelector(".topline").classList.toggle("hide");
          } else if (
            window.location.href.startsWith("https://yutorah.org") ||
            window.location.href.startsWith("https://www.yutorah.org")
          ) {
            document
              .querySelector("#wrap-holder")
              .classList.toggle("no-scroll");
          }
          document.body.classList.toggle("no-scroll");
        }
        return true;
      },
    };

    const settingsProxy = new Proxy(childSettings, proxyHandler);
    //No Scroll Button Behavior
    noScrollBtn.addEventListener("click", () => {
      settingsProxy.noscroll = !childSettings.noscroll;
    });
    addEventListener("scroll", () => (settingsProxy.scrollY = scrollY));

    //Selection
    // Capture text selection from both mouse and keyboard
    function updateSelection() {
      const selection = document.getSelection();
      if (selection && selection.toString().trim() !== "") {
        settingsProxy.selection = selection.toString();
      }
    }

    document.addEventListener("mouseup", updateSelection);
    document.addEventListener("keyup", updateSelection);
    document.addEventListener("selectionchange", () => {
      // Delay a bit to allow selection UI to finalize on mobile
      setTimeout(updateSelection, 10);
    });
    // document.documentElement.scrollTo(0, 240.45713806152344)
  }
};
