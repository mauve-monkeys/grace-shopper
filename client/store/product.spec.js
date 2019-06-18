/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {reducer, gotSingleProduct} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  let initialState = {
    all: [], //list of objects which represent products
    selected: {},
    loadingAll: true,
    loadingSelected: true
  }
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('product', () => {
    it('eventually dispatches the GOT SINGLE PRODUCT action', async () => {
      const fakeProduct = {
        name: 'Sparkling Wishbone Ring'
      }
      await store.dispatch(gotSingleProduct(fakeProduct))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_SINGLE_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })
})
