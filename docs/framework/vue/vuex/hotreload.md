# 热更新

平常开发时，vuex状态改变时，总是会刷新整个页面，之前在页面上的操作一下就都刷没了，下面这段代码就可以解决vuex状态更新时只改变状态发生改变的点，而不会刷新整个页面

```js
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'

const isDev = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
  strict: isDev,
  state,
  mutations,
  getters,
  actions
})

if (module.hot) {
  module.hot.accept([
    './state',
    './mutations',
    './actions',
    './getters'
  ], () => {
    const newState = require('./state').default
    const newMutations = require('./mutations').default
    const newActions = require('./actions').default
    const newGetters = require('./getters').default

    store.hotUpdate({
      state: newState,
      mutations: newMutations,
      getters: newGetters,
      actions: newActions
    })
  })
}

export default store
```

先判断是否有`module.hot`插件，如果有则监听 `./state` `./mutations` `./actions` `./getters`文件

文件发生改变时再次引入文件包，并通过`store.hotUpdate`方法达到热加载页面的目的
