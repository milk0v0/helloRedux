import { createStore } from 'redux';

function reducer(state = {
  count: 1,
  name: 'milk'
}, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}

const store = createStore(reducer);

export { store };

