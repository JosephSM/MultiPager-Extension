// removed = 0;
function removeAds() {
  Array.from(
    document.querySelectorAll(
      'script[async], script[src^="https://js"], script[src*="beacon"], .top-ad, .promo-text-holder, #urchin_loggerFrame,.promo-text , iframe, *[id^="hs-web-interactives"], strong.logo, .header-info, .panel , .daf-subscribe, #footer, #notification-container, noscript, script[charset], img[style*="display: none;"], .top-ad, .promo-text-holder, #urchin_loggerFrame,.promo-text , iframe, *[id^="hs-web-interactives"], strong.logo, .header-info, .panel , .daf-subscribe, #footer'
    )
  ).forEach((x) => {
    // console.log(`${++removed} removing ${x}`);
    x.remove();
  });
}

removeAds();
setTimeout(removeAds, 1000);
setTimeout(removeAds, 2000);
setTimeout(removeAds, 3000);
setTimeout(removeAds, 4000);
setTimeout(removeAds, 5000);
setTimeout(removeAds, 6000);
setTimeout(removeAds, 7000);
setTimeout(removeAds, 8000);
setTimeout(removeAds, 10000);
