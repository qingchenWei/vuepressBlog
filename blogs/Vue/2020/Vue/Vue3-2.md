---
title: Vue3系列讲解-2
date: 2020-10-03
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 - Vue
---

:::tip Abstract

1. Vue3相关新增和底层
2. Vue2.x 中的 TodoList 与 Vue3.0 的实现区别
3. `ref` `reactive` `setup` `composition api`
:::

<!-- more -->

## 写一个 Todo Vue

大概就是这样。

```vue
<template>
  <div>
    <form>
      <input type="text" v-model="newItem.name">
      <input type="text" v-model="newItem.age">
      <input type="submit" @click="addItem">
    </form>
    <ul>
      <li @click="removeItem(index)" v-for="(item, index) in items" :key="item.name">
        No.{{index}} - {{item.name}} - {{item.age}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          name: 'GuanYu',
          age: '56'
        },
        {
          name: 'ZhangFei',
          age: '54'
        },
        {
          name: 'MaChao',
          age: '77'
        }
      ],
      newItem: {
        name: '',
        age: ''
      }
    }

  },
  methods: {
    removeItem(i) {
      this.items = this.items.filter((currentValue, index) => index != i);
    },
    addItem(e) {
      e.preventDefault();
      this.items.push(Object.assign({}, this.newItem));
      this.newItem.name = '';
      this.newItem.age = '';
    }
  }
}
</script>
```

