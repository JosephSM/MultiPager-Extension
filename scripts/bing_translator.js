window.addEventListener("message", (e) => {
  // Optional: Check origin to ensure it's only from parent
  if (e.origin !== "https://josephsm.github.io") return;

  const [prop, val, obj] = e.data;
  if (prop === "selection") {
    console.log("Iframe received forwarded message:", prop, val, obj);
    const el = document.getElementById("tta_input_ta");
    el.innerText = val;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    // this should only happen on a mouse up event after selection
    // inj();
  }
});

// contentScript.js (your extension's content script)
function injectScript(fn) {
  const script = document.createElement("script");
  script.textContent = `(${fn})();`;
  document.documentElement.appendChild(script);
  //   script.remove();
  setTimeout(() => script.remove(), 10000);
}

let inj = () =>
  injectScript(function readText() {
    setTimeout(() => {
      var n =
        TextToSpeechTranslationDomHandler ||
        (TextToSpeechTranslationDomHandler = {});

      function f() {
        var n = function () {
            r(transDom.input.playIcon);
            r(transDom.output.playIcon);
            u();
          },
          t = _ge("tta_playiconsrc");
        typeof SmartRendering != "undefined"
          ? SmartRendering.LoadElementWhenDisplayed(this, t, n, [])
          : n.apply(this, []);
      }
      function u() {
        var t, n;
        if (
          ((transDom.expansionCtrl.altTranslationTable.playIcons = ge_cl(
            _d,
            "tta_altplayicon"
          )),
          transDom.expansionCtrl.altTranslationTable.playIcons)
        )
          for (
            t = transDom.expansionCtrl.altTranslationTable.playIcons, n = 0;
            n < t.length && t[n];
            n++
          )
            r(t[n]);
      }
      function i(n) {
        var i,
          r,
          u = SpeechServiceHelper.emptyFunction,
          f = SpeechServiceHelper.emptyFunction,
          e;
        n == transDom.input.playIcon
          ? ((i =
              RichTranslateHelper.UseInputTransliterationForTTS &&
              transDom.input.transliterateBox &&
              !RichTranslateHelper.isNullOrEmpty(
                transDom.input.transliterateBox.textContent
              )
                ? transDom.input.transliterateBox.textContent
                : transDom.getTextValueOfSide(0)),
            (r = transDom.getLanguageCodeMapping(
              RichTranslateHelper.inputSide
            )),
            (u = t(transDom.input.playIconContainer, "tta_playfocus", !0)),
            (f = t(transDom.input.playIconContainer, "tta_playfocus", !1)))
          : n == transDom.output.playIcon
          ? ((i = transDom.getTextValueOfSide(1)),
            (r = transDom.getLanguageCodeMapping(
              RichTranslateHelper.outputSide
            )),
            (u = t(transDom.output.playIconContainer, "tta_playfocus", !0)),
            (f = t(transDom.output.playIconContainer, "tta_playfocus", !1)))
          : ((i = n.getAttribute("data-attribute")),
            (r = transDom.getLanguageCodeMapping(
              RichTranslateHelper.outputSide
            )),
            (u = t(
              n.parentElement.parentElement.nextSibling,
              "tta_altTransFocus",
              !0
            )),
            (f = t(
              n.parentElement.parentElement.nextSibling,
              "tta_altTransFocus",
              !1
            )));
        e = SpeechServiceHelper.mapSelectedLanguageToTextOutputLanguageCode(r);
        TextToSpeechService.playOrStopAudio(
          i,
          e.locale,
          e.gender,
          e.voiceName,
          n,
          u,
          f
        );
      }
      function t(n, t, i) {
        return function () {
          sa_cl(n, t, i);
        };
      }
      function r(n) {
        n.addEventListener("click", function (n) {
          i(n.currentTarget);
        });
        n.addEventListener("keyup", function (n) {
          n.keyCode === RichTranslateHelper.enterKeyCode && i(n.currentTarget);
        });
      }
      n.init = f;
      n.updateAltTranslationsTextToSpeechHandlers = u;
      n.playAudioContent = i;
      i(document.querySelector("#tta_playicontgt"));
    }, 2000);
  });
