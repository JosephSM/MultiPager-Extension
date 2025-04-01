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

  var canvas = document.querySelector("#canvasHolder");
  hs = document.querySelectorAll(".highlighter");
  highlighters = {};
  for (let i = 0; i < hs.length; i++) {
    highlighters[daf.timePoints[i]] = hs[i];
  }

  console.log(
    "Daf Hachaim Time Data: ",
    hs,
    vid,
    opts,
    highlighters,
    daf,
    daf.timePoints
  );

  var vid = document.querySelector("video") || popcorn.video;
  //   var thecurrentTime = 0;
  //   var mylastTime = -1;
  var mynextTimeIndex = 1;
  var mynextTime = daf.timePoints[mynextTimeIndex];
  vid.addEventListener(
    "timeupdate",
    (e) => {
      console.log("TIMEUPDAYE");
      const mycurrentTime = vid.currentTime;
      //   if (mycurrentTime in highlighters && mycurrentTime !== mynextTime) {
      if (mycurrentTime >= mynextTime) {
        mynextTimeIndex += 1;
        mynextTime = daf.timePoints[mynextTimeIndex];
        currentHighlighter = highlighters[Math.floor(mycurrentTime)];
        console.log(currentHighlighter);
        const HighlightPos = parseFloat(currentHighlighter.style.top);
        const HighlightPosX = parseFloat(currentHighlighter.style.left);
        const HighlightWidth = parseFloat(currentHighlighter.style.width);

        // 50 is height of top navbar, 50px
        // 12 is the height of the highlight itself
        const centerViewport = (window.innerHeight - 50) / 2 - 12;
        console.log(
          "viewport: ",
          window.innerHeight,
          canvas.OffsetTop, //this doesn't work
          centerViewport
        );

        const maxScroll = canvas.scrollHeight - canvas.offsetHeight;
        const scrollYTarget = HighlightPos - centerViewport;

        //TODO: adjust zoom level and 71 fixed value depends on zoom level
        const scrollXTarget =
          HighlightPosX + 71 - (canvas.clientWidth - HighlightWidth) / 2;
        $("#canvasHolder").animate({
          scrollTop: scrollYTarget,
          scrollLeft: scrollXTarget,
        });
        if (scrollYTarget > maxScroll) {
          document.documentElement.scrollTo(0, scrollYTarget - maxScroll);
        }
      }
    },
    { passive: true }
  );
}

setTimeout(() => {
  var script = document.createElement("script");
  script.appendChild(document.createTextNode("(" + main + ")();"));
  (document.body || document.head || document.documentElement).appendChild(
    script
  );
}, 4000);
