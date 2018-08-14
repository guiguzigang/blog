# Generatator 实现长轮询

```js
// generatator函数
const longPoll = function*() {
  yield new Promise( (resolve, reject) => {
    fetch("http://example.com/movies.json")
      .then(response => response.json())
      .then(res => resolve(res))
      .catch(err => {
        console.error('Error:', err)
        reject(err)
      })
  })
}

const pull = _ => {
  const genertaor = longPoll()
  const step = genertaor.next()
  step.value.then(res => {
    if(res.success){
      setTimeout(function () {
        console.info('wait')
        pull()
      }, 1000)
    }else{
      console.info(res)
    }
  })
}
```
