// const scriptContent = `
//   (function() {
//     function selectOcrText() {
//       const textarea = document.getElementById("ocrTextBox");
//       if (!textarea) return;

//       textarea.scrollIntoView({ behavior: "smooth", block: "center" });
//       textarea.focus();
//       textarea.select();

//       const event = new MouseEvent("mouseup", {
//         bubbles: true,
//         cancelable: true,
//         view: window
//       });
//       textarea.dispatchEvent(event);
//     }

//     // Add paste handler
//     window.addEventListener("paste", function (e) {
//       const items = e.clipboardData.items;
//       for (let item of items) {
//         if (item.kind === "file") {
//           const file = item.getAsFile();
//           const dt = new DataTransfer();
//           dt.items.add(file);

//           const fileInput = document.getElementById("i2ocr_uploadedfile");
//           if (!fileInput) return;

//           fileInput.files = dt.files;
//           fileInput.dispatchEvent(new Event("change"));

//           setTimeout(() => {
//             const submitBtn = document.getElementById("submit_i2ocr");
//             if (submitBtn) submitBtn.click();
//           }, 500);
//         }
//       }
//     });

//     // Patch OCR form success to select text
//     (function waitForFormHook() {
//       if (window.options_i2ocr_form) {
//         const origSuccess = options_i2ocr_form.success;
//         options_i2ocr_form.success = function () {
//           if (typeof origSuccess === "function") origSuccess.apply(this, arguments);
//           selectOcrText();
//         };
//       } else {
//         setTimeout(waitForFormHook, 7000);
//       }
//     })();
//   })();
//   `;

// const script = document.createElement("script");
// script.textContent = scriptContent;
// (document.body || document.documentElement).appendChild(script);
// script.remove();
//----------------------------------------------------------------------------
// // content-script.js

// const scriptContent = `

// // File processing logic
// function handleSelectedFile(file) {
//   if (!file) return;

//   const filename = file.name;
//   const fsKB = file.size / 1024;
//   const fsMB = fsKB / 1024;
//   _fileSizeMB = fsMB;

//   // Show file size
//   if (fsMB > 1.0)
//     $("#filestat").html(filename + " @ " + Math.round(fsMB * 10) / 10 + " MB");
//   else
//     $("#filestat").html(filename + " @ " + Math.round(fsKB * 10) / 10 + " KB");

//   // Image preview logic
//   if ($("#previewImg").length && file.type.startsWith("image/")) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.addEventListener("load", function () {
//       _base64Img = reader.result;
//       $("#previewImg")
//         .attr("src", _base64Img)
//         .css({ border: "5px solid #0AC4FF" })
//         .show();
//       $("#zoomBtn, #cropBtn").show();
//       $("#zoomGallery").attr("href", _base64Img);
//     }, false);
//   }

//   // Reset and show appropriate UI elements
//   $("#tools").hide();
//   $("#jquery_form_result").removeClass("alert alert-error").html("");
//   $("#jquery_pdf_images").html("");
//   $("#iImgLoader").html("");

//   destroyCropWidget();
//   $("#x, #y, #w, #h").val("");

//   active_page_no = first_page;

//   // Update buttons
//   $("#i2ocr_uploadedfile").hide();
//   $(".fileupload-exists, .fileupload-new").hide();
//   $(".fileupload-restart").show();
// }

// // When file is selected via normal input
// document.getElementById("i2ocr_uploadedfile").onchange = function () {
//   const file = this.files[0];
//   handleSelectedFile(file);
// };

// // When user pastes an image (e.g. screenshot)
// window.addEventListener("paste", function (e) {
//   const items = e.clipboardData.items;
//   for (let item of items) {
//     if (item.kind === "file") {
//       const file = item.getAsFile();

//       // Insert file into <input type="file">
//       const dt = new DataTransfer();
//       dt.items.add(file);

//       const fileInput = document.getElementById("i2ocr_uploadedfile");
//       fileInput.files = dt.files;

//       // Trigger preview + file size logic
//       fileInput.dispatchEvent(new Event("change"));

