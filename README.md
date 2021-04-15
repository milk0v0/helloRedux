## Redux

+ Redux 是 JavaScript 状态容器，提供可预测化的状态管理。
+ 可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。
+ Redux 不是 Facebook 官方出品嗷~ 它并不依赖于 React，除了和 React 一起用外，还支持其它界面库。
+ 它体小精悍（只有2kB，包括依赖）



### 为啥要用 Redux

+ Redux 是一个状态管理库
+ React 的组件是一种状态机，它的视图随着状态的改变而发生变化，故状态管理就尤为重要
+ 特别是设计到状态有可能会进行跨组件传递使用，有了 Redux 可以让我们更方便的管理这些状态，而且这些状态都是可预测的，后期我们做单元测试什么的也非常方便
+ 好像说的挺绕的，参考一下 [VueX](https://juejin.cn/post/6909466305590460424#heading-0)，反正大白话就是，我要一个统一管理数据的东西，所以我要用它
+ 重点：**集中式存储管理** 应用的所有组件的 **状态**，并以相应的规则保证状态以一种 **可预测** 的方式发生变化



### 安装

```sh
npm i redux

yarn add redux
```



### Redux API

#### <span id="store">store</span>

+ React 组件内我们使用 `useState` 管理单一状态，联想一下，Redux 是不是也要一个东西去管理状态，它就是 store
+ store - 商店/仓库/容器（管理状态）
  + 用于管理 Redux 应用的状态
  + **Redux 应用只有一个单一的 store**
  + **在 `default` 情况下返回旧的 `state`。**遇到未知的 action 时，一定要返回旧的 `state`



#### createStore

+ 需要使用 store 就得先把他创建出来，这个时候需要 `createStore`
+ createStore(reducer, [preloadedState], enhancer)
  + [reducer](#reducer)(Function)：指定了应用状态的变化如何响应 actions 并发送到 store 的纯函数

```javascript
import { createStore } from 'redux';

const store = createStore(reducer);
```



#### <span id="reducer">reducer</span>

+ reducer 是一个纯函数
  1. 相同的输入永远返回相同的输出
  2. 不修改函数的输入值
  3. 不依赖外部环境状态
  4. 无任何副作用
  5. 便于测试
  6. 有利重构
+ 它提供了提供操作状态的各种方式
+ 直白的说，他做的事情就是告诉仓库，该如何读写数据，以及提供操作数据的方法
+ 参数(state, action)
  + <span id="state">**state**</span> - 用于储存状态，它表示了 Redux 应用的全部状态，通常为一个多层嵌套的对象
  + <span id="#action">**action**</span> - 把数据从应用传到 store 的有效载荷。它是 store 数据的 **唯一** 来源。
    + 告诉 store，要对 state 做怎样的操作
    + 它的本质是一个对象
    + 一般来说会通过 [dispatch](#dispatch) 将 action 传到 store
+ **永远不要**在 reducer 里做这些操作：
  + 修改传入参数
  + 执行有副作用的操作，如 API 请求和路由跳转
  + 调用非纯函数，如 `Date.now()` 或 `Math.random()`

```javascript
function reducer(state = {
  data: []
}, action) {
  console.log(action);
  return state
}
```



#### store 方法

+ `getState()` - 获取 state

+ <span id="dispatch">`dispatch(action)`</span> - 分发 action，这是触发 state 变化的惟一途径

  + action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作
  + 一般情况下，我们会定义 type 为一个常量，故使用大写，这并非是强制性的，只是一个约定
  + 调用 dispatch 时，store 会调用 reducer 函数 - 接收旧的 `state` 和 dispatch 传入的 `action`，传递 reducer，在 reducer 中，监听 action.type 的不同，返回新的 state
  + **actions 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 state**

```javascript
import { createStore } from 'redux';

function reducer(state = {
  count: 1
}, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1
      }
    case 'MINUS':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

const store = createStore(reducer);
store.dispatch({
  type: "ADD"
});
console.log(store.getState()); // 2

store.dispatch({
  type: "MINUS"
});
console.log(store.getState()); // 1
```

  + 从结果我们可以看出来，`dispatch` 是 **同步方法**

+ `subscribe` - 监听 state 发生改变

  + 接收一个函数，当状态改变时，则调用该函数
  + 返回一个函数，该函数用于取消监听

```javascript
const unSubscribe = store.subscribe(() => {
  console.log('state改变了');
});
unSubscribe(); // 取消监听
```

+ `replaceReducer(nextReducer)` - 替换 store 当前用来计算 state 的 reducer
  + 这是一个高级 API。只有在你需要实现代码分隔，而且需要立即加载一些 reducer 的时候才可能会用到它
  + 在实现 Redux 热加载机制的时候也可能会用到



## Redux 三大原则

### 单一数据源

+ **整个应用的 [state](#state) 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 [store](#store) 中**
  + 这让同构应用开发变得非常容易
  + 来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中
  + 由于是单一的 state tree ，调试也变得非常容易
  + 在开发中，你可以把应用的 state 保存在本地，从而加快开发速度
  + 此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举

### State 是只读的

+ **唯一改变 state 的方法就是触发 [action](#action)，action 是一个用于描述已发生事件的普通对象**
  + 这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图
  + 因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现
  + Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来

### 使用纯函数来执行修改

+ **为了描述 action 如何改变 state tree ，你需要编写 [reducers](#reducer)**
  + Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state
  + 刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器



## 结合 React 和 Redux

+ 上面我们说了 Redux，非常的纯粹、简易
+ 结合一下，我们能不能就已有的东西在 React 上使用 Redux
+ 其实很简单，只需要在 store.state 发生改变时，重新 render 就可以了

```javascript
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

function reducer(state = {
  count: 1
}, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1
      }
    case 'MINUS':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}
const store = createStore(reducer);

function render() {
  ReactDOM.render(
    <div>
      <p>{store.getState().count}</p>
      <button onClick={() => store.dispatch({ type: "ADD" })}>+1</button>
      <button onClick={() => store.dispatch({ type: "MINUS" })}>-1</button>
    </div>,
    document.querySelector('#root')
  )
}
const unSubscribe = store.subscribe(() => { // 监听到 store.state 发生变化，重新 render
  console.log(1);
  render()
});
render();
```



## React-Redux

+ 看下上面的示例，直接在 React 中使用 Redux，会不会觉得特别奇怪，每次都要使用 React.render 重新渲染，实在是太不方便了
+ 本来 Redux 就是一个很单一的状态管理库，本身也不是说只为了 React 而设计的
+ 我们可以使用 React-Redux，它是 react 项目中的 redux 绑定库，让我们在 react 中使用 redux 不再如此繁琐



### 安装

```sh
npm i react-redux
```

