import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './store/reducers/auth'

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
))

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('app'));
serviceWorker.unregister();

// import React from 'react'
// import ReactDOM from 'react-dom'
// import Chat from './Chat'
// import WebsocketInstance from './websocket'

// class App extends React.Component{

//     componentDidMount() {
//         WebsocketInstance.connect()
//     }

//     render(){
//         return (
//             <Chat />
//         )
//     }
// }

// ReactDOM.render(<App />, document.getElementById('app'));