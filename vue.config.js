const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    host:'0.0.0.0',//如果不想被外部访问，则需要设置为0.0.0.0
    port:8080,//端口号
    https:false,//false表示使用http，true表示使用https
    open:true,//true表示启动应用后，自动打开默认浏览器
    proxy:{
      // /api/test --> 转换成 http://192.168.14.88:3000/api/test
      '/api':{
        target:'http://192.168.14.88:3000',
        changeOrigin:true,//是否跨域
        pathRewrite:{
          '^/api':''//将/api置为''，例如：http://192.168.14.88:3000/api/test --> http://192.168.14.88:3000/test
        },
        // 当不想代理全部的/api时，可用bypass函数来过滤
        bypass:function(req,res,proxyOptions){
          if(req.headers.accept.indexOf('html')!==-1){
            return '/index.html'
          }
        }
      }
    },
    proxy:[
      {
        // 当遇到api和auth时，都会代理到同个target上
        context:['/api','/auth'],
        target:'http://192.168.14.88:3000',
        changeOrigin:true
      }
    ],
    proxy:{
      '/api':{
        target:'https://other-server.example.com',
        secure:false,//默认为true，当遇到target是https时，secure要置为false
        changeOrigin:true,
      }
    },
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        
        bypass:function(req,res,proxyOptions){
          if(req.headers.accept.indexOf('html')!==-1){
            return '/index.html'
          }
        }
      }
    }
  }
})
