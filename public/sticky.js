/*<div class="stickyPad">
        <div class="stickyNav">
            <div class="minimize"></div>
            <div class="close"></div>
        </div>
        <div class="content">
            <textarea name="" id="stickyText" cols="30" rows="10"></textarea>
        </div>
</div>
*/
let stickyTool = document.getElementById("stickyTool");
stickyTool.addEventListener("click",() => {

    
    let textarea = document.createElement("textarea");
    
    
    textarea.setAttribute("id","stickyText");
    textarea.setAttribute("rows","10");
    textarea.setAttribute("cols","35");
    
    let content = createSticky();
    content.appendChild(textarea);
    
});
