import { createStore, applyMiddleware, compose } from 'redux'
import { SERVER_ADD, SERVER_REMOVE, 
  DEVICES_REQUEST, DEVICES_SUCCESS, DEVICES_ERROR,
  AREAS_REQUEST, AREAS_SUCCESS, AREAS_ERROR,
  COMMAND_REQUEST, COMMAND_SUCCESS, COMMAND_ERROR } from './actions'
import { sagas } from './saga'
import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'

const initialState = {
  servers: [
    {
      name: 'WohnzimmerPI',
      address: 'http://127.0.0.1:4444',
      password: '',
      devices_fetching: false,
      devices_error: false,
      devices: [],
      areas_fetching: false,
      areas_error: false,
      areas: [],
      command_sending: false,
      command_error: false
    }
  ]
}

const setServerProps = (state, index, props) => ({
    ...state,
    servers: [
      ...state.servers.slice(0, index),
      {
        ...state.servers[index],
        ...props
      },
      ...state.servers.slice(index + 1)
    ]
})

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case COMMAND_REQUEST:
      return setServerProps(state, action.payload.server, {
        command_sending: true,
        command_error: false        
      })
    case COMMAND_SUCCESS:
      return setServerProps(state, action.payload.server, {
        command_sending: false,
        command_error: false
      })
    case COMMAND_ERROR:
      return setServerProps(state, action.payload.server, {
        command_sending: false,
        command_error: true
      })
    case DEVICES_REQUEST:
      return setServerProps(state, action.payload.server, {
        devices_fetching: true,
        devices_error: false,
        devices: []
      })
    case DEVICES_SUCCESS:
      return setServerProps(state, action.payload.server, {
        devices_fetching: false,
        devices_error: false,
        devices: action.payload.devices
      })
    case DEVICES_ERROR:
      return setServerProps(state, action.payload.server, {
        devices_fetching: false,
        devices_error: true,
        devices: []
      })
    case AREAS_REQUEST:
      return setServerProps(state, action.payload.server, {
        areas_fetching: true,
        areas_error: false,
        areas: []
      })
    case AREAS_SUCCESS:
      return setServerProps(state, action.payload.server, {
        areas_fetching: false,
        areas_error: false,
        areas: action.payload.areas
      })
    case AREAS_ERROR:
      return setServerProps(state, action.payload.server, {
        areas_fetching: false,
        areas_error: true,
        areas: []
      })
    case SERVER_ADD:
      return {
        ...state,
        servers: [
          ...state.servers,
          {
            ...action.payload,
            devices_fetching: false,
            devices_error: false,
            devices: [],
            areas_fetching: false,
            areas_error: false,
            areas: [],
            command_sending: false,
            command_error: false
          }
        ]
      }
    case SERVER_REMOVE:
      return {
        ...state,
        servers: [
          ...state.servers.slice(0, action.payload),
          ...state.servers.slice(action.payload + 1)
        ]
      }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    ),
    persistState()
  )
)

function *rootSaga () {
  yield all([
    ...sagas
  ])
}

sagaMiddleware.run(rootSaga)

export default store