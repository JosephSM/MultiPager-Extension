// console.log("doc!", document.body);

window.onload = () => {
  //   console.log("Dom loaded");
  if (window.self !== window.top) {
    // The page is in an iFrame

    document.addEventListener("mouseup", (e) => {
      console.log(e, document.getSelection().toString());
      //   window.alert(e.target);
      parent.postMessage(
        document.getSelection().toString(),
        "https://josephsm.github.io"
      );
    });
    // console.log("document!: ", document);

    const noScrollBtn = document.createElement("button");
    noScrollBtn.className = "no-scroll-btn";
    noScrollBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M0 192l176 0L176 0 160 0C71.6 0 0 71.6 0 160l0 32zm0 32L0 352c0 88.4 71.6 160 160 160l64 0c88.4 0 160-71.6 160-160l0-128-192 0L0 224zm384-32l0-32C384 71.6 312.4 0 224 0L208 0l0 192 176 0z"/>
      </svg>
    `;
    document.body.insertBefore(noScrollBtn, document.body.firstChild);

    if (window.location.href.startsWith("https://www.sefaria.org")) {
      //   console.log("starts with!!!!");
      setTimeout(() => {
        const elem = document.querySelector("div.textColumn");
        // console.log("elelm!!!!!! ", elem);
        noScrollBtn.addEventListener(
          "click",
          () => {
            // console.log("clicked!!!!");
            elem.classList.toggle("no-scroll");
          },
          3000
        );
      });
    } else {
      noScrollBtn.addEventListener("click", () => {
        document.body.classList.toggle("no-scroll");
      });
    }
  } else {
    console.log("The page is not in an iFrame");
  }
};
