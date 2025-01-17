!function(window) {
    const host = "https://labs.heygen.com";
    const url = host + "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJlZjA4MDM5YTQxMzU0ZWQ1YTIwNTY1ZGI4%0D%0AOTkzNzNmMyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0AL2VmMDgwMzlhNDEzNTRlZDVhMjA1NjVkYjg5OTM3M2YzL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6ImZl%0D%0ANWRiMzExOTZiZDQ1NmQ5OWUzZWE2MTA4OTZlNmIzIiwidXNlcm5hbWUiOiJhM2RjNWJmNjBiOGM0%0D%0AMWQxOGRmZjE1MmYyZDEyN2QyZSJ9&inIFrame=1";

    const clientWidth = document.body.clientWidth;
    const wrapDiv = document.createElement("div");
    wrapDiv.id = "heygen-streaming-embed";

    const container = document.createElement("div");
    container.id = "heygen-streaming-container";

    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = `
        #heygen-streaming-embed {
            z-index: 9999;
            position: fixed;
            right: 40px;
            bottom: 10px;
            width: 250px;
            height: 250px;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
            transition: all linear 0.1s;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
        }
        #heygen-streaming-embed.show {
            opacity: 1;
            visibility: visible;
        }
        #heygen-streaming-embed.expand {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            right: auto;
            bottom: auto;
            width: min(90%, 870px);      
            height: min(80vh, 490px);     
            border: 0;
            border-radius: 8px;
        }
        #heygen-streaming-container {
            width: 100%;
            height: 100%;
        }
        #heygen-streaming-container iframe {
            width: 100%;
            height: 100%;
            border: 0;
        }
    `;

    const iframe = document.createElement("iframe");
    iframe.allowFullscreen = false;
    iframe.title = "Streaming Embed";
    iframe.role = "dialog";
    iframe.allow = "microphone";
    iframe.src = url;

    let visible = false;
    let initial = false;

    window.addEventListener("message", (e) => {
        if (e.origin === host && e.data && e.data.type && e.data.type === "streaming-embed") {
            if (e.data.action === "init") {
                initial = true;
                wrapDiv.classList.toggle("show", initial);
            } else if (e.data.action === "show") {
                visible = true;
                wrapDiv.classList.toggle("expand", visible);
            } else if (e.data.action === "hide") {
                visible = false;
                wrapDiv.classList.toggle("expand", visible);
            }
        }
    });

    container.appendChild(iframe);
    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(container);
    document.body.appendChild(wrapDiv);
}(globalThis);
