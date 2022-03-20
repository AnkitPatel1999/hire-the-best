import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./components/redux/store"
import { Provider } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { isAuthenticated } from './components/redux/actions/userAction';



onAuthStateChanged(auth, (user) => {
  store.dispatch(isAuthenticated(user))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

