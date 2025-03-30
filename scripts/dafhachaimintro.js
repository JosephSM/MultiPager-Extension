console.log('dafhachaim.js')
console.log(document)
if (window.location !== window.parent.location) {
        // The page is in an iFrames
        console.log("The page is in an iFrame");
        console.log("window.location "+window.location);
//        console.log("window.parent.location "+window.parent.location);
        document.querySelector("video").style = "width:100%; max-height:100vh"
        document.querySelector(".collapse.navbar-collapse").remove()
document.querySelector(".navbar.navbar-inverse.navbar-fixed-top.navbar-app-pages").remove()
        document.querySelector(".container.borderd-container").style.padding = 0;
        document.querySelector("#bd").style.margin = 0;
    }
    else {
        // The page is not in an iFrame
        console.log("The page is not in an iFrame");
    } 
