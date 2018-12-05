# React 与组件化

## 什么事组件

组件组件是能够完成某种功能并且向外提供若干个使用这种功能的接口的可重用代码集，在前段则是以 JS 完成对视图、数据与变化逻辑（数据驱动视图变化）的**封装**，通过`props`暴露对外的接口，已达到某一功能的封装与**复用**；

在 React 中使用的组件语法是 JSX。

## JSX

JSX 其实是语法糖，开发环境会将 JSX 编译成 JS 代码，JSX 的写法大大降低了学习成本和编码工作量，同时，JSX 也会增加 debug 成本；

List组件:
```jsx
//  List组件list.js
import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const list = this.props.data;
    return (
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    );
  }
}
export default List;
```

JSX 功能已经完备，现在已经独立成标准了，JSX 是 React 引入的，但不是 React 独有的，React 已经将它作为一个独立标准开放，其他项目也可用，React.createElement 也是可以自定义修改的。

## 自定义组件的解析

div直接渲染成`<div>`即可，vdom 可以做到，List是自定义组件（class），vdom 默认不认识，
因此 Input 和 List 定义的时候必须声明 render 函数，根据 props 初始化实例，然后执行实例的 render 函数，render 函数返回的还是 vnode对象；

```jsx
import React, { Component } from "react";
import List from "./list.js";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["a", "b"]
    };
  }
  render() {
    return (
      <div>
        <List data={this.state.list} />
      </div>
    );
  }
  addTitle(title) {
    const currentList = this.state.list;
    this.setState({
      list: currentList.concat(title)
    });
  }
}

// render中return的组件解析后，这里的React就是为什么每个React组件都需要引入React的原因
React.createElement(
  "div",
  null,
  React.createElement(List, { data: this.state.list })
);

// List组件解析后
React.createElement(
  "ul",
  null,
  list.map((item, index) => {
    return React.createElement("li", { key: index }, item);
  })
);
```

渲染过程如下：

- 初次渲染 - ReactDOM.render(<App/>, container)
- 触发 patch(container, vnode)
- re-render - setState（异步执行，减少重复setState）
- 再次触发 patch(vnode, newVnode)

## Vue与React的区别

**本质区别**
* Vue - 本质是 MVVM 框架，由 MVC 发展而来
* React - 本质是前端组件化框架，由后端组件化发展而来
* 但这并不妨碍他们两者都能实现相同的功能

**模板的区别**
* vue - 使用模板（最初由 angular 提出）
* React - 使用 JSX
* 模板语法上，JSX更好些
* 模板分离上，Vue做的更好（模板应该和 JS 逻辑分离）

**组件化的区别**

* React 本身就是组件化，没有组件化就不是 React
* vue 也支持组件化，不过是在 MVVM 上的扩展

**共同点**
* 都支持组件化
* 都是数据驱动试图

但在国内首推Vue，文档更易读、易学、社区够大；如果团队水平较高，推荐使用React。