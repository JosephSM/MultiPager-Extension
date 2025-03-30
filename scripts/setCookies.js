console.log("🍪 Injecting cookie setter...");

(function () {
  document.cookie =
    "hasAccount=1; path=/; domain=dafhachaim.org; Secure; SameSite=None";
  document.cookie =
    "dafapp=22an34ca5tdug1bhgapikk01u4; path=/; domain=dafhachaim.org; Secure; SameSite=None";

  console.log("✅ Cookies set successfully!");
})();
