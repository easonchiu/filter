# filter
# 对象过滤器

###  用法
```js
// 定义一个对象
const obj = {
  fooA: 'bar1',
  fooB: 'bar2',
  fooC: 'bar3',
  fooD: 'bar4'
}

//------------------------

// 1. 过滤
// newObjA将会得到 { fooA: 'bar1', fooC: 'bar3' }

const newObjA = fiilter(obj, {
  fooA: 1,
  fooC: 1
})

//------------------------

// 2. 反向过滤
// newObjB将会得到 { fooA: 'bar1', fooB: 'bar2', fooC: 'bar3' }

const newObjA = fiilter(obj, {
  fooD: 0
})

//------------------------

// 3. 计算
// newObjC将会得到 { fooA: 'hello bar1', fooB: 'bar2', fooC: 'bar3', fooD: 'bar4' }

const newObjC = filter(obj, {
  fooA: e => 'hello ' + e
})

//------------------------

// 4. 代理
// newObjD将会得到 { newFooA: 'bar1', fooB: 'bar2', fooC: 'bar3', fooD: 'bar4' }

const newObjD = filter(obj, {
  newFooA: '$fooA',
  fooA: 0
})


```
