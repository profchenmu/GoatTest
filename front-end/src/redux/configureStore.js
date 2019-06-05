import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const configeStore = (preloadedState) => {
  const middlewares = [thunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  let m = module
  if (process.env.NODE_ENV !== 'production' && m.hot) {
    m.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }
  return store;
}
export default configeStore
