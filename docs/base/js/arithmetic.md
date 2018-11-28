# JavaScript 算法

常见的内部排序算法有：`插入排序`、`希尔排序`、`选择排序`、`冒泡排序`、`归并排序`、`快速排序`、`堆排序`、`基数排序`等

一图胜千言：

<div align="center">
  <img src="./arithmetic/1.png"/>
</div>

## 插入排序

插入排序是在待排序数组里插入数据。一般我们认为插入排序就是往一个已经排好序的数列中插入一个元素，使得插入这个数以后，数组仍然有序。

**原理**

首先需要明确待排序的数组由两部分组成，一部分是已经排好序的部分，另一部分是待排序的部分。
接着我们每次选取待排序部分的第一个元素，分别与前面排好序的元素进行比较。当大于前面元素时，可以将该元素直接进入已排好序的部分； 当小于前面元素时，需要把这个元素拿出来暂存，将前面的元素后移，继续与前面的元素相比，直到比较到数组第一个元素或者出现第一个小于拿出的这个元素，这时停止比较、移动，直接把这个元素放到当前空位上。
一直重复步骤 2，直到待排元素已经没有元素可进行插入时，停止操作，当前数列为已排好序的数列。

**代码**

```js
function isetSort(array) {
  if (array === null) return;
  const length = array.length;
  if (length > 0) {
    for (let i = 1; i < length; i++) {
      const temp = array[i]; //记录未排好序的第一个元素为temp
      let j = i;

      for (; j > 0 && array[j - 1] > temp; j--) {
        //原理中的步骤2
        array[j] = array[j - 1]; //移位
      }
      array[j] = temp; //插入
    }
  }
}
```

## 希尔排序

### 算法描述

希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。
希尔排序是基于插入排序的以下两点性质而提出改进方法的：

- 插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；
- 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；

**实现**

```js
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1
  while (gap < len / 3) {
    // 动态定义间隔序列
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}
```
