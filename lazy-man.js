class _LazyMan {
	constructor(name) {
    this.tasks = []
    const task = _ => {
      this.log(`Hi, This is ${name}`)
      this.next()
    }
    this.tasks.push(task)
    this.wait(0).then(_ => {
      this.next()
    })
  }
  
  next() {
    const task = this.tasks.shift() // 取第一个任务执行，并删除
    task && task()
  }
  
  sleep(time) {
    this._sleepWrapper(time, false)
    return this // 链式调用
  }
  
  sleepFirst(time) {
    this._sleepWrapper(time, true)
    return this // 链式调用
  }
  
  _sleepWrapper(time, first) {
    const task = async _ => {
      await this.wait(1000)
      this.log(`Wake up after ${time}`)
      this.next()
    }
    first 
      ? this.tasks.unshift(task)  // 放到任务队列顶部
      : this.tasks.push(task)     // 放到任务队列尾部
  }
  
  eat(name) {
    const task = _ => {
      this.log(`Eat ${name}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }
  
  log(...args) {
    console.log(...args)
  }
  
  wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve(time))
    })
  }
}

function LazyMan(name) {
  return new _LazyMan(name)
}


// LazyMan('Lan').sleep(1000).eat('香蕉').eat('面条')
// LazyMan('Man').sleepFirst(1000).eat('面条').eat('香蕉')
