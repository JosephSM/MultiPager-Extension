// // Define the same URL patterns as in the content script "matches"
// const urlPatterns = ["https://dafhachaim.org/*"];

// const date = new Date();
// date.setFullYear(date.getFullYear() + 1000);
// console.log(`background.js`);
// // Set up the webRequest listener to intercept requests
// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     console.log(`webRequest! : ${details}`);
//     // Loop through all the URL patterns and check if the request matches
//     for (let pattern of urlPatterns) {
//       const regex = new RegExp(pattern.replace("*", ".*"));
//       if (regex.test(details.url)) {
//         // Set the cookie before the request is sent
//         chrome.cookies.set(
//           {
//             url: details.url,
//             name: "hasAccount",
//             value: "1",
//             expirationDate: date.toUTCString(),
//             path: "/",
//             secure: true, // Optional: Send cookie over secure connections
//             httpOnly: false, // Optional: Accessible via JavaScript
//             sameSite: "None", // Optional: SameSite policy
//           },
//           function (cookie) {
//             console.log(`Cookie set: ${cookie.name} = ${cookie.value}`);
//           }
//         );
//         chrome.cookies.set(
//           {
//             url: details.url,
//             name: "dafapp",
//             value: "22an34ca5tdug1bhgapikk01u4",
//             expirationDate: date.toUTCString(),
//             path: "/",
//             secure: true, // Optional: Send cookie over secure connections
//             httpOnly: false, // Optional: Accessible via JavaScript
//             sameSite: "None", // Optional: SameSite policy
//           },
//           function (cookie) {
//             console.log(`Cookie set: ${cookie.name} = ${cookie.value}`);
//           }
//         );
//         break; // Exit once the match is found and cookie is set
//       }
//     }
//     // Allow the request to proceed after setting the cookie
//     return { cancel: false };
//   },
//   { urls: "https://dafhachaim.org/*" },
//   ["blocking"]
// );

// const targetDomain = "https://dafhachaim.org";
// const cookieOptions = [
//   { name: "hasAccount", value: "1" },
//   { name: "dafapp", value: "22an34ca5tdug1bhgapikk01u4" },
// ];

// console.log("Background script loaded and running...");

// // Function to set cookies before the request is sent
// function ensureCookies(details) {
//   console.log(`ensuring cookies for ${JSON.stringify(details)}`);
//   cookieOptions.forEach((cookie) => {
//     chrome.cookies.get(
//       { url: targetDomain, name: cookie.name },
//       function (existingCookie) {
//         console.log(
//           `cookie exists?: ${JSON.stringify(
//             existingCookie
//           )} - url: ${targetDomain} - name: ${cookie.name}`
//         );
//         if (!existingCookie) {
//           chrome.cookies.set(
//             {
//               url: targetDomain,
//               name: cookie.name,
//               value: cookie.value,
//               expirationDate:
//                 Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 1000, // 1000 years from now
//               path: "/",
//               secure: true,
//               httpOnly: false,
//               sameSite: "None",
//             },
//             function (cookie) {
//               if (chrome.runtime.lastError) {
//                 console.error(
//                   `Error setting cookie: ${chrome.runtime.lastError.message}`
//                 );
//               } else {
//                 console.log(`Cookie set: ${cookie.name} = ${cookie.value}`);
//               }
//             }
//           );
//         }
//       }
//     );
//   });
// }

// // Add listener to check cookies before sending requests
// chrome.webRequest.onBeforeSendHeaders.addListener(
//   ensureCookies,
//   { urls: ["https://dafhachaim.org/*"] },
//   ["requestHeaders", "blocking"]
// );

