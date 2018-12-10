
import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { 
  DEVICES_REQUEST, loadedDevices, errorDevices, 
  AREAS_REQUEST, loadedAreas, errorAreas,
  COMMAND_REQUEST, sendedCommand, errorCommand 
} from './actions'
import axios from 'axios'

const loadDevices = function *(action) {
  const { payload } = action
  try {
    const response = yield call(() => axios.get(`${payload.url}/devices`, { auth: { username: '', password: payload.password } }))
    yield put(loadedDevices({ server: payload.server, devices: response.data}))
  }
  catch (error) {
    console.error(error)
    yield put(errorDevices({ server: payload.server }))
  }
}

const watchLoadDevices = function *() {
  yield takeEvery(DEVICES_REQUEST, loadDevices)
}

const loadAreas = function *(action) {
  const { payload } = action
  try {
    const response = yield call(() => axios.get(`${payload.url}/areas`, { auth: { username: '', password: payload.password } }))
    yield put(loadedAreas({ server: payload.server, areas: response.data }))
  }
  catch (error) {
    console.error(error)
    yield put(errorAreas({ server: payload.server }))
  }
}

const watchLoadAreas = function *() {
  yield takeEvery(AREAS_REQUEST, loadAreas)
}

const sendCommand = function *(action) {
  const { payload } = action
  try {
    const response = yield call(() => axios.put(`${payload.url}/${payload.scope}/${payload.index}`, { command: payload.command, args: payload.args }, { auth: { username: '', password: payload.password } }))
    yield put(sendedCommand({ server: payload.server, response }))
  }
  catch (error) {
    console.error(error)
    yield put(errorCommand({ server: payload.server }))
  }
}

const watchSendCommand = function *() {
  yield takeEvery(COMMAND_REQUEST, sendCommand)
}

export const sagas = [
  fork(watchLoadDevices),
  fork(watchLoadAreas),
  fork(watchSendCommand)
]