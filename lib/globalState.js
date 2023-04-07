import { action } from 'easy-peasy'
import { dayPicker, findDay, findNames } from './logic.js'
import { week } from './constants.js'

const globalState = {
  // PAGE STATE
  status: 'loading',
  error: '',
  succes: '',
  overlayActive: false,
  overlaySource: null,
  // APP STATE
  numberOfWeeks: null,
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
  // ACTIONS
  setState: action((state, payload) => {
    Object.assign(state, payload)
  }),
  init: action((state, payload) => {
    const today = new Date()
    state.weekNb = today.getWeek()
    state.displayedWeekNb = state.weekNb
    state.dayTag = dayPicker()
    state.weekData = payload
    let fridayThe = week.map((el) => {
      let { fullDate } = findDay(el.tagEN, state.weekData)
      let dayNumber = fullDate.split(' ')[1]
      return dayNumber
    })
    state.weekDaysNb = fridayThe
    state.day = findDay(state.dayTag, state.weekData)
    state.dayIndex = state.day.index
    state.fullDate = state.day.fullDate
    state.employees = findNames(state.dayIndex, state.weekData)
  }),
  updateWeek: action((state, payload) => {
    const { newWeekNb, data } = payload
    state.displayedWeekNb = newWeekNb
    state.weekData = data
    let fridayThe = week.map((el) => {
      let { fullDate } = findDay(el.tagEN, state.weekData)
      let dayNumber = fullDate.split(' ')[1]
      return dayNumber
    })
    state.weekDaysNb = fridayThe
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
  })
}

export default globalState