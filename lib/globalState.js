import { action, thunk } from 'easy-peasy'
import { parser, dayPicker, findDay, findNames } from './logic.js'
// import { v4 as uuidv4 } from 'uuid'
// import { app, products } from './constants'

const globalState = {
  // STATE
  app : {
    status: 'loading',
    error: '',
    weekNb: 1,
    currentWeek: 1,
    dayTag: '',
    day: '',
    dayIndex: '',
    fullDate: '',
    employees: [],
    data: []
  },
  // ACTIONS
  init: action((state, payload) => {
    const today = new Date()
    state.app.weekNb = today.getWeek()
    state.app.currentWeek = state.app.weekNb
    state.app.dayTag = dayPicker()
    state.app.day = findDay(state.app.dayTag, payload[`S${state.app.currentWeek}`])
    state.app.dayIndex = state.app.day.index
    state.app.fullDate = state.app.day.fullDate
    state.app.employees = findNames(state.app.dayIndex, payload[`S${state.app.currentWeek}`])
    state.app.status = 'home'
  }),
  update: action((state, payload) => {
    state.app = payload
  }),
  setError: action((state, payload) => {
    state.error = payload
  }),
  // THUNKS
  hydrate: thunk(async actions => {
    try {
      const data = await parser()
      actions.init(data)
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
  app: [],
  products: [],
  tailoredForm: {},
  // ACTIONS
  pickLayout: action((state, payload) => {
    state.responsive = payload
  }),
  loadapp: action((state, payload) => {
    state.app = payload
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
  fetchapp: thunk(async actions => {
    // try {
    //   const req = await fetch('/app.json')
    //   const res = await req.json()
    //   actions.loadapp(res)
    // } catch(e) {
    //   actions.setError(e.message)
    // }
    // simpler quicker lighter with constants.js
    actions.loadapp(app)
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