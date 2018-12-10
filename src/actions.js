import { createAction } from 'redux-actions'

export const SERVER_ADD = 'SERVER_ADD'
export const SERVER_REMOVE = 'SERVER_REMOVE'

export const DEVICES_REQUEST = 'DEVICES_REQUEST'
export const DEVICES_SUCCESS = 'DEVICES_SUCCESS'
export const DEVICES_ERROR = 'DEVICES_ERROR'

export const AREAS_REQUEST = 'AREAS_REQUEST'
export const AREAS_SUCCESS = 'AREAS_SUCCESS'
export const AREAS_ERROR = 'AREAS_ERROR'

export const COMMAND_REQUEST = 'COMMAND_REQUEST'
export const COMMAND_SUCCESS = 'COMMAND_SUCCESS'
export const COMMAND_ERROR = 'COMMAND_ERROR'

export const addServer = createAction(SERVER_ADD)
export const removeServer = createAction(SERVER_REMOVE)

export const loadDevices = createAction(DEVICES_REQUEST)
export const loadedDevices = createAction(DEVICES_SUCCESS)
export const errorDevices = createAction(DEVICES_ERROR)

export const loadAreas = createAction(AREAS_REQUEST)
export const loadedAreas = createAction(AREAS_SUCCESS)
export const errorAreas = createAction(AREAS_ERROR)

export const sendCommand = createAction(COMMAND_REQUEST)
export const sendedCommand = createAction(COMMAND_SUCCESS)
export const errorCommand = createAction(COMMAND_ERROR)