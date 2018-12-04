# ES6语法的编译

## Babel 编译

初始化

```powershell
npm init
npm install --save-dev @babel/core @babel/preset-env
npm install @babel/cli -g
touch .babelrc
```

基本用法
```powershell
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

.babelrc代码
```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
```

例子：
```js
// 转码前
const list = [1,2,3]
const arr = list.map(item => item + 1)
console.log(arr)

// 转码后
"use strict";

var list = [1, 2, 3];
var arr = list.map(function (item) {
  return item + 1;
});
console.log(arr);
```

## Webpack

  由于Babel不能处理模块化（文件间的引用）的问题，所以我们需要通过webpack来处理模块化的问题。

* npm install webpack babel-loader --save-dev
* 配置 webpack.config.js
* 配置 package.json 中的 scripts

代码：
```js
// test1.js
export default {
  name: 'test1'
}

// test2.js
export const test2 = {
  name: 'test2'
}

// index.js
import test1 from './test1.js'
import {test2} from './test2.js'

[test1, test2].forEach(item => {
  console.log(item.name)
})

// webpack.config.js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './webpack/index.js',
  output: {
    path: path.resolve(__dirname, 'webpack'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
}
```

```powershell
$ webpack
Hash: 2d7dd1c3368c5c660a16
Version: webpack 4.12.0
Time: 754ms
Built at: 2018-12-01 23:29:59
    Asset      Size  Chunks             Chunk Names
bundle.js  3.96 KiB       0  [emitted]  main
[0] ./webpack/index.js + 2 modules 212 bytes {0} [built]
    | ./webpack/index.js 138 bytes [built]
    | ./webpack/test1.js 35 bytes [built]
    | ./webpack/test2.js 39 bytes [built]


$ node bundle
test1
test2
```




