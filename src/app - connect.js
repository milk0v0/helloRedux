import { connect } from "react-redux";

/**
 * 如何在组件中获取 redux 的store
 *  1. connect 高阶组件（传入函数，返回一个新的函数）,将 组件需要的 state 和 dispatch 传给组件
 *    - connect(callback)(Cmp)
 *    - callback 必须有一个对象类型的返回值，该返回值决定了那些参数需要传递给组件
 *    - connect 被调用后 会返回一个高阶组件
 *    - connect 只是一个高阶函数，connect 的返回值才是一个高阶组件
 *  2. react-redux 提供的 Hooks （7）
 *    - useDispatch 获取 dispatch
 *    - useStore 获取 store
 *    - useSelector 获取 state 
 */

function App(props) {
  const { count, dispatch } = props;
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

const newApp = connect(state => {
  console.log(state);
  return {
    count: state.count
  }
})(App);

console.log(newApp);

export default newApp

// 合在一起
// export default connect(state => ({ count: state.count }))(App)