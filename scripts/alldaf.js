// console.log('alldaf.js')
// console.log(document)
// if (window.location !== window.parent.location) {
//         // The page is in an iFrames
//         console.log("The page is in an iFrame");
//     }
//     else {
//         // The page is not in an iFrame
//         console.log("The page is not in an iFrame");
//     }

setTimeout(
  () =>
    document
      .querySelectorAll("div[class^='sidebar-accordion'][class$='heading']")
      .forEach((x) => x.click()),
  1000
);
