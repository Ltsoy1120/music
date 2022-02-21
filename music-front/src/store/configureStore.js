import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createBrowserHistory} from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunkMiddleware from 'redux-thunk';
import {loadFrontLocalStorage, saveToLocalStorage} from './localStorage'
import artistsReducer from './reducers/artistsReducer';
import albumsReducer from './reducers/albumsReducer';
import tracksReducer from './reducers/tracksReducer';
import usersReducer from './reducers/usersReducer';
import trackHistory from './reducers/trackHistoryReducer';

export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: usersReducer,
  trackHistory: trackHistory,
  router: connectRouter(history)
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
]

const enhancers = composeEnhancers(applyMiddleware(...middleware))
const persistedState = loadFrontLocalStorage()

const store = createStore(rootReducer, persistedState, enhancers);
store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user
    }
  })
})
export default store