// const domains = {
//     "https://dafhachaim.org": [
//         { name: "hasAccount", value: "1" },
//         { name: "dafapp", value: "22an34ca5tdug1bhgapikk01u4" },
//       ],
//     "https://zichru.com":[
//         {name:"hide_popup", value:"1"},
//         {name:"remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d", value:"eyJpdiI6IlpMakJ2ZlJEU1RVVlVFME9HQUM0ZWc9PSIsInZhbHVlIjoiZGo0aURMK1E0WXlwcjRwMUVXTXB3U1RPY1cxVi80UXMxMEVDY1JPZ0dyV1E2aWFHS2Rjbit3ZUovTE9pY3BHTzcyV0xROHlJcjhUUjkwd3VVZXdsTFBLR0swUU5UYkJVOFUvNlJYemZDa1puQ0thblhFSlU1ODNwMFpPYU5WZy92anhuT2taamRDb2haSFVjdExIa2hPVDBtaGlBRTVUM055UmNhd21sbXQrSDBZaUQ1MkFoZ0tsamVKWStqbHlZQU5iUHhtTXh2Q0xwQWxzQzg1dVBBMHhxY3pkWHlEbkIyRzFtQ0NLNmFEa0I0a1BzYUZzSmRPd1JKQnE5R0w2biIsIm1hYyI6IjUwMjg1ZjgzMTE2ZjM3ODM1Y2QyZjc2OGU5ZWY5MjI4YjNmMjE1OTI4ODIxNWQ1ZjJmNmJiMWE3YjYwODBjNmYiLCJ0YWciOiIifQ%3D%3D"},
//         {name:"zichru_session", value:"eyJpdiI6ImwxMlNXKzhOeXB3OTlpZHlWRytwc0E9PSIsInZhbHVlIjoiTGNOU0JkTWpmZDhManNkMEFPM2tyVmhPQ0EzVTZwWFQ4UEQ4YnQ4ck5hclBBdXFqUmdpTTJnMzk3VXZPUnZRdjFYTDZwVURxaUxMemo2dVlORkR1Nm1yeWlsejBOcklyb21HMnB3SUEwYk5JOWFwQmFNYXZ1MU93VTV5WVFHamYiLCJtYWMiOiJmMDcxNGU2ZTk3YzJjZTRhMTE1NzJhMzZjNmIwNjg2NzRhYzIzYTNiNmY0NTY2ZDE1OTM0ZDQyNTM1ZTQ0OTljIiwidGFnIjoiIn0%3D"}
//     ]
// }

// const targetDomain = "https://dafhachaim.org";
// const cookieOptions = [
//   { name: "hasAccount", value: "1" },
//   { name: "dafapp", value: "22an34ca5tdug1bhgapikk01u4" },
// ];

// console.log("🔥 Background script loaded! Monitoring requests...");

// function ensureCookies(details) {
//   console.log(`➡️ Intercepted request to: ${details.url}`);

//   cookieOptions.forEach((cookie) => {
//     chrome.cookies.get(
//       { url: targetDomain, name: cookie.name },
//       function (existingCookie) {
//         if (!existingCookie) {
//           console.log(`🔹 Cookie ${cookie.name} is missing. Setting it now.`);

//           chrome.cookies.set(
//             {
//               url: targetDomain,
//               name: cookie.name,
//               value: cookie.value,
//               expirationDate:
//                 Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 1000, // 1000 years
//               path: "/",
//               secure: true,
//               httpOnly: false,
//               sameSite: "no_restriction",
//             },
//             function (newCookie) {
//               if (chrome.runtime.lastError) {
//                 console.error(
//                   `❌ Error setting cookie: ${chrome.runtime.lastError.message}`
//                 );
//               } else {
//                 console.log(
//                   `✅ Successfully set cookie: ${cookie.name} = ${cookie.value}`
//                 );
//               }
//             }
//           );
//         } else {
//           console.log(
//             `✅ Cookie already exists: ${cookie.name} = ${existingCookie.value}`
//           );
//         }
//       }
//     );
//   });
// }

// // Run only once per tab (prevents 127 cookies issue)
// chrome.webRequest.onBeforeSendHeaders.addListener(
//   ensureCookies,
//   { urls: ["https://dafhachaim.org/*"] },
//   ["requestHeaders", "blocking"]
// );

// const targetDomain = "https://dafhachaim.org";
// const cookieOptions = [
//   { name: "hasAccount", value: "1" },
//   { name: "dafapp", value: "22an34ca5tdug1bhgapikk01u4" },
// ];

// console.log("🔥 Background script loaded! Monitoring requests...");

// async function ensureCookies(details) {
//   console.log(`➡️ Intercepted request to: ${details.url}`);

//   for (const cookie of cookieOptions) {
//     await new Promise((resolve) => {
//       chrome.cookies.get(
//         { url: targetDomain, name: cookie.name },
//         function (existingCookie) {
//           if (!existingCookie) {
//             console.log(`🔹 Cookie ${cookie.name} is missing. Setting it now.`);

//             chrome.cookies.set(
//               {
//                 url: targetDomain,
//                 name: cookie.name,
//                 value: cookie.value,
//                 expirationDate:
//                   Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 1000, // 1000 years
//                 path: "/",
//                 secure: true, // Required for SameSite=None
//                 httpOnly: false,
//                 sameSite: "None", // REQUIRED for iframe contexts
//               },
//               function (newCookie) {
//                 if (chrome.runtime.lastError) {
//                   console.error(
//                     `❌ Error setting cookie: ${chrome.runtime.lastError.message}`
//                   );
//                 } else {
//                   console.log(
//                     `✅ Successfully set cookie: ${cookie.name} = ${cookie.value}`
//                   );
//                 }
//                 resolve(); // Continue only after cookie is set
//               }
//             );
//           } else {
//             console.log(
//               `✅ Cookie already exists: ${cookie.name} = ${existingCookie.value}`
//             );
//             resolve(); // Continue immediately if cookie exists
//           }
//         }
//       );
//     });
//   }

