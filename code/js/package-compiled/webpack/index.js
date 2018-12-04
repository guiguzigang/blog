import test1 from './test1.js'
import {test2} from './test2.js'

[test1, test2].forEach(item => {
  console.log(item.name)
})