import { action } from 'easy-peasy'
import { dayPicker, findDay, findNames } from './logic.js'
// import { v4 as uuidv4 } from 'uuid'

const globalState = {
  // LOGIC STATE
  status: 'loading',
  error: '',
  weekData: null,
  weekNb: 1,
  displayedWeekNb: 1,
  dayTag: '',
  day: '',
  dayIndex: '',
  fullDate: '',
  employees: [],
  activeEmployeeIdx: null,
  // LAYOUT STATE
  active: false,
  // ACTIONS
  init: action((state, payload) => {
    const today = new Date()
    state.weekNb = today.getWeek()
    state.displayedWeekNb = state.weekNb
    state.dayTag = dayPicker()
    state.weekData = payload
    state.day = findDay(state.dayTag, state.weekData)
    state.dayIndex = state.day.index
    state.fullDate = state.day.fullDate
    state.employees = findNames(state.dayIndex, state.weekData)
  }),
  updateStatus: action((state, payload) => {
    state.status = payload
  }),
  updateWeek: action((state, payload) => {
    const { newWeekNb, data } = payload
    state.displayedWeekNb = newWeekNb
    state.day = findDay(state.dayTag, data)
    state.dayIndex = state.day.index
    state.fullDate = state.day.fullDate
    state.employees = findNames(state.dayIndex, data)
  }),
  updateActiveDay: action((state, payload) => {
    state.dayTag = payload
    state.day = findDay(state.dayTag, state.weekData)
    state.dayIndex = state.day.index
    state.fullDate = state.day.fullDate
    state.employees = findNames(state.dayIndex, state.weekData)
  }),
  toggleActive: action((state, payload) => {
    state.active = payload
  }),
  selectEmployeeIdx: action((state, payload) => {
    state.activeEmployeeIdx = payload
  }),
  setError: action((state, payload) => {
    state.error = payload
  })
}

export default globalState