//   console.log(`✅ All cookies set! Proceeding with request: ${details.url}`);
// }

// // Ensure cookies are set before requests proceed
// chrome.webRequest.onBeforeRequest.addListener(
//   async function (details) {
//     await ensureCookies(details);
//     return { cancel: false }; // Allow request after cookies are set
//   },
//   { urls: ["https://dafhachaim.org/*"] },
//   ["blocking"] // Blocks request until cookies are set
// );

const targetDomains = {
  "https://dafhachaim.org": [
    { name: "hasAccount", value: "1" },
    { name: "dafapp", value: "22an34ca5tdug1bhgapikk01u4" },
  ],
  "https://www.zichru.com": [
    { name: "hide_popup", value: "1" },
    {
      name: "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d",
      value:
        "eyJpdiI6IlpMakJ2ZlJEU1RVVlVFME9HQUM0ZWc9PSIsInZhbHVlIjoiZGo0aURMK1E0WXlwcjRwMUVXTXB3U1RPY1cxVi80UXMxMEVDY1JPZ0dyV1E2aWFHS2Rjbit3ZUovTE9pY3BHTzcyV0xROHlJcjhUUjkwd3VVZXdsTFBLR0swUU5UYkJVOFUvNlJYemZDa1puQ0thblhFSlU1ODNwMFpPYU5WZy92anhuT2taamRDb2haSFVjdExIa2hPVDBtaGlBRTVUM055UmNhd21sbXQrSDBZaUQ1MkFoZ0tsamVKWStqbHlZQU5iUHhtTXh2Q0xwQWxzQzg1dVBBMHhxY3pkWHlEbkIyRzFtQ0NLNmFEa0I0a1BzYUZzSmRPd1JKQnE5R0w2biIsIm1hYyI6IjUwMjg1ZjgzMTE2ZjM3ODM1Y2QyZjc2OGU5ZWY5MjI4YjNmMjE1OTI4ODIxNWQ1ZjJmNmJiMWE3YjYwODBjNmYiLCJ0YWciOiIifQ%3D%3D",
    },
    {
      name: "zichru_session",
      value:
        "eyJpdiI6ImwxMlNXKzhOeXB3OTlpZHlWRytwc0E9PSIsInZhbHVlIjoiTGNOU0JkTWpmZDhManNkMEFPM2tyVmhPQ0EzVTZwWFQ4UEQ4YnQ4ck5hclBBdXFqUmdpTTJnMzk3VXZPUnZRdjFYTDZwVURxaUxMemo2dVlORkR1Nm1yeWlsejBOcklyb21HMnB3SUEwYk5JOWFwQmFNYXZ1MU93VTV5WVFHamYiLCJtYWMiOiJmMDcxNGU2ZTk3YzJjZTRhMTE1NzJhMzZjNmIwNjg2NzRhYzIzYTNiNmY0NTY2ZDE1OTM0ZDQyNTM1ZTQ0OTljIiwidGFnIjoiIn0%3D",
    },
  ],
};

console.log("🔥 Background script loaded! Monitoring requests...");

function ensureCookies(details) {
  console.log(`➡️ Intercepted request to: ${details.url}`);

  Object.keys(targetDomains).forEach((domain) => {
    if (details.url.startsWith(domain)) {
      targetDomains[domain].forEach((cookie) => {
        chrome.cookies.get(
          { url: domain, name: cookie.name },
          function (existingCookie) {
            if (!existingCookie) {
              console.log(
                `🔹 Cookie ${cookie.name} is missing for ${domain}. Setting it now.`
              );

              chrome.cookies.set(
                {
                  url: domain,
                  name: cookie.name,
                  value: cookie.value,
                  expirationDate:
                    Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 1000, // 1000 years
                  path: "/",
                  secure: true,
                  httpOnly: false,
                  sameSite: "no_restriction",
                },
                function (newCookie) {
                  if (chrome.runtime.lastError) {
                    console.error(
                      `❌ Error setting cookie for ${domain}: ${chrome.runtime.lastError.message}`
                    );
                  } else {
                    console.log(
                      `✅ Successfully set cookie: ${cookie.name} = ${cookie.value} for ${domain}`
                    );
                  }
                }
              );
            } else {
              console.log(
                `✅ Cookie already exists: ${cookie.name} = ${existingCookie.value} for ${domain}`
              );
            }
          }
        );
      });
    }
  });
}

// Listen for requests to all specified domains
chrome.webRequest.onBeforeSendHeaders.addListener(
  ensureCookies,
  { urls: Object.keys(targetDomains).map((domain) => `${domain}/*`) },
  ["requestHeaders", "blocking"]
);
