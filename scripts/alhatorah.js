document.body.append(document.querySelector("nav-gear"));

document.body.lastChild.textContent === "null"
  ? document.body.lastChild.remove()
  : "";
