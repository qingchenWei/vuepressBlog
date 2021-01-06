---
title: Vue3系列讲解-6
date: 2020-10-07
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 -  Vue
---

:::tip Abstract

1. Vue3相关新增和底层
2. 递归监听
:::

<!-- more -->

## 递归监听

默认情况下，Vue3 中的 `ref` 和 `reactive` 都是递归监听的，即能实时监听对象的底层变化。

例如，在 `ref` 中

```vue
<template>
<div>
  <p>msg.a.b.c = {{msg.a.b.c}}</p>
  <p>msg.e.f = {{msg.e.f}}</p>
  <p>msg.g = {{msg.g}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = ref({
      a: {
        b: {
          c: 'c'
        }
      },
      e: {
        f: 'f'
      },
      g: 'g'
    });
    function c() {
      console.log(msg);
      msg.value.a.b.c = 'C';
      msg.value.e.f = 'F';
      msg.value.g = 'G';
    };
    return {
      msg,
      c
    };
  }
}
</script>
```

![0JY0MT.png](https://s1.ax1x.com/2020/10/04/0JY0MT.png)

点击 `button` 

![0JYUGq.png](https://s1.ax1x.com/2020/10/04/0JYUGq.png)

在 `reactive` 中也是类似的。总之，就是只要我们对 `ref` 和 `reactive` 中的内容进行更改，在默认情况下，只要更改的对象不是我们在 [Vue3-4](https://dxmo.gitee.io/views/ vue/2020/Vue/Vue3-4.html#%E5%9C%A8-reactive-%E4%BD%BF%E7%94%A8-date-%E5%8F%82%E6%95%B0) 中提到的类似 `Date` 的类型，都是能察觉到并且进行双向数据绑定的。

在默认情况下，递归监听肯定是好的，它让数据的变化能被实时监测到。然而它也带来了性能消耗的问题。

Vue3 提供了 `shallow` 方案，以防止进行递归式的监听。

## shallow

### shallowRef

上一章我们提到过 `ref` 的源码，这里我们回顾一下。

```javascript
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue
  }
  let value = shallow ? rawValue : convert(rawValue)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newVal) {
      if (hasChanged(toRaw(newVal), rawValue)) {
        rawValue = newVal
        value = shallow ? newVal : convert(newVal)
        trigger(
          r,
          TriggerOpTypes.SET,
          'value',
          __DEV__ ? { newValue: newVal } : void 0
        )
      }
    }
  }
  return r
}
```

可以看到，这里有一句提到了 `shallow` 。

```javascript
let value = shallow ? rawValue : convert(rawValue)
```

其实这句话翻译一下，就是没有 `shallow`，对原始的值进行整个的 `reactive` 化，如果有 `shallow`，那么只对最外层的数据执行监听。

`shallow` 式的创建 `ref` 需要使用一个新的 api，`shallowRef`。

尝试用 `shallowRef` 对我们一开始的示例进行改造。

```vue
<template>
<div>
  <p>msg.a.b.c = {{msg.a.b.c}}</p>
  <p>msg.e.f = {{msg.e.f}}</p>
  <p>msg.g = {{msg.g}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { ref, shallowRef } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = shallowRef({
      a: {
        b: {
          c: 'c'
        }
      },
      e: {
        f: 'f'
      },
      g: 'g'
    });
    function c() {
      console.log(msg);
      msg.value.a.b.c = 'C';
      msg.value.e.f = 'F';
      msg.value.g = 'G';
    };
    return {
      msg,
      c
    };
  }
}
</script>
```

此时我们再点击 `button` ，会发现控制台提示了数据的改变，但并没有实现对界面的数据绑定。

![0JYaR0.png](https://s1.ax1x.com/2020/10/04/0JYaR0.png)

我们主要到，此时的 `RefImpl` 对象（控制台里显示的那个对象）上 `_shallow` 值变为 `true` 。此时，由于只有最外层的数据改变能被监测到，所以只有在直接改变 `msg.value` 的时候才会产生监测，

例如

```vue
<template>
<div>
  <p>msg.a.b.c = {{msg.a.b.c}}</p>
  <p>msg.e.f = {{msg.e.f}}</p>
  <p>msg.g = {{msg.g}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { ref, shallowRef } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = shallowRef({
      a: {
        b: {
          c: 'c'
        }
      },
      e: {
        f: 'f'
      },
      g: 'g'
    });
    function c() {
      console.log(msg);
      // msg.value.a.b.c = 'C';
      // msg.value.e.f = 'F';
      // msg.value.g = 'G';
      msg.value = {
        a: {
          b: {
            c: 'C'
          }
        },
        e: {
          f: 'F'
        },
        g: 'G'
      }
      console.log(msg);
    };
    return {
      msg,
      c
    };
  }
}
</script>
```

![0JYdzV.png](https://s1.ax1x.com/2020/10/04/0JYdzV.png)

### triggerRef

除此之外，对于 `shallow` 过的 `ref` 对象，我们还可以手动去触发 `ref` 的变化监听事件来实现界面的改变。

使用的 api 是 `triggerRef`

```vue
<template>
<div>
  <p>msg.a.b.c = {{msg.a.b.c}}</p>
  <p>msg.e.f = {{msg.e.f}}</p>
  <p>msg.g = {{msg.g}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { ref, shallowRef, triggerRef } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = shallowRef({
      a: {
        b: {
          c: 'c'
        }
      },
      e: {
        f: 'f'
      },
      g: 'g'
    });
    function c() {
      console.log(msg);
      msg.value.a.b.c = 'C';
      msg.value.e.f = 'F';
      msg.value.g = 'G';
      triggerRef(msg);
      console.log(msg);
    };
    return {
      msg,
      c
    };
  }
}
</script>
```

### shallowReactive

同样的，我们还有 `shallowReactive` 来实现类似 `shallowRef` 的功能。

```vue
<template>
<div>
  <p>msg.a.b.c = {{msg.a.b.c}}</p>
  <p>msg.e.f = {{msg.e.f}}</p>
  <p>msg.g = {{msg.g}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { shallowReactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = shallowReactive({
      a: {
        b: {
          c: 'c'
        }
      },
      e: {
        f: 'f'
      },
      g: 'g'
    });
    function c() {
      console.log(msg);
      msg.a.b.c = 'C';
      msg.e.f = 'F';
      msg.g = 'G';
      console.log(msg);
    };
    return {
      msg,
      c
    };
  }
}
</script>
```

但如果你有进行实践的话会发现，这段代码仍然会允许你在点击 `button` 的时候对界面 UI 进行改变。

![0JYBsU.png](https://s1.ax1x.com/2020/10/04/0JYBsU.png)

原因很简单，就是我在上文提到的，`shallow` 会监测最外层的变化而请求更新视图层，之前在  `shallowRef` 中的最外层是 `value` ，所以我们只能改变整个 `value` 值来提醒变化，而这里 `shallowReactive` 的最外层变成了 `a`、 `e`、`g`，而上面的代码改变了 `msg.g`，所以引起了变化，如果我们将函数 c 的代码改成

```javascript
msg.a.b.c = 'C';
msg.e.f = 'F';
// msg.g = 'G';
```

这将不会引起 视图层 的变化。

![0JYsZ4.png](https://s1.ax1x.com/2020/10/04/0JYsZ4.png)

### triggerReactive

在 `shallowReactive` 中，并没有提供 `trigger` 方案来主动唤醒监测变化。

### 总结

本质上，`shallowRef` 是特殊的 `shallowReactive`，而 `ref` 是特殊的 `reactive`。明白了这一点，理解两者的异同就会简单许多。

 