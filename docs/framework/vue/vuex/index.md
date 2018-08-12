# 添加日志

项目开发中vuex状态改变日志监控，让vuex操作可追溯

vuex目录
``` bash
├─store
│      actions.js
│      getters.js
│      index.js
│      mutations.js
│      mutation_types.js
│      state.js
```

index.js中添加如下代码
```js
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```

`process.env.NODE_ENV !== 'production'` 判断，让生产环境不打印日志

通过vuex 官方提供的`createLogger`插件让每次操作vuex时都会有日志产出（控制台查看）