//       // Trigger OCR after UI updates
//       setTimeout(() => {
//         $("#submit_i2ocr").trigger("click"); // simulate user clicking red "Extract Text"
//       }, 500);
//     }
//   }
// });

// // File processing logic
// function handleSelectedFile(file) {
//   if (!file) return;

//   const filename = file.name;
//   const fsKB = file.size / 1024;
//   const fsMB = fsKB / 1024;
//   _fileSizeMB = fsMB;

//   // Show file size
//   if (fsMB > 1.0)
//     $("#filestat").html(filename + " @ " + Math.round(fsMB * 10) / 10 + " MB");
//   else
//     $("#filestat").html(filename + " @ " + Math.round(fsKB * 10) / 10 + " KB");

//   // Image preview logic
//   if ($("#previewImg").length && file.type.startsWith("image/")) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.addEventListener("load", function () {
//       _base64Img = reader.result;
//       $("#previewImg")
//         .attr("src", _base64Img)
//         .css({ border: "5px solid #0AC4FF" })
//         .show();
//       $("#zoomBtn, #cropBtn").show();
//       $("#zoomGallery").attr("href", _base64Img);
//     }, false);
//   }

//   // Reset and show appropriate UI elements
//   $("#tools").hide();
//   $("#jquery_form_result").removeClass("alert alert-error").html("");
//   $("#jquery_pdf_images").html("");
//   $("#iImgLoader").html("");

//   destroyCropWidget();
//   $("#x, #y, #w, #h").val("");

//   active_page_no = first_page;

//   // Update buttons
//   $("#i2ocr_uploadedfile").hide();
//   $(".fileupload-exists, .fileupload-new").hide();
//   $(".fileupload-restart").show();
// }

// // When file is selected via normal input
// document.getElementById("i2ocr_uploadedfile").onchange = function () {
//   const file = this.files[0];
//   handleSelectedFile(file);
// };

// // When user pastes an image (e.g. screenshot)
// window.addEventListener("paste", function (e) {
//   const items = e.clipboardData.items;
//   for (let item of items) {
//     if (item.kind === "file") {
//       const file = item.getAsFile();

//       // Insert file into <input type="file">
//       const dt = new DataTransfer();
//       dt.items.add(file);

//       const fileInput = document.getElementById("i2ocr_uploadedfile");
//       fileInput.files = dt.files;

//       // Trigger preview + file size logic
//       fileInput.dispatchEvent(new Event("change"));

//       // Trigger OCR after UI updates
//       setTimeout(() => {
//         $("#submit_i2ocr").trigger("click"); // simulate user clicking red "Extract Text"
//       }, 500);
//     }
//   }
// });

//   var options_i2ocr_form = {
//     target: "#jquery_form_result",
//     url: "/process_form",
//     type: "post",
//     success: function () {
//       selectOcrText(); // ✅ Auto-select Hebrew text after OCR result loads
//     }
//   };

//   $("#i2ocr_form").submit(function () {
//     $(this).ajaxSubmit(options_i2ocr_form);
//     return false;
//   });

// function selectOcrText() {
//   const textarea = document.getElementById("ocrTextBox");
//   if (!textarea) return;

//   textarea.scrollIntoView({ behavior: "smooth", block: "center" });
//   textarea.focus();
//   textarea.select();

//   const event = new MouseEvent("mouseup", {
//     bubbles: true,
//     cancelable: true,
//     view: window
//   });
//   textarea.dispatchEvent(event);
// }
// `;

// // Inject the above script into the page context
// const script = document.createElement("script");
// script.textContent = scriptContent;
// (document.body || document.documentElement).appendChild(script);
// script.remove();

// const scriptContent = `
// (function() {
//   function selectOcrTextWhenReady() {
//     const observer = new MutationObserver(() => {
//       const textarea = document.getElementById("ocrTextBox");
//       if (textarea && textarea.value.trim()) {
//         textarea.scrollIntoView({ behavior: "smooth", block: "center" });
//         textarea.focus();
//         textarea.setSelectionRange(0, textarea.value.length);
//         textarea.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

//         observer.disconnect();
//       }
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true
//     });
//   }

