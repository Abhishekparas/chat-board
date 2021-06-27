function createSticky(){
    let stickyPad = document.createElement("div");
    let stickyNav = document.createElement("div");
    let minimize = document.createElement("div");
    let closeBtn = document.createElement("div");
    let content = document.createElement("div");

    stickyPad.classList.add("stickyPad");
    stickyNav.classList.add("stickyNav");
    minimize.classList.add("minimize");
    closeBtn.classList.add("close");
    content.classList.add("content");

    stickyNav.appendChild(minimize);
    stickyNav.appendChild(closeBtn);
    stickyPad.appendChild(stickyNav);
    
    stickyPad.appendChild(content);

    document.body.appendChild(stickyPad);

    minimize.addEventListener("click",() => {
        if(content.style.display == "none"){
            content.style.display = "block";
        }
        else{
            content.style.display = "none";
        }
    });

    closeBtn.addEventListener("click",() => {
        stickyPad.remove();
    });

    let isStickyHold = false;
    let initialX;
    let initialY;
    stickyNav.addEventListener("mousedown", (e) => {
        isStickyHold = true;
        initialX = e.clientX;
        initialY = e.clientY;
    })

    window.addEventListener("mousemove", (e) => {
        if(isStickyHold){
            let finalX = e.clientX;
            let finalY = e.clientY;

            let dx = finalX - initialX;
            let dy = finalY - initialY;

            stickyPad.style.top = stickyPad.getBoundingClientRect().top + dy + "px";
            stickyPad.style.left = stickyPad.getBoundingClientRect().left + dx + "px";

            initialX = finalX;
            initialY = finalY;
        }
    });

    stickyNav.addEventListener("mouseup", () => {
        isStickyHold = false;
    })

    return content;
}