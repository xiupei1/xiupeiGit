"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = download;
/**
 * 下载文件
 *
 * @export
 * @param {*} type 设置接收数据类型 参数 1 或 2
 * @param {*} data type为 1 时 data 为文件地址； type为 2 时 data 为canvas对象
 * @param {*} name 当文件为图片类型时需设置文件名
 */
function download(type, data, name) {
  if (type === 1) {
    var url = data;
    // 通过地址判断是否为图片类型文件
    var ext = url.slice(url.lastIndexOf(".") + 1).toLowerCase();
    if (isImage(ext)) {
      convertUrlToBase64(url).then(function (base64) {
        var blob = convertBase64UrlToBlob(base64);
        // 下载
        if (myBrowser() === "IE") {
          window.navigator.msSaveBlob(blob, name + ".jpg");
        } else {
          var a = document.createElement("a");
          a.download = name;
          a.href = URL.createObjectURL(blob);
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
    } else {
      var a = document.createElement("a");
      a.download = name;
      a.href = url;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } else {
    var dataURL = data.toDataURL("image/jpeg", 1.0);
    var base64 = {
      dataURL: dataURL,
      type: "image/jpg",
      ext: "jpg",
    };
    var blob = convertBase64UrlToBlob(base64);
    // 下载
    if (myBrowser() === "IE") {
      window.navigator.msSaveBlob(blob, name + ".jpg");
    } else {
      var _a = document.createElement("a");
      _a.download = name;
      _a.href = URL.createObjectURL(blob);
      _a.style.display = "none";
      document.body.appendChild(_a);
      _a.click();
      document.body.removeChild(_a);
    }
  }
}

/**
 * 将 base64 转换位 blob 对象
 * blob 存储 2进制对象的容器
 * @export
 * @param {*} base64
 * @returns
 */
function convertBase64UrlToBlob(base64) {
  var parts = base64.dataURL.split(";base64,");
  var contentType = parts[0].split(":")[1];//匹配成image/png
  var raw = window.atob(parts[1]);//atob：用于解码base64编码的字符串
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);//给uintArray内存空间设成跟数据长度一样
  for (var i = 0; i < rawLength; i++) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

/**
 * 将图片地址转换为 base64 格式
 *
 * @param {*} url
 */
function convertUrlToBase64(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      var base64 = {
        dataURL: dataURL,
        type: "image/" + ext,
        ext: ext,
      };
      resolve(base64);
    };
  });
}

// 判断浏览器类型
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  //判断是否Opera浏览器 OPR/43.0.2442.991
  if (userAgent.indexOf("OPR") > -1) {
    return "Opera";
  }
  //判断是否Firefox浏览器  Firefox/51.0
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  }
  //判断是否IE浏览器  Trident/7.0; rv:11.0
  if (userAgent.indexOf("Trident") > -1) {
    return "IE";
  }
  //判断是否Edge浏览器  Edge/14.14393
  if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  }
  // Chrome/56.0.2924.87
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  //判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  }
}

// 判断文件是否为图片类型
function isImage(ext) {
  if (
    ext === "png" ||
    ext === "jpg" ||
    ext === "jpeg" ||
    ext === "gif" ||
    ext === "bmp"
  ) {
    return true;
  }
}
function downloadHelp() {
  // 判断是否有下载权限
  if (this.permList.indexOf("/system/file/download") == -1) {
    this.$message.warning("抱歉，您没有操作权限！");
  } else {
    let param = { fileName: "产品使用手册V1.0 .docx", };
    fileDownload(param).then((res) => {
      let data = res.data;
      //处理下载失败情况，由于：responseType: 'blob'会把data强制转为blob，
      // 解决：将已转为blob类型的data转回json格式，判断是否下载成功
      let filereader = new FileReader();
      filereader.onload = function () {
        try {
          let jsonData = JSON.parse(this.result); // this.result为FileReader获取blob数据转换为json后的数据，即后台返回的原始数据
          alert(jsonData.respDesc);
          // if (!!jsonData["respCode"]) {
          // this.$message.error(jsonData.respDesc);
          // }
        } catch (err) {
          //解析成对象失败，说明是正常的文件流
          if (window.navigator.msSaveOrOpenBlob) {
            // 兼容ie11
            try {
              // window.navigator.msSaveBlob(res.data, param.fileName); //response为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([response.data]) 注意这里需要是数组形式的,fileNm就是下载之后的文件名
              window.navigator.msSaveOrOpenBlob(res.data, param.fileName);
            } catch (e) {
              console.log(e);
            }
          } else {
            //chrome浏览器
            let streamData = res.data;
            // 创建blob对象，传入后端返回的文件流
            let blob = new Blob([streamData], {
              type: "application/octet-stream;charset=utf-8",
            });
            let downloadUrl = window.URL.createObjectURL(blob); //创建下载的链接
            let alink = document.createElement("a");
            alink.href = downloadUrl;
            alink.download = param.fileName; //下载的文件名
            alink.click(); //点击下载
            window.URL.revokeObjectURL(downloadUrl); //释放blob对象
          }
        }
      };
      filereader.readAsText(data); // FileReader的API
    })
        .catch((error) => {
          console.log(error);
        });
  }
}