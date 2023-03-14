import { action, thunk } from 'easy-peasy'
import { parser, dayPicker, findDay, findNames } from './logic.js'
// import { v4 as uuidv4 } from 'uuid'
// import { appData, products } from './constants'

const globalState = {
  // STATE
  test: 'kikoo',

  loaded: 'toto',
  error: '',
  weekNb: 1,
  currentWeek: 1,
  dayTag: '',
  day: '',
  dayIndex: '',
  fullDate: '',
  employees: [],
  // ACTIONS
  loading: action((state, payload) => {
    state.loaded = payload
  }),
  init: action((state, payload) => {
    const today = new Date()
    state.weekNb = today.getWeek()
    console.log(state.weekNb);
    state.currentWeek = state.weekNb
    state.dayTag = dayPicker()
    state.day = findDay(payload.dayTag, payload.data[`S${payload.currentWeek}`])
    state.dayIndex = payload.day.index
    state.fullDate = payload.day.fullDate
    state.employees = findNames(payload.dayIndex, payload.data[`S${payload.currentWeek}`])
  }),
  setError: action((state, payload) => {
    state.error = payload
  }),
  // THUNKS
  hydrate: thunk(async actions => {
    try {
      const data = await parser()
      actions.init(data)
      actions.loading(true)
    } catch(e) {
      actions.setError(e.message)
    }
  })
/*  // STATE
  error: null,
  responsive: null,
  loaded: {
    homePage: false,
    products: false,
  },
  appData: [],
  products: [],
  tailoredForm: {},
  // ACTIONS
  pickLayout: action((state, payload) => {
    state.responsive = payload
  }),
  loadAppData: action((state, payload) => {
    state.appData = payload
    state.loaded.homePage = true
  }),
  loadProductsData: action((state, payload) => {
    state.products = payload
    state.loaded.products = true
  }),
  setError: action((state, payload) => {
    state.error = payload
  }),
  setPageName: action((state, payload) => {
    state.pageName = payload
  }),
  highlightProducts: action((state, payload) => {
    state.products.faireParts = payload
  }),
  setItemView: action((state, payload) => {
    state.itemView = payload
  }),
  setTailoredForm: action((state, payload) => {
    state.tailoredForm = payload
  }),
  // THUNK
  fetchAppData: thunk(async actions => {
    // try {
    //   const req = await fetch('/appData.json')
    //   const res = await req.json()
    //   actions.loadAppData(res)
    // } catch(e) {
    //   actions.setError(e.message)
    // }
    // simpler quicker lighter with constants.js
    actions.loadAppData(appData)
  }),
  fetchProductsData: thunk(async actions => {
    // try {
    //   const req = await fetch('/products.json')
    //   const res = await req.json()
    //   actions.loadFairePartData(res)
    // } catch(e) {
    //   actions.setError(e.message)
    // }
    // simpler quicker lighter with constants.js
    actions.loadProductsData(products)
  })
*/}

export default globalState