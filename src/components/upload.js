// 创建一个上传文件分片的函数
function uploadFileChunk(file, start, end) {
    // 创建FormData对象,用于存储分片数据
    let formData = new FormData();

    let blob = new Blob([file])
    blob.slice(0,2)
    // 将分片数据添加到FormData中,分片可用file.slice或者blob.slice
    formData.append('file', file.slice(start, end));

    // 发送分片数据到服务器
    return fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            console.log('分片上传成功:', result);
        })
        .catch(error => {
            console.error('分片上传失败:', error);
        });
}

// 创建一个函数用于上传整个文件
function uploadFile(file) {
    // 定义每个分片的大小和总分片数量
    let chunkSize = 1024 * 1024; // 1MB
    let chunks = Math.ceil(file.size / chunkSize);

    // 循环上传每个分片
    let promises = [];
    for (let i = 0; i < chunks; i++) {
        let start = i * chunkSize;
        let end = Math.min(start + chunkSize, file.size);
        promises.push(uploadFileChunk(file, start, end));
    }

    // 等待所有分片上传完成
    return Promise.all(promises)
        .then(() => {
            console.log('文件上传完成');
        })
        .catch(error => {
            console.error('文件上传失败:', error);
        });
}

// 选择文件并触发上传
let fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', function(event) {
    let file = event.target.files[0];
    uploadFile(file);
    console.log(111)
    console.log(222)
    console.log(333)
    console.log(444)
});