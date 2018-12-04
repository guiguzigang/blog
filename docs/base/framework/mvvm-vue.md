# MVVM 与 VUE

## 首先了解一下 VDOM（虚拟 DOM）

## jQuery 与使用 VUE 框架的区别

下面是 jQuery 实现 todo-list 的代码：

```html
<!-- HTML部分 -->
<div id="app">
  <div>
    <input type="text" name="" id="txt-title" />
    <button id="btn-submit">submit</button>
  </div>
  <ul id="ul-list"></ul>
</div>

<!-- JS部分 -->
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
  const $txtTitle = $("#txt-title");
  const $btnSubmit = $("#btn-submit");
  const $ulList = $("#ul-list");
  $btnSubmit.click(() => {
    const title = $txtTitle.val();
    if (!title) {
      return;
    }
    const $li = $("<li>" + title + "</li>");
    $ulList.append($li);
    $txtTitle.val("");
  });
</script>
```

再来看看 VUE 实现 todo-list 的代码：

```html
<!-- HTML部分 -->
<div id="app">
  <div><input v-model="title" /> <button v-on:click="add">submit</button></div>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>

<!-- JS部分 -->
<script type="text/javascript">
  // data 独立
  var data = {
    title: "",
    list: []
  };
  // 初始化 Vue 实例
  var vm = new Vue({
    el: "#app",
    data: data,
    methods: {
      add: function() {
        this.list.push(this.title);
        this.title = "";
      }
    }
  });
</script>
```

上面代码中我们可以看到，`jQuery`实现的 todo-list 主要是依靠对 dom 的操作，而
前端操作 dom 时非常耗性能的，为什么可以查看[浏览器渲染](https://guiguzigang.github.io/blog/more/web-optimization.html#重绘回流)）；而`VUE`代码的实现则是**以数据驱动视图**，我们只需要关心数据的变化，DOM 操作都被框架封装好了，且做到了**数据和视图的分离**，达到了视图与数据解耦的效果，遵循了我们的开放封闭原则；

## 什么是 MVVM

说道 MVVM 不得不提 MVC，MVC 全名是 Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。更详情的可以查看阮一峰老师的[谈谈 MVC 模式](http://www.ruanyifeng.com/blog/2007/11/mvc.html)这篇博客；

MVVM 则是采用双向绑定（Vue 中是`Object.definePropoty`），通过 ViewModel 连接 Model 和 View，View 的变动，通过 ViewModel 监听事件来改变 Model；Model 的变动则通过 ViewModel 直接反映在 View 上，借助下面这张图来理解一下：

<div align="center">
  <img src="./mvvm-vue/1.png"/>
</div>

上面的 VUE 现实 todo-list 的代码中 div#app 包裹的部分就是 View，data 就是 Model，而实例化出来的 Vue 就是 ViewModel

## MVVM 框架的三大要素

- 响应式： 监听到 data 每个属性的变化
- 模板引擎： 解析模板，处理模板中的逻辑指令
- 渲染： 将模板渲染成 HTML，并通过 vnode 与 diff 算法提高渲染效率

在 Vue 中响应式主要是通过`Object.definePropoty`方法实现的，通过`Object.definePropoty`的 getter 与 setter 来实现数据变动的监听，然后将 data 中的数据代理到 Vue 实例上；

```js
var obj = {};
var _name = "shangsan";
Object.defineProperty(obj, "name", {
  getter: function() {
    console.log("getter", _name); // 监听
    return _name;
  },
  setter: function(newVal) {
    console.log("setter", newVal); // 监听
    _name = newVal;
  }
});
```

## Vue 的整体实现流程

1. 解析模板成 render 函数

- 使用 with，省略 this 的使用
- 模板中的所有信息都被 render 函数包含
- 模板中用到的 data 中的属性，都变成了 JS 变量
- 模板中的 v-model v-for v-on 都变成了 JS 逻辑
- render 函数返回 vnode

```js
// 下面的这段代码就是上面vue模板解析后返回的vdom对象
with (this) {
  // this 就是 vm
  return _c(
    "div",
    {
      attrs: { id: "app" }
    },
    [
      _c("div", [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: title,
              expression: "title"
            }
          ],
          domProps: {
            value: title
          },
          on: {
            input: function($event) {
              if ($event.targetter.composing) return;
              title = $event.targetter.value;
            }
          }
        }),
        _v(" "),
        _c(
          "button",
          {
            on: {
              click: add
            }
          },
          [_v("submit")]
        )
      ]),
      _v(" "),
      _c("div", [
        _c(
          "ul",
          _l(list, function(item) {
            return _c("li", [_v(_s(item))]);
          })
        )
      ])
    ]
  );
}
```

2. 响应式开始监听

```js
// data属性变化
Object.defineProperty(vm, key, {
  getter: function() {
    console.log("getter"); // 监听
    return vm[key];
  },
  setter: function(newVal) {
    console.log("setter"); // 监听
    vm[key] = newVal;
  }
});
```

3. 首次渲染，显示页面，且绑定依赖

- 初次渲染，执行 updateComponent，执行 vm.\_render()
- 执行 render 函数，会访问到 vm.list vm.title
- 会被响应式的 getter 方法监听到
- 执行 updateComponent ，会走到 vdom 的 patch 方法
- patch 将 vnode 渲染成 DOM ，初次渲染完成

```js
// 触发update
vm._update(vnode) {
  const prevVnode = vm._vnode
  vm._vnode = vnode
  if (!prevVnode) {
    vm.$el = vm.__patch__(vm.$el, vnode)
  } else {
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
}

function updateComponent() {
  // vm._render 返回vnode
  vm._update(vm._render())
}
```

:::tip 为什么监听 getter,直接监听 setter 不行吗？
data 中有很多属性，有些被用到，有些可能不被用到，被用到的会走到 getter，不被用到的不会走到 getter，未走到 getter 中的属性，setter 的时候我们也无需关心，避免不必要的重复渲染
:::

4. data 属性变化，触发 rerender

- 修改属性，被响应式的 setter 监听到
- setter 中执行 updateComponent
- updateComponent 重新执行 vm.\_render()
- 生成的 vnode 和 prevVnode ，通过 patch 进行对比
- 最终渲染到 html 中

```js
// data属性变化
Object.defineProperty(vm, key, {
  getter: function() {
    console.log("getter") // 监听
    return vm[key]
  },
  setter: function(newVal) {
    console.log("setter") // 监听
    vm[key] = newVal
  }
});

// 触发update
vm._update(vnode) {
  const prevVnode = vm._vnode
  vm._vnode = vnode
  if (!prevVnode) {
    vm.$el = vm.__patch__(vm.$el, vnode)
  } else {
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
}

function updateComponent() {
  // vm._render 返回vnode
  vm._update(vm._render())
}
```
