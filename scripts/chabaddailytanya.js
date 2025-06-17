function getPlayingMedia() {
  const mediaElements = [...document.querySelectorAll("video, audio")];
  return mediaElements.find((m) => !m.paused && !m.ended && m.readyState >= 2);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function createAndRenderTimeSpan(element, time = null) {
  let media = getPlayingMedia();
  media = document.querySelector("video");
  media.play();
  if (!media) return;
  if (time === null) time = media.currentTime - 2;
  const timeSpan = document.createElement("span");
  timeSpan.className = "timestamp-span";
  timeSpan.textContent = formatTime(time);
  timeSpan.dataset.time = time;

  // Add click handler to seek when span is clicked
  timeSpan.addEventListener("click", function (event) {
    event.stopPropagation();
    media.pause();
    media.currentTime = parseFloat(timeSpan.dataset.time);
    media.play();
    media.dispatchEvent(new Event("mouseup"));
    media.dispatchEvent(new Event("mouseup"));
    // media.pause();
    // media.play();
    // media.play().then(() => {
    //   media.pause(); // optional
    //   media.play(); // forces rebuffer + play
    // });
    // media.addEventListener("canplay", onCanPlay, { once: true });
    // function onCanPlay() {
    //   media.play();
    // }
  });

  const prev = element.previousElementSibling;
  if (prev && prev.tagName === "SPAN" && prev.dataset.time) {
    // Replace old timestamp
    element.parentNode.replaceChild(timeSpan, prev);
  } else {
    // Insert new timestamp
    element.parentNode.insertBefore(timeSpan, element);
  }
  saveTimestamps();
}

function getTitle() {
  return document.querySelector(".article-header__subtitle").textContent;
}

function saveTimestamps() {
  const results = Array.from(
    document.querySelectorAll("span[lang='he'] p")
  ).map((el) => {
    const data = el.parentElement.querySelector("span[data-time]");
    return data ? data.dataset.time : null;
  });
  console.log(results);

  localStorage.setItem(getTitle(), JSON.stringify(results));
}

function setupClickableElements() {
  //   console.log("hello");
  let timestamps = JSON.parse(localStorage.getItem(getTitle()));
  console.log(timestamps);
  //   debugger;
  document.querySelectorAll("span[lang='he'] p").forEach((el, idx) => {
    if (timestamps && timestamps[idx]) {
      createAndRenderTimeSpan(el, timestamps[idx]);
    }
    el.addEventListener("click", function () {
      createAndRenderTimeSpan(el);
    });
  });
}

document.querySelector(".media-options a:first-child").click();

setTimeout(() => setupClickableElements(), 3000);
