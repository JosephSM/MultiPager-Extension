function main() {
  // enable this is you want to only work in iframes
  //   if (window.location !== window.parent.location) {
  const opts = Array.from(document.querySelectorAll("option"));
  const incr = 0.5;
  for (let i = 0; i < opts.length; i++) {
    let val = incr * (i + 1);
    opts[i].textContent = val;
    opts[i].value = val;
  }

  var hs = document.querySelectorAll(".highlighter");
  var canvas = document.querySelector("#canvasHolder");
  var highlighters = {};
  for (let i = 0; i < hs.length; i++) {
    highlighters[daf.timePoints[i]] = hs[i];
  }
  let vid = document.querySelector("video");
  let thecurrentTime = 0;
  let mylastTime = -1;
  console.log(
    "Daf Hachaim Time Data: ",
    hs,
    vid,
    opts,
    highlighters,
    daf,
    daf.timePoints
  );
  vid.addEventListener("timeupdate", (e) => {
    let mycurrentTime = (thecurrentTime = Math.floor(vid.currentTime));
    if (mycurrentTime in highlighters && mycurrentTime !== mylastTime) {
      mylastTime = mycurrentTime;
      currentHighlighter = highlighters[mycurrentTime];
      console.log(currentHighlighter);
      var HighlightPos = parseFloat(currentHighlighter.style.top);
      var HighlightPosX = parseFloat(currentHighlighter.style.left);
      var HighlightWidth = parseFloat(currentHighlighter.style.width);

      // 50 is height of top navbar, 50px
      // 12 is the height of the highlight itself
      var centerViewport = (window.innerHeight - 50) / 2 - 12;
      console.log(
        "viewport: ",
        window.innerHeight,
        canvas.OffsetTop, //this doesn't work
        centerViewport
      );

      var maxScroll = canvas.scrollHeight - canvas.offsetHeight;
      var scrollYTarget = HighlightPos - centerViewport;

      //TODO: adjust zoom level and 71 fixed value depends on zoom level
      var scrollXTarget =
        HighlightPosX + 71 - (canvas.clientWidth - HighlightWidth) / 2;
      $("#canvasHolder").animate({
        scrollTop: scrollYTarget,
        scrollLeft: scrollXTarget,
      });
      if (scrollYTarget > maxScroll) {
        document.documentElement.scrollTo(0, scrollYTarget - maxScroll);
      }
    }
  });
}

setTimeout(() => {
  var script = document.createElement("script");
  script.appendChild(document.createTextNode("(" + main + ")();"));
  (document.body || document.head || document.documentElement).appendChild(
    script
  );
}, 2000);
