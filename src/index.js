import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import { store } from './store';

/**
 * 使用 Provider 组件，包裹整个应用
 *  在 Provider 中由一个 store 属性
 */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)