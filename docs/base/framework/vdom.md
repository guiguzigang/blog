# VDOM

## jQuery 实现 table 新增一行的问题

代码：

```html
<!-- html部分 -->
<div id="container"></div>
<button id="btn-change">change</button>

<!-- js部分 -->
<script
  type="text/javascript"
  src="https://cdn.bootcss.com/jquery/3.2.0/jquery.js"
></script>
<script type="text/javascript">
  var data = [
    {
      name: "张三",
      age: "20",
      address: "北京"
    },
    {
      name: "李四",
      age: "21",
      address: "上海"
    },
    {
      name: "王五",
      age: "22",
      address: "广州"
    }
  ];

  // 渲染函数
  function render(data) {
    var $container = $("#container");

    // 清空容器，重要！！！
    $container.html("");

    // 拼接 table
    var $table = $("<table>");

    $table.append($("<tr><td>name</td><td>age</td><td>address</td>/tr>"));
    data.forEach(function(item) {
      $table.append(
        $(
          "<tr><td>" +
            item.name +
            "</td><td>" +
            item.age +
            "</td><td>" +
            item.address +
            "</td>/tr>"
        )
      )
    })

    // 渲染到页面
    $container.append($table);
  }

  $("#btn-change").click(function() {
    data[1].age = 30;
    data[2].address = "深圳";
    // re-render  再次渲染
    render(data);
  });

  // 页面加载完立刻执行（初次渲染）
  render(data);
</script>
```

这个操作 dom 的方法每次都是重绘 table，如果页面比较复杂，重绘过程会很影响体验效果；
所以这种操作 DOM 的方式**很昂贵**，所以我们应当尽量减少 DOM 操作，对比到这个例子中我们应该只改变数据发生改变部分的 dom 元素，而不是所有都替换；所以应将 DOM 对比操作放在 JS 层做一层过滤，已达到优化的效果；

VDOM 通过模拟 dom 对象结构和 diff 算法即可解决这个问题

```js
var div = document.createElement("div");
var item,
  result = "";
for (item in div) {
  result += " | " + item;
}
console.log(result);
// align | title | lang | translate | dir | dataset | hidden | tabIndex | accessKey | draggable | spellcheck | autocapitalize | contentEditable | isContentEditable | inputMode | offsetParent | offsetTop | offsetLeft | offsetWidth | offsetHeight | style | innerText | outerText | onabort | onblur | oncancel | oncanplay | oncanplaythrough | onchange | onclick | onclose | oncontextmenu | oncuechange | ondblclick | ondrag | ondragend | ondragenter | ondragleave | ondragover | ondragstart | ondrop | ondurationchange | onemptied | onended | onerror | onfocus | oninput | oninvalid | onkeydown | onkeypress | onkeyup | onload | onloadeddata | onloadedmetadata | onloadstart | onmousedown | onmouseenter | onmouseleave | onmousemove | onmouseout | onmouseover | onmouseup | onmousewheel | onpause | onplay | onplaying | onprogress | onratechange | onreset | onresize | onscroll | onseeked | onseeking | onselect | onstalled | onsubmit | onsuspend | ontimeupdate | ontoggle | onvolumechange | onwaiting | onwheel | onauxclick | ongotpointercapture | onlostpointercapture | onpointerdown | onpointermove | onpointerup | onpointercancel | onpointerover | onpointerout | onpointerenter | onpointerleave | nonce | click | focus | blur | namespaceURI | prefix | localName | tagName | id | className | classList | slot | attributes | shadowRoot | assignedSlot | innerHTML | outerHTML | scrollTop | scrollLeft | scrollWidth | scrollHeight | clientTop | clientLeft | clientWidth | clientHeight | attributeStyleMap | onbeforecopy | onbeforecut | onbeforepaste | oncopy | oncut | onpaste | onsearch | onselectstart | previousElementSibling | nextElementSibling | children | firstElementChild | lastElementChild | childElementCount | onwebkitfullscreenchange | onwebkitfullscreenerror | setPointerCapture | releasePointerCapture | hasPointerCapture | hasAttributes | getAttributeNames | getAttribute | getAttributeNS | setAttribute | setAttributeNS | removeAttribute | removeAttributeNS | hasAttribute | hasAttributeNS | toggleAttribute | getAttributeNode | getAttributeNodeNS | setAttributeNode | setAttributeNodeNS | removeAttributeNode | closest | matches | webkitMatchesSelector | attachShadow | getElementsByTagName | getElementsByTagNameNS | getElementsByClassName | insertAdjacentElement | insertAdjacentText | insertAdjacentHTML | requestPointerLock | getClientRects | getBoundingClientRect | scrollIntoView | scrollIntoViewIfNeeded | animate | computedStyleMap | before | after | replaceWith | remove | prepend | append | querySelector | querySelectorAll | webkitRequestFullScreen | webkitRequestFullscreen | scroll | scrollTo | scrollBy | createShadowRoot | getDestinationInsertionPoints | ELEMENT_NODE | ATTRIBUTE_NODE | TEXT_NODE | CDATA_SECTION_NODE | ENTITY_REFERENCE_NODE | ENTITY_NODE | PROCESSING_INSTRUCTION_NODE | COMMENT_NODE | DOCUMENT_NODE | DOCUMENT_TYPE_NODE | DOCUMENT_FRAGMENT_NODE | NOTATION_NODE | DOCUMENT_POSITION_DISCONNECTED | DOCUMENT_POSITION_PRECEDING | DOCUMENT_POSITION_FOLLOWING | DOCUMENT_POSITION_CONTAINS | DOCUMENT_POSITION_CONTAINED_BY | DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | nodeType | nodeName | baseURI | isConnected | ownerDocument | parentNode | parentElement | childNodes | firstChild | lastChild | previousSibling | nextSibling | nodeValue | textContent | hasChildNodes | getRootNode | normalize | cloneNode | isEqualNode | isSameNode | compareDocumentPosition | contains | lookupPrefix | lookupNamespaceURI | isDefaultNamespace | insertBefore | appendChild | replaceChild | removeChild | addEventListener | removeEventListener | dispatchEvent
```

