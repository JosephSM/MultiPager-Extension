// //function applyStylesWhenAppears(selector, cssString) {
// //  // Select the target node (could be the document body or any other parent node)
// //  const targetNode = document.body;
// //
// //  // Create a MutationObserver to watch for added nodes
// //  const observer = new MutationObserver((mutationsList, observer) => {
// //    for (let mutation of mutationsList) {
// //      if (mutation.type === 'childList') {
// //        mutation.addedNodes.forEach(node => {
// //          // Check if the node is an element and matches the selector
// //          if (node.nodeType === 1 && node.matches(selector)) {
// //            node.style.cssText = cssString; // Apply the CSS string to the element
// //            console.log(`Applied style {${cssString}} to node {${node}} with selector {${selector}}`);
// //          }
// //        });
// //      }
// //    }
// //  });
// //
// //  // Start observing the targetNode for added child nodes
// //  observer.observe(targetNode, { childList: true, subtree: true });
// //
// //  // Optionally, return the observer if you want to disconnect it later
// //  return observer;
// //}

// console.log('zichru.js')
// console.log(document)
// //if (window.location !== window.parent.location) {
//     // The page is in an iFrames
//     // console.log("The page is in an iFrame");
//     Array.from(document.querySelectorAll(".w-full.font-bold li, .w-full.font-bold span")).forEach( x => x.className = "")
//     Array.from(document.querySelectorAll(".w-full.font-bold li")).forEach( x => x.style = "display:inline-block;margin-right:10px")
//     document.querySelector(".bg-gray-100").style.top = 0
//     document.querySelector("nav").parentElement.remove()
//     document.querySelector(".w-full.font-bold .uppercase").parentElement.parentElement.style.position = "fixed"
//     document.querySelector(".w-full.font-bold .uppercase").parentElement.parentElement.style["z-index"] = 180
//     document.querySelector(".w-full.font-bold .uppercase").parentElement.parentElement.style.top = "160px"
//     document.querySelector(".w-full.font-bold .uppercase").parentElement.parentElement.style.width = "100%";
//     //applyStylesWhenAppears("img.cld-image","display:none");
//     document.querySelector("img.cld-image").remove()
//     document.querySelector("img.cld-image").parentElement.parentElement.remove()
//     // set the accordian height to => document.querySelector(".w-full.font-bold .uppercase").getBoundingClientRect().bottom so just the zichru sound shows
//     //and set noscroll

// //}else {
// //    // The page is not in an iFrame
// //    console.log("The page is not in an iFrame");
// //}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".grid-cols-2").classList.remove("grid-cols-2");
  document.querySelectorAll(".max-w-sm").forEach((e) => {
    e.classList.remove("max-w-sm");
  });
});
setTimeout(() => {
  document.querySelector(".grid-cols-2").classList.remove("grid-cols-2");
  document.querySelectorAll(".max-w-sm").forEach((e) => {
    e.classList.remove("max-w-sm");
  });
}, 1000);
