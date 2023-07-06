const babel = {
  targets:'ie 11',
  "presets": ["es2015", "stage-2",[
    // babel-preset-env和babel-transform-runtime的区别
    // 前者是预设，后者是插件；预设是插件的集合
    // 前者是全局方式polyfill，后者是局部变量方式polyfill
    // 后者更适合用于库的开发
    'babel-preset-env',{
      module:'CommonJS',
      targets:'ie 9',//它的用法与 browserslist一致。它可以用来设置我们的代码需要兼容的目标环境
      // 'usage':只会polyfill项目中所用到的缺失
      // 'entry':表示系统不要自己去引入polyfill，采用我们自己在项目中import引入的所有或者某些polyfill
      // false：默认值，表示不会在项目中自动添加polyfill
      useBuiltIns:'usage',
      corejs:{
        version:'3.7.2',//corejs的版本,版本最好保持最新，越新的包，包含的polyfill越多
        proposals:true,//// 是否编译提案阶段ES6+ API：corejs有稳定的polyfill，还在提案阶段的polyfill
      }
    }
  ]],
  "plugins": ["babel-transform-runtime"],
  "comments": false
}
module.exports = babel