![01lDxA.png](https://s1.ax1x.com/2020/10/03/01lDxA.png)

有新增功能，有删除功能（直接点 li 标签就删除它）。都是标准的方案，没啥可说的。

重点不是这个 Todo List 应用，重点是，Vue3 期望用 **组合API** 的方式来解决一个应用中，数据和功能分离的问题。即方法和 data 里的数据隔了一层进行调用的问题。

## 组合 API

废话少说，先看代码。

```vue
<template>
<div>
  <p>{{count}}</p>
  <button @click="getClick">button</button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    let count = ref(0);
    function getClick() {
      count.value ++;
    }

    return {
      count,
      getClick
    };
  }
}
</script>
```

效果这样

![01lB2d.png](https://s1.ax1x.com/2020/10/03/01lB2d.png)

button 按一下，上面的数字涨一点。

![01l08H.png](https://s1.ax1x.com/2020/10/03/01l08H.png)

什么是 `setup` ，什么是 `ref` ，`return` 的又是啥玩意。

### ref

关于 `ref` ，可以参阅[这篇文章](https://juejin.im/post/6844903960562630670)，但我估计没有 ts 基础的人看不大明白，我直接抛结论：

`Ref`是这样的一种数据结构：它有个key为`Symbol`的属性做类型标识，有个属性`value`用来存储数据。这个数据可以是任意的类型，**唯独不能是被嵌套了`Ref`类型的类型。** 

`Ref`类型的数据，是一种响应式的数据。

`Ref`写法简单，但也有弊端，它只能监听一些如数字、字符串、布尔之类的简单数据。复杂数据需要用到以后讲的 `reactive` 。（实际上也可以用 `Ref` 来封装对象，只不过在访问上多一层 `value` ，稍微麻烦了一些）。

具体 `Ref` 数据的结构长这样：

![01lwPe.png](https://s1.ax1x.com/2020/10/03/01lwPe.png)

要更改它的数据，主要更改和关注它的 `value` 值就够了。

### setup

`setup`，就是我们最近老是能听到的 Composition API，组合式 API。关于这个 API 的细节，还请参阅[官方文档](https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0)，这里我只期望说一下简单的内容。

`setup` 选项应该是一个接受 `props` 和 `context` 的函数。**此外，我们从 `setup` 返回的所有内容都将暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。**

也就是说，`setup` 中创建并 return 的所有东西，都将被得到外部的解析，无论是过去在 `data` 中创建的数据也好，还是在 `methods` 创建的方法也好，都将变成允许被响应式地使用，仿佛 Vue2 中的这些 API 都被融合在一起了一样，而实际上 Vue3 也是为了实现这个目的。

有了这两点认识（`ref`和`setup`），我想上面的代码就变得简单了起来。回到刚刚的 Todo List，我们用这个 API 来实现试一下。

## 用组合 API 来实现 Todo List

代码如下

```vue
<template>
<div>
  <ul>
    <li v-for="(item, index) in state.items" :key="item.name" @click="removeItem(index)">
      No.{{index}} - {{item.name}} - {{item.age}}
    </li>
  </ul>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = reactive({
      items: [
        {
          name: 'GuanYu',
          age: '56'
        },
        {
          name: 'ZhangFei',
          age: '54'
        },
        {
          name: 'MaChao',
          age: '77'
        }
      ]
    });
    function removeItem(i) {
      state.items = state.items.filter((currentValue, index) => index != i);
    };
    return {
      state,
      removeItem
    };
  }
}
</script>
```

这里引进了 `reactive` ，和 `ref` 一样，具体了解参考[这篇文章](https://juejin.im/post/6844903969894973448)，简单来说，就是复杂类型版本的`ref`。只要你看懂了前文，这部分的代码对你来说不成问题。

这里我们首先实现了 `remove` 方法。

现在实现 `add` 方法

```vue
<template>
<div>
  <form>
    <input type="text" v-model="newState.item.name">
    <input type="text" v-model="newState.item.age">
    <input type="submit" @click="addItem">
  </form>
  <ul>
    <li v-for="(item, index) in state.items" :key="item.name" @click="removeItem(index)">
      No.{{index}} - {{item.name}} - {{item.age}}
    </li>
  </ul>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let state = reactive({
      items: [
        {
          name: 'GuanYu',
          age: '56'
        },
        {
          name: 'ZhangFei',
          age: '54'
        },
        {
          name: 'MaChao',
          age: '77'
        }
      ]
    });
    function removeItem(i) {
      state.items = state.items.filter((currentValue, index) => index != i);
    };
    let newState = reactive({
      item: {
        name: '',
        age: ''
      }
    });
    function addItem(e) {
      e.preventDefault();
      state.items.push(Object.assign({}, newState.item));
      newState.item.name = '';
      newState.item.age = '';
    }
    return {
      state,
      removeItem,
      newState,
      addItem
    };
  }
}
</script>
```

和最开始我们写的 Todo List 在方法上基本一致。而这些都不是重点，重点是通过这种组合 API 的方式，允许我们对数据和方法进行组合的包装，就像这样。

```vue
<template>
<div>
  <form>
    <input type="text" v-model="newState.item.name">
    <input type="text" v-model="newState.item.age">
    <input type="submit" @click="addItem">
  </form>
  <ul>
    <li v-for="(item, index) in state.items" :key="item.name" @click="removeItem(index)">
      No.{{index}} - {{item.name}} - {{item.age}}
    </li>
  </ul>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let {state, removeItem} = originalData();
    let {newState, addItem} = newData(state);
    return {
      state,
      removeItem,
      newState,
      addItem
    };
  }
}
function originalData() {
  let state = reactive({
    items: [
      {
        name: 'GuanYu',
        age: '56'
      },
      {
        name: 'ZhangFei',
        age: '54'
      },
      {
        name: 'MaChao',
        age: '77'
      }
    ]
  });
  function removeItem(i) {
    state.items = state.items.filter((currentValue, index) => index != i);
  };
  return {
    state,
    removeItem
  };
}

function newData(state) {
  let newState = reactive({
    item: {
      name: '',
      age: ''
    }
  });
  function addItem(e) {
    e.preventDefault();
    state.items.push(Object.assign({}, newState.item));
    newState.item.name = '';
    newState.item.age = '';
  };
  return {
    newState,
    addItem
  };
}
</script>
```

原始数据和方法直接被定义到 `export default` 外面了。值得注意的是，由于存在数据传值，记得要为方法添加参数，这里添加的参数是 `state`，否则会找不到另一个方法的数据的。

再进一步，你可以将相关的数据和方法全都放在文件里，用`export`和`import`来进行交流。这里就不做演示了。

 