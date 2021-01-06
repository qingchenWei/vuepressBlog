---
title: Vue3系列讲解-9
date: 2020-10-15
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 -  Vue
---

:::tip Abstract
1. Vue3相关新增和底层
2. `customRef`
3. 自定义 ref
:::

<!-- more -->

## customRef 用于自定义 ref

经过前面几章的讲解，我们基本明白了 `ref` 的作用和意义。

有的 `ref` 可以与视图层实现双向数据绑定，而有的则不能。假如我们需要自定义一个 `ref` ，当这个 `ref` 监听的数据变化时，执行我们自己定义的方法，就像是 `watchfEffect`  一样去检测一个数据，则可以使用 `customRef`

### 示例

```vue
<template>
<div>
  <p>{{obj}}</p>
  <button @click="inc">button</button>
</div>
</template>

<script>
import { customRef } from 'vue';

// customRef用于 自定义ref
// 自定义 ref 需要提供参数传值
function myRef(value) {
    // 自定义 ref 需要提供 customerRef 返回值
    // customer 需要提供一个函数作为参数
    // 该函数默认带参数 track 和 trigger ，都是方法。
    return customRef((track, trigger) => {
      return {
        // customer 需要提供一个对象 作为返回值
        // 该对象需要包含 get 和 set 方法。
        get() {
          // track 方法放在 get 中，用于提示这个数据是需要追踪变化的
          track();
          console.log('get', value);
          // get 方法需要返回值，一般就是 value，当然也可以自定义。
          return value;
        },
        // set 传入一个值作为新值，通常用于取代 value
        set(newValue) {
          console.log('set', newValue);
          value = newValue;
          // 如果需要追踪，记得触发事件 trigger
          trigger();
        }
      }
    })
}

export default {
  name: 'App',
  setup() {
    // 应用上面的自定义 ref ，使用方案和之前的 ref 是类似的。
    const obj = myRef(123);
    function inc() {
      obj.value += 1;
    }

    return {
      obj,
      inc
    };
  }
}
</script>
```

这并不是一个多么复杂的方法，如果要使用，记得是在自定义的 `ref` 中返回一个 `customRef`，而 `customRef` 也要返回一个对象，相当于二重嵌套的返回。

假如我们去掉了 `track` 和 `trigger` ，那么将失去视图层追踪变化的能力。如果需要进行视图层追踪，请注意在 `set` 中 `value` 发生变化后即刻执行 `trigger`。

### 实例2

考虑一个通常情况下会出现的场景，我们需要读取另一个文件里的数据，而这个过程是异步的。

首先是数据，它放在 public 文件夹里。

```json
// data.json
[
    {
        "name": "GuanYu",
        "id": 1
    },
    {
        "name": "ZhangFei",
        "id": 2
    },
    {
        "name": "MaChao",
        "id": 3
    },
    {
        "name": "ZhaoYun",
        "id": 4
    },
    {
        "name": "HuangZhong",
        "id": 5
    }
]
```

如果我们并未使用 `customRef` 来执行自定义。

```vue
<template>
<ul>
  <li v-for="item in obj" :key="item.id">
    {{item.id}} - {{item.name}}
  </li>
</ul>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    // 创建一个空数组 ref
    const obj = ref([]);
    // 使用 fetch 异步获取文件内容
    fetch('../public/data.json')
      .then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        obj.value = data;
      }).catch((err) => {
        console.log(err);
      })

    return {
      obj,
    };
  }
}
</script>
```

这是一个办法，但还有更加具有可复用性的方案。

```vue
<template>
<ul>
  <li v-for="item in obj" :key="item.id">
    {{item.id}} - {{item.name}}
  </li>
  <button @click="getNewObj">newObj</button>
</ul>
</template>

<script>
import { customRef } from 'vue';

function fetchRef(value) {
  return customRef((track, trigger) => {
    // 用于存储获得的数据
    let ans;
    function getAns() {
      fetch(value)
        .then((res) => {
          return res.json();
        }).then((data) => {
          console.log(data);
          // 将获得的数据存储起来
          ans = data;
          // 提示触发视图层变化
          trigger();
        }).catch((err) => {
          console.log(err);
        });
    }
    getAns();
    return {
      get() {
        track();
        return ans;
      },
      set(newValue) {
        value = newValue;
        // 修改 value 的同时再次进行数据的抓取
        getAns();
      }
    }
  })
}

export default {
  name: 'App',
  setup() {
    const obj = fetchRef('../public/data.json');

    // 修改数据源
    function getNewObj() {
      obj.value = '../public/data1.json';
    }
    return {
      obj,
      getNewObj
    };
  }
}
</script>
```

在这个方案中，我将 获取数据的方案 封装存储在 自定义`ref` 中，在初始化的时候，会在获取数据之后执行 `trigger` 进行视图层的变化。

而在设置新值的时候，再次触发获取数据的方案，从而实现复杂的双向数据绑定。

点击 `button` ，可以改变数据，并实现视图层的变化。

```json
// data1.json
[
    {
        "name": "LiuBei",
        "id": 6
    },
    {
        "name": "CaoCao",
        "id": 7
    },
    {
        "name": "SunQuan",
        "id": 8
    }
]
```

 