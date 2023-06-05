//<button onclick="showOrDownload('data:image/jpeg;base64,4RK0RXhpZgAATU0AKgAAAAgADAEAAAMAAAA')">下载图片</button>
// <button onclick="showOrDownload('data:application/pdf;base64,4AAQSkZJRgABAQAA')">打开pdf</button>
//原文链接：https://blog.csdn.net/weixin_43883951/article/details/128237805
// genggaidd
function showOrDownload(base64String) {
    //这里截取后的fileHeader是data:image/jpeg
    var fileHeader = base64String.slice(0, base64String.indexOf(";base64"));
    //图片格式的imageType是image，所以就不用判断具体的图片类型了
    var imageType = fileHeader.slice(fileHeader.indexOf(":") + 1, fileHeader.indexOf("/"));
    if (imageType === 'image') {
        //图片下载
        this.base64StringToDownload(base64String); 
        // 图片预览
        // this.showImage(base64String);
        return;
    }
    var a
    var fileType = fileHeader.slice(fileHeader.indexOf("/") + 1);
    if (fileType === 'pdf') {
        //pdf预览
        this.showPdf(base64String);
        return;
    }
    //其他类型文件只能下载
    this.base64StringToDownload(base64String);
}
// 图片预览
function showImage(base64String) {
    const img = new Image();
    img.src = base64String;
    const newWin = window.open("", "_blank");
    newWin.document.write(img.outerHTML);
    newWin.document.title = "附件";
    newWin.document.close();
}
// pdf预览
function showPdf(base64String) {
    var pdfResult = base64String;
    let pdfWindow = window.open("");
    pdfWindow.document.write("<iframe width='100%' height='100%' src=" + pdfResult + "></iframe>");
    pdfWindow.document.title = "附件"
    pdfWindow.document.close();
}
function base64StringToBlob(base64String) {
    var arr = base64String.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}
function base64StringToDownload(base64String) {
    //生成唯一的文件名，长度可以自己定义  
    const id = Number(Math.random().toString().substr(3, 5) + Date.now()).toString(36);
    let blob = this.base64StringToBlob(base64String);
    let url = URL.createObjectURL(blob)
    let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = url
    save_link.download = "附件" + id;
    save_link.click();
}
