
// data:text/html,你好
// output: ä½ å¥½ -> 使用默认的编码展示，故乱码

// data:text/html;charset=UTF-8,你好
// output: 你好 -> 使用 UTF-8 展示

// data:text/html;charset=gbk,你好
// output: 浣犲ソ -> 使用 gbk 展示（浏览器默认编码 UTF-8，故乱码）

// data:text/html;charset=UTF-8;base64,5L2g5aW9 
// output: 你好 -> UTF-8 编码，内容先使用 base64 解码，然后展示