function main () {


    function makeItHappen(arr, f){
        arr.forEach((x) => setTimeout(() => f(),x))
    }



    console.log('dafhachaim.js')
    console.log(document)
    if (window.location !== window.parent.location) {
            // The page is in an iFrames
            console.log("The page is in an iFrame");
            console.log("window.location "+window.location);
    //        console.log("window.parent.location "+window.parent.location);
    //        document.querySelector("video").style = "width:100%; max-height:100vh"
            document.querySelector(".collapse.navbar-collapse").remove()
            document.querySelector(".navbar.navbar-inverse.navbar-fixed-top.navbar-app-pages").remove()
            document.querySelector(".container.borderd-container").style.padding = 0;
            document.querySelector("#bd").style.margin = 0;
            makeItHappen([15,30,45,70,100,500,1000,3000], () => {           
                document.getElementById("canvasHolder").style.top = "41px";
                document.querySelector(".navbar.navbar-fixed-top.daf-controls").style.top = "0px";
                document.querySelector(".shiur-speed-container").style.width = "39px";
                document.querySelector("select[data-speed]").style.padding = 0;
            }) 

            const opts = Array.from(document.querySelectorAll("option"))  
            const incr = .5;
            for (let i = 0; i < opts.length; i++){
                let val = incr * (i+1)            
                opts[i].textContent = val
                opts[i].value = val
            }

            var hs =  document.querySelectorAll(".highlighter")
            var canvas = document.querySelector("#canvasHolder")
            var highlighters = {}
            for( let i = 0 ; i < hs.length; i++){
                highlighters[daf.timePoints[i]] = hs[i]
            }
            let vid = document.querySelector("video")
            let thecurrentTime = 0
            let mylastTime = -1
            console.log(hs, vid, opts, highlighters, daf, daf.timePoints)
            vid.addEventListener("timeupdate", (e) => {
                let mycurrentTime = thecurrentTime = Math.floor(vid.currentTime)
                // console.log(mycurrentTime,mycurrentTime in highlighters, mycurrentTime !== mylastTime)
                if(mycurrentTime in highlighters && mycurrentTime !== mylastTime){
                    mylastTime = mycurrentTime
                    currentHighlighter = highlighters[mycurrentTime]
                    console.log(currentHighlighter)
                    var HighlightPos = parseFloat(currentHighlighter.style.top)
                    var HighlightPosX = parseFloat(currentHighlighter.style.left)
                    var HighlightWidth = parseFloat(currentHighlighter.style.width)

                    var centerViewport = ((window.innerHeight - canvas.offsetTop) /2) - 12
                    // var HighlightPos = 363.2 //getHighlight.offsetTop
                    // var canvasScrollPos = $("#canvasHolder").scrollTop()
                    var maxScroll = canvas.scrollHeight - canvas.offsetHeight
                    var scrollYTarget = HighlightPos - centerViewport
                    var scrollXTarget = HighlightPosX+80- ((canvas.clientWidth - HighlightWidth )/2)
                    $("#canvasHolder").animate({scrollTop:scrollYTarget, scrollLeft:scrollXTarget})
                    if(scrollYTarget > maxScroll){
                        document.documentElement.scrollTo(0, scrollYTarget - maxScroll)
                    }
                }
            })
        }
        else {
            // The page is not in an iFrame
            console.log("The page is not in an iFrame");
        } 


        /* background: #E1E4DA; */
        /* height: 50px; */


}

setTimeout(() => {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
},1000)
