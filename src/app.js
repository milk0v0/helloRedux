
/**
 * 如何在组件中获取 redux 的store
 *  1. connect 高阶组件（传入函数，返回一个新的函数）,将 组件需要的 state 和 dispatch 传给组件
 *    - connect(callback)(Cmp)
 *    - callback 必须有一个对象类型的返回值，该返回值决定了那些参数需要传递给组件
 *    - connect 被调用后 会返回一个高阶组件
 *    - connect 只是一个高阶函数，connect 的返回值才是一个高阶组件
 *  2. react-redux 提供的 Hooks （7）
 *    - useSelector 获取 state
 *      可返回任意类型
 *    - useDispatch 获取 dispatch
 *    - useStore 获取 store
 */

import { useDispatch, useSelector, useStore } from "react-redux";

export default function App(props) {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  const store = useStore();
  console.log(store);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => {
        dispatch({
          type: 'ADD'
        })
      }}>+1</button>
    </div>
  )
}