# VUEX 使用技巧

## 热更新

平常开发时，vuex 状态改变时，总是会刷新整个页面，之前在页面上的操作一下就都刷没了，下面这段代码就可以解决 vuex 状态更新时只改变状态发生改变的点，而不会刷新整个页面

```js
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import state from "./state";
import mutations from "./mutations";

const isDev = process.env.NODE_ENV === "development";

const store = new Vuex.Store({
  strict: isDev,
  state,
  mutations,
  getters,
  actions
});

if (module.hot) {
  module.hot.accept(
    ["./state", "./mutations", "./actions", "./getters"],
    () => {
      const newState = require("./state").default;
      const newMutations = require("./mutations").default;
      const newActions = require("./actions").default;
      const newGetters = require("./getters").default;

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      });
    }
  );
}

export default store;
```

先判断是否有`module.hot`插件，如果有则监听 `./state` `./mutations` `./actions` `./getters`文件

文件发生改变时再次引入文件包，并通过`store.hotUpdate`方法达到热加载页面的目的

## 添加日志

项目开发中 vuex 状态改变日志监控，让 vuex 操作可追溯

vuex 目录

```bash
├─store
│      actions.js
│      getters.js
│      index.js
│      mutations.js
│      mutation_types.js
│      state.js
```

index.js 中添加如下代码

```js
import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import state from "./state";
import mutations from "./mutations";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
```

`process.env.NODE_ENV !== 'production'` 判断，让生产环境不打印日志

通过 vuex 官方提供的`createLogger`插件让每次操作 vuex 时都会有日志产出（控制台查看）

# 添加日志

项目开发中 vuex 状态改变日志监控，让 vuex 操作可追溯

vuex 目录

```bash
├─store
│      actions.js
│      getters.js
│      index.js
│      mutations.js
│      mutation_types.js
│      state.js
```

index.js 中添加如下代码

```js
import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import state from "./state";
import mutations from "./mutations";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
```

`process.env.NODE_ENV !== 'production'` 判断，让生产环境不打印日志

通过 vuex 官方提供的`createLogger`插件让每次操作 vuex 时都会有日志产出（控制台查看）
