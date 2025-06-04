// EXPORTS NOT WORKING YET

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runOnElem(elem, func) {
  while (!Array.from(document.querySelectorAll(elem))) {
    console.log(`Element Not Found: ${document.querySelectorAll(elem)}`);
    await sleep(1000);
  }
  console.log(`Found Element!!!!!!!! ${document.querySelectorAll(elem)}`);
  func();
}

export function hello() {
  console.log("Hi THere");
}
