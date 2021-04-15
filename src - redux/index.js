
/**
 * store - 商店/仓库/容器（管理状态）
 * store = createStore(reducer)
 *  reducer 纯函数：
 *    提供操作状态的各种方式
 *    告诉仓库，该如何读写数据，以及提供操作数据的方法
 * 	getState 获取 state
 *  dispatch 修改 state
 *    调用 dispatch 时，store 会调用 reducer 函数，并将 state 和 dispatch 传入的 action，传递 store，在 store 中，监听 action.type 的不同，来返回新的 state
 *    action 要对 state 做怎样的修改
 *      action 本质是一个对象
 *      action 对象有一个必写参数 type，type 描述了 该 action 要做怎样的操作 - 习惯性 type 为大写，这只是一个约定，并非强制
 *  subscribe - 监听 state 发生改变
 *    接收一个函数，当状态改变时，则调用该函数
 *    返回一个函数，该函数用于取消监听
 */
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
const unSubscribe = store.subscribe(() => {
  console.log(1);
  render()
});
render();

// unSubscribe();

store.dispatch({
  type: "ADD"
});
console.log(store.getState());

store.dispatch({
  type: "MINUS"
});
console.log(store.getState());
console.log(store);
