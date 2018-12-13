# ==和===

当使用这两个相等操作符时，可能会引起一些困惑。使用==时，不同类型的值也可以被看作相等。

## 相等操作符（==）
|类型（x）   |类型 （y）   |结果|
|---------  |:-----------:|:--------------:|
|null       |undefined    |   true        |
|undefined  |null         |   true        |
|数字       |字符串        |x == toNumber(y)|
|字符串     |数字          |toNumber(x) == y|
|布尔值     |任何类型       |toNumber(x) == y|
|任何类型    |布尔值        |x == toNumber(y)|
|字符串或数字|对象          |x == toPrimitive(y)|
|对象       |字符串或数字   |toPrimitive(x) == y|

如果 x 和 y 是相同类型，JavaScript会比较它们的值或对象值。其他没有列在这个表格中的情况都会返回false。

`toNumber`和`toPrimitive`方法是内部的，并根据以下表格对其进行估值。

`toNumber`方法对不同类型返回的结果如下:
|值类型        |结果       |
|----          |:---------:|
|undefinded    |NaN       |
|null          | +0       |
|布尔值         |如果是true，返回1；如果是false，返回+0|
|数字           |数字对应的值|
|字符串         |将字符串解析成数字，如果字符串中包含字母，返回NaN;如果是由数字组成的，转换成数字|
|对象           |Number(toPrimitive(value))|

`toPrimitive`方法对不同类型返回的结果如下：
|值类型  |结果       |
|----    |:---------:|
|对象    |如果对象的valueOf方法的结果是原始值，返回原始值。|

代码验证：
```js
console.log('packt' ? true : false)  // true

console.log('packt' == true)    // false
console.log('packt' == false)    // false
```

分析`'packt' == true`：
* 首先，布尔值会被`toNumber`方法转成数字，因此得到`packt == 1`;
* 其次，用`toNumber`转换字符串值。因为字符串包含有字母，所以会被转成`NaN`，表达式就变成了`NaN == 1`，结果就是`false`。

## 全等操作符（===）
如果比较的两个值类型不同，比较的结果就是false。如果比较的两个值类型相同，结果会根据下表判断。

|类型（x）|值   |结果|
|--------|:----:|:---:|
|数字  |x和y数值相同（但不是NaN）|true|
|字符串|x和y是相同的字符        |true|
|布尔值|x和y都是true或false     |true|
|对象  |x和y引用同一个对象      |true|
