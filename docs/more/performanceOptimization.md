# 前端性能优化

`  WEB前端本质上是一种GUI软件，本可以直接借鉴其它GUI系统架构设计方案，但WEB前端有点特别：传统的CS架构的GUI软件，是软件开发完后，将软件打包发布到相关的应用平台上，需要用户从应用平台下载到本地解压安装后使用，实际上用户在使用软件时，用户本地是在访问本地的一些资源，而WEB前端（BS架构）则是开发完后将代码发布到服务器、cdn上，用户使用时，只需要通过浏览器访问网址，而浏览器则会向远程的服务器发送请求，服务器返回相关资源，这个过程是一个动态的增量的加载相关资源；所以缩短服务器向浏览器返回数据的时间就能让客户的体验更好；`

首先了解一下，浏览器的一个请求从发送到返回都经历了什么？
<div align="center">
  <img src="./performanceOptimization/1.png"/>
</div>

**请求过程中一些潜在的性能优化点：**
* dns可以通过缓存，减少dns查询时间
* 网络请求的过程走最近的网络环境
* 相同的静态资源缓存
* 减少请求http请求大小
* 减少http请求
* 服务端渲染


## 资源合并与压缩

**资源合并与压缩主要就是减少http请求数量和减少请求资源大小**

资源压缩可以从以下几个方面着手：
* html压缩
  * nodejs提供的html-minifier
  * 后端模板引擎渲染压缩
* css压缩(无效代码删除, css语义合并)
  * html-minifier对html中的css进行压缩
  * clean-css对css进行压缩
* js的压缩与混乱(无效字符的删除、剔除注释、代码语义的缩减和优化、代码保护)
  * html-minifier对html中的js进行压缩
  * uglifyjs2对js进行压缩
* 文件合并
  * 文件与文件之间有插入的上行请求，增加了N-1个网络延迟受
  * 丢包问题影响更严重
  * 经过代理服务器时可能会被断开
* 开启gzip

## 图片相关的优化

**png8/png24/png32之间的区别**
* png8 —— 256色 + 支持透明
* png24 —— 2^24色 + 不支持透明
* png32 —— 2^24色 + 支持透明 

**不同格式图片常用的业务场景**
* jpg有损压缩，压缩率高，不支持透明
* png支持透明，浏览器兼容好
* webp压缩程度更好，在ios webview有兼容性问题 
* svg矢量图，代码内嵌，相对较小，图片样式相对简单的场景

**优化方案**
* 进行图片压缩
* CSS雪碧图(减少你的网站的HTTP请求数量)
* Image inline(将图片的内容内嵌到html当中)
* 使用SVG进行矢量图的绘制
* 使用iconfont解决icon问题
* 在安卓下使用webp

## 懒加载与预加载

**懒加载**
* 图片进入可视区域之后请求图片资源
* 对于电商等图片很多，页面很长的业务场景适用
* 减少无效资源的加载
* 并发加载的资源过多会阻塞JS的加载，影响网站的正常使用

**懒加载实现原理**
判断图片距离可视区顶部的距离是否小于可视区的高度，如果小于则加载图图片资源，使用lazyload时必须固定图片的宽高
```html
<div class="image-list">
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
  <img src="" lazyload="true" data-original="http://www.sanjiaoniu.com/files/1506/1-1506130ZT90-L.jpg" />
</div>
```

```js
const viewHeight = document.documentElement.clientHeight // 可视区高度
function lazyload() {
  const eles = document.querySelectAll('img[data-original][lazyload]')

  Array.prototype.forEach.call(eles, (item, index) => {
    let rect
    if (item.dataset.original === '') return
    rect = item.getBoundingClientRect()
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      !function() {
        const img = new Image()
        img.src = item.dataset.original
        img.onload = function() {
          item.src = img.src
        }
        item.removeAttribute('data-original')
        item.removeAttribute('lazyload')
      }()
    }
  })
}

lazyload()
document.addEventListener('scroll', lazyload)
```

**预加载**
* 图片等静态资源在使用之前的提前请求
* 资源使用到时能从缓存中加载，提升用户体验
* 页面展示的依赖关系维护

**预加载的实现**
* 直接使用img标签，并设置`style="display: none;"`
* 使用img对象`new Image()`
* 使用ajax（XMLHttpRequest）请求
  * 优点：可以精细的控制，监听请求过去
  * 缺点：不能跨域
* PreloadJS库


## 重绘回流

html 页面加载渲染的过程
<div align="center">
  <img src="./performanceOptimization/2.png"/>
</div>

**回流（Reflow）**

`当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建,这就称为回流(reflow)；当页面布局和几何属性改变时就需要回流`
::: tip 注意：
  回流必将引起重绘，而重绘不一定会引起回流
:::

**重绘（Paint）**

`当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color，则就叫称为重绘。`

**触发页面重布局的属性**
* 盒子模型相关属性会触发重布局
* 定位属性及浮动也会触发重布局
* 改变节点内部文字结构也会触发重布局

`width、height、padding、margin、display、border-width、border、min-height、top、bottom、left、right、position、float、clear、text-align、overflow-y、font-weight、overflow、font-family、line-height、vertival-align、white-space、font-size`

**只触发重绘的属性**

`color、border-style、border-radius、visibility、text-decoration、background、background-image、background-position、background-repeat、background-size、outline-color、outline、outline-style、outline-width、box-shadow`

**新建DOM的过程**
1. 获取DOM后分割为多个图层
2. 对每个图层的节点计算样式结果（Recalculate style--样式重计算）
3. 为每个节点生成图形和位置（Layout--回流和重布局）
4. 将每个节点绘制填充到图层位图中（Paint Setup和Paint--重绘）
5. 图层作为纹理上传至GPU
6. 符合多个图层到页面上生成最终屏幕图像（Composite Layers--图层重组）

**Chrome创建图层的条件（devtool: performance、layout）**
* 3D或透视变换（perspective / transform: translateZ(0) / will-change: transform）CSS属性
* 使用加速视频解码的video节点
* 拥有3D（WebGL）上下文或加速的2D上下文的canvas节点
* 混合插件（如Flash）
* 对自己的opacity做CSS动画或使用一个动画webkit变换的元素
* 拥有加速CSS过滤器的元素
* 元素有一个包含复合层的后代节点（一个元素拥有一个子元素，该子元素在自己的层里）
* 元素有一个z-index较低且包含一个复合层的兄弟元素（换句话说就是该元素在复合层上面渲染）


**实战优化点**
1. 用translate替代top改变
2. 用opacity替代visibility
3. 不要一条一条地修改 DOM 的样式，预先定义好 class，然后修改 DOM 的 className
4. 把 DOM 离线后修改，比如：先把 DOM 给 display:none (有一次 Reflow)，然后你修改100次，然后再把它显示出来
5. 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量
6. 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
7. 动画实现的速度的选择
8. 对于动画新建图层
9. 启用 GPU 硬件加速
