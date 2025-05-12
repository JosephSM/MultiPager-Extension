// removed = 0;
function removeCrap() {
  Array.from(
    document.querySelectorAll(
      'script[async], script[src^="https://js"], script[src*="beacon"], .top-ad, .promo-text-holder, #urchin_loggerFrame,.promo-text , iframe, *[id^="hs-web-interactives"], strong.logo, .header-info, .panel , .daf-subscribe, #footer, #notification-container, noscript, script[charset], img[style*="display: none;"], .top-ad, .promo-text-holder, #urchin_loggerFrame,.promo-text , iframe, *[id^="hs-web-interactives"], strong.logo, .header-info, .panel , .daf-subscribe, #footer'
    )
  ).forEach((x) => {
    // console.log(`${++removed} removing ${x}`);
    x.remove();
  });
}

removeCrap();
setTimeout(removeCrap, 1000);
setTimeout(removeCrap, 2000);
setTimeout(removeCrap, 3000);
setTimeout(removeCrap, 4000);
setTimeout(removeCrap, 5000);
setTimeout(removeCrap, 6000);
setTimeout(removeCrap, 7000);
setTimeout(removeCrap, 8000);
setTimeout(removeCrap, 10000);