//   window.addEventListener("paste", function (e) {
//     const items = e.clipboardData.items;
//     for (let item of items) {
//       if (item.kind === "file") {
//         const file = item.getAsFile();
//         const dt = new DataTransfer();
//         dt.items.add(file);

//         const fileInput = document.getElementById("i2ocr_uploadedfile");
//         if (!fileInput) return;

//         fileInput.files = dt.files;
//         fileInput.dispatchEvent(new Event("change"));

//         setTimeout(() => {
//           const submitBtn = document.getElementById("submit_i2ocr");
//           if (submitBtn) {
//             selectOcrTextWhenReady(); // Hook BEFORE clicking submit
//             submitBtn.click();
//           }
//         }, 500);
//       }
//     }
//   });
// })();
// `;

// const script = document.createElement("script");
// script.textContent = scriptContent;
// (document.body || document.documentElement).appendChild(script);
// script.remove();

// Array.from(document.querySelectorAll("div.container"))
//   .slice(-4)
//   .forEach((x) => x.remove());

// ---------------working! ------------------------

const ocrTextBox = document.getElementById("ocrTextBox");
if (!ocrTextBox) {
  console.warn("#ocrTextBox not found");
} else {
  // Move #ocrTextBox to be direct child of body
  document.body.appendChild(ocrTextBox);

  // Hide all other elements except #ocrTextBox
  document.querySelectorAll("body > *").forEach((el) => {
    if (el !== ocrTextBox) {
      el.style.visibility = "hidden";
      el.style.opacity = "0";
      el.style.position = "absolute"; // optional: remove from flow
      el.style.width = "0";
      el.style.height = "0";
      el.style.overflow = "hidden";
    }
  });

  // Make sure textarea is visible and full width
  ocrTextBox.style.visibility = "visible";
  ocrTextBox.style.opacity = "1";
  ocrTextBox.style.position = "static";
  ocrTextBox.style.width = "80vw"; // or whatever width you want
  ocrTextBox.style.height = "50vh"; // or whatever height you want
  ocrTextBox.style.margin = "2rem auto";
  ocrTextBox.style.display = "block";
}

//-----------------------------------

function selectOcrTextWhenReady() {
  const textarea = document.getElementById("ocrTextBox");
  if (!textarea) return;

  let lastValue = "";
  const interval = setInterval(() => {
    const val = textarea.value.trim();
    if (val && val !== lastValue) {
      lastValue = val;

      //   textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      textarea.focus();
      textarea.setSelectionRange(0, val.length);
      textarea.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

      clearInterval(interval);
    }
  }, 100);
}

window.addEventListener("paste", function (e) {
  const items = e.clipboardData.items;
  for (let item of items) {
    if (item.kind === "file") {
      const file = item.getAsFile();
      const dt = new DataTransfer();
      dt.items.add(file);

      const fileInput = document.getElementById("i2ocr_uploadedfile");
      if (!fileInput) return;

      // Start polling for text

      fileInput.files = dt.files;
      fileInput.dispatchEvent(new Event("change"));

      requestAnimationFrame(() => {
        const submitBtn = document.getElementById("submit_i2ocr");
        if (submitBtn) {
          submitBtn.click();
          selectOcrTextWhenReady();
        }
      });
    }
  }
});

window.addEventListener("message", function (e) {
  // Optional: restrict allowed origins
  // if (e.origin !== "https://your-extension-or-domain") return;
  console.log("got the paste message!");
  const { type, file } = e.data;
  if (type === "simulate-paste" && file) {
    // Convert base64 to File
    fetch(file.dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const simulatedFile = new File([blob], file.name, { type: blob.type });

        const dt = new DataTransfer();
        dt.items.add(simulatedFile);

        const fileInput = document.getElementById("i2ocr_uploadedfile");
        if (!fileInput) return;
        // Start polling for result BEFORE submitting
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event("change"));

        requestAnimationFrame(() => {
          const submitBtn = document.getElementById("submit_i2ocr");
          if (submitBtn) {
            submitBtn.click();
            selectOcrTextWhenReady();
          }
        });
      });
  }
});
