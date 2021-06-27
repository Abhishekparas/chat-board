let imageUpload = document.querySelector("#img-upload");
// let imageLabel = document.querySelector("#img-label");
let download = document.querySelector("#download-img");

imageUpload.addEventListener("change",() => {
    // console.log(imageUpload.files);
    let src = URL.createObjectURL(imageUpload.files[0]);
    console.log(src);
    let img = document.createElement("img");
    img.setAttribute("src",src);
    img.classList.add("imgUpload")
    let content = createSticky();
    content.appendChild(img);
});

download.addEventListener("click",() => {
    let aTag = document.createElement("a");
    aTag.setAttribute("download",'filename.png');
    aTag.href = document.getElementById("canvas").toDataURL("image/png");
    aTag.click();
})