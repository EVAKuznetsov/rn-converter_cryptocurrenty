import _ from 'lodash'
import {
  GET_CURRENCIES_DATA_SUCCESS,
  GET_CURRENCIES_DATA_REQUEST,
  SORT_CURRENCIES_DATA,
  SET_ACTIVE_COIN,
  CLEAR_DIFFERENT_DATA,
} from '../actionTypes'

const initialState = {
  currenciesData: [],
  isLoading: false,
  sortField: 'name',
  sortType: 'asc',
  activeCoin: '',
  differentData: {},
}
const handlers = {
  [GET_CURRENCIES_DATA_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [GET_CURRENCIES_DATA_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      currenciesData: sortData(
        payload.currenciesData,
        state.sortField,
        state.sortType
      ),
      differentData: payload.differentData,
      isLoading: false,
    }
  },
  [CLEAR_DIFFERENT_DATA]: (state) => ({ ...state, differentData: {} }),
  [SORT_CURRENCIES_DATA]: (state, { sortField }) => {
    const sortType = state.sortType === 'asc' ? 'desc' : 'asc'
    const sortCurrenciesData = sortData(
      state.currenciesData,
      sortField,
      sortType
    )
    return {
      ...state,
      currenciesData: sortCurrenciesData,
      sortField: sortField,
      sortType: sortType,
    }
  },
  [SET_ACTIVE_COIN]: (state, { payload }) => ({
    ...state,
    activeCoin: payload,
  }),
  DEFAULT: (state) => state,
}

const sortData = (data, sortField, sortType) =>
  _.orderBy(data, sortField, sortType)

export default (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