## 什么是 VDOM

`VDOM -- Virtual DOM，即虚拟DOM，它是用JS对象模拟的DOM结构；DOM变化的对比，放在JS层来做（通过diff算法），从而提高重绘性能；`

[snabbdom](https://github.com/snabbdom/snabbdom)是 VUE 在借鉴的开源 vdom 实现方案；它有两个核心函数 h 函数与 patch 函数；

官网例子：

```js
var snabbdom = require("snabbdom");
var patch = snabbdom.init([
  // Init patch function with chosen modules
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);
var h = require("snabbdom/h").default; // 生成vnode的函数

var container = document.getElementById("container");

var vnode = h("div#container.two.classes", { on: { click: someFn } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!")
]);
// container中没有渲染时将vnode渲染到container中
patch(container, vnode);

var newVnode = h(
  "div#container.two.classes",
  { on: { click: anotherEventHandler } },
  [
    h(
      "span",
      { style: { fontWeight: "normal", fontStyle: "italic" } },
      "This is now italic type"
    ),
    " and this is still just normal text",
    h("a", { props: { href: "/bar" } }, "I'll take you places!")
  ]
);
// 此时container中已经渲染了vnode，需要将新的vnode和已渲染的vnode传入patch中。patch函数内部通过diff算法，有效的渲染container中的显示
patch(vnode, newVnode);
```

使用 snabbdom 重做

```js
var snabbdom = window.snabbdom;
// 定义关键函数 patch
var patch = snabbdom.init([
  snabbdom_class,
  snabbdom_props,
  snabbdom_style,
  snabbdom_eventlisteners
]);

// 定义关键函数 h
var h = snabbdom.h;

// 原始数据
var data = [
  {
    name: "张三",
    age: "20",
    address: "北京"
  },
  {
    name: "李四",
    age: "21",
    address: "上海"
  },
  {
    name: "王五",
    age: "22",
    address: "广州"
  }
];
// 把表头也放在 data 中
data.unshift({
  name: "姓名",
  age: "年龄",
  address: "地址"
});

var container = document.getElementById("container");

// 渲染函数
var vnode;
function render(data) {
  var newVnode = h(
    "table",
    {},
    data.map(function(item) {
      var tds = [];
      var i;
      for (i in item) {
        if (item.hasOwnProperty(i)) {
          tds.push(h("td", {}, item[i] + ""));
        }
      }
      return h("tr", {}, tds);
    })
  );

  if (vnode) {
    // re-render
    patch(vnode, newVnode);
  } else {
    // 初次渲染
    patch(container, newVnode);
  }

  // 存储当前的 vnode 结果
  vnode = newVnode;
}

// 初次渲染
render(data);

var btnChange = document.getElementById("btn-change");
btnChange.addEventListener("click", function() {
  data[1].age = 30;
  data[2].address = "深圳";
  // re-render
  render(data);
});
```

- 使用 data 生成 vnode`h(‘<标签名>’, {…属性…}, […子元素…])`
- 第一次渲染，将 vnode 渲染到`#container`中，并将 vnode 缓存下来 `patch(container, vnode)`
- 修改 data 之后，用新 data 生成 newVnode
- 将 vnode 和 newVnode 对比 `patch(vnode, newVnode)`

## [diff 算法](https://juejin.im/post/5ad6182df265da23906c8627)

DOM 操作是“昂贵”的，因此尽量减少 DOM 操作，找出本次 DOM 必须更新的节点来更新，其他的不更新，这个“找出”的过程，就需要 diff 算法，snabbdom 就是 patch 函数
