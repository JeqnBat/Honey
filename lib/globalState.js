import { action } from 'easy-peasy'
import { dayPicker, findDay, findNames } from './logic.js'
import { week } from './constants.js'
// import { v4 as uuidv4 } from 'uuid'

const globalState = {
  // LOGIC STATE
  status: 'loading',
  error: '',
  weekData: null,
  weekNb: 1,
  weekDaysNb: [],
  displayedWeekNb: 1,
  dayTag: '',
  day: '',
  dayIndex: '',
  fullDate: '',
  employees: [],
  activeEmployeeName: null,
  // LAYOUT STATE
  active: false,
  // ACTIONS
  init: action((state, payload) => {
    const today = new Date()
    state.weekNb = today.getWeek()
    state.displayedWeekNb = state.weekNb
    state.dayTag = dayPicker()
    state.weekData = payload
    let ok = week.map((el) => {
      let { fullDate } = findDay(el.tagEN, state.weekData)
      let dayNumber = fullDate.split(' ')[1]

      return dayNumber
    })
    state.weekDaysNb = ok
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
    state.weekData = data
    let ok = week.map((el) => {
      let { fullDate } = findDay(el.tagEN, state.weekData)
      let dayNumber = fullDate.split(' ')[1]

      return dayNumber
    })
    state.weekDaysNb = ok
    state.day = findDay(state.dayTag, state.weekData)
    state.dayIndex = state.day.index
    state.fullDate = state.day.fullDate
    state.employees = findNames(state.dayIndex, state.weekData)
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
  setEmployeeName: action((state, payload) => {
    state.activeEmployeeName = payload
  }),
  setError: action((state, payload) => {
    state.error = payload
  })
}

export default globalState