import { createStore } from 'redux';

function reducer(state = {
  count: 1
}, action) {
  return state
}

const store = createStore(reducer);

export { store };

