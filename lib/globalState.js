import { action, thunk } from 'easy-peasy'
import { parser, dayPicker, findDay, findNames } from './logic.js'
// import { v4 as uuidv4 } from 'uuid'

const globalState = {
  // STATE
  app : {
    error: '',
    weekNb: 1,
    currentWeek: 1,
    dayTag: '',
    day: '',
    dayIndex: '',
    fullDate: '',
    employees: [],
  },
  // ACTIONS
  init: action((state, payload) => {
    const today = new Date()
    state.app.weekNb = today.getWeek()
    state.app.currentWeek = state.app.weekNb
    state.app.dayTag = dayPicker()
    // const data = JSON.parse(payload)
    // state.app.day = findDay(state.app.dayTag, data[`S${state.app.currentWeek}`])
    // state.app.dayIndex = state.app.day.index
    // state.app.fullDate = state.app.day.fullDate
    // state.app.employees = findNames(state.app.dayIndex, data[`S${state.app.currentWeek}`])
  }),
  daySwitch: action((state, payload) => {
    state.app.dayTag = payload
    state.app.day = findDay(state.app.dayTag, payload[`S${state.app.currentWeek}`])
    state.app.dayIndex = state.app.day.index
    state.app.fullDate = state.app.day.fullDate
    state.app.employees = findNames(state.app.dayIndex, payload[`S${state.app.currentWeek}`])
  }),
  update: action((state, payload) => {
    state.app = payload
  }),
  setError: action((state, payload) => {
    state.error = payload
  }),
  // THUNKS
  hydrate: thunk(async (actions, { getStoreState }) => {
    const weekSelector = getStoreState.app.currentWeek
    try {
      const response = await fetch(`/api/hydrate?weekSelector=${weekSelector}`)
      const rawText = await response.text()
      const data = JSON.parse(rawText)

      console.log(data)
      actions.init()
    } catch (error) {
      console.error(error)
    }
  })
}

export default globalState