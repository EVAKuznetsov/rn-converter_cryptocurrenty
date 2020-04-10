import _ from 'lodash'
import {
  GET_CURRENCIES_DATA_SUCCESS,
  GET_CURRENCIES_DATA_REQUEST,
  SORT_CURRENCIES_DATA,
  SET_ACTIVE_COIN,
} from '../actionTypes'

const initialState = {
  currenciesData: [],
  isLoading: false,
  sortField: '',
  sortType: 'asc',
  activeCoin: '',
}
const handlers = {
  [GET_CURRENCIES_DATA_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [GET_CURRENCIES_DATA_SUCCESS]: (state, { currenciesData }) => ({
    ...state,
    currenciesData: currenciesData,
    isLoading: false,
  }),
  [SORT_CURRENCIES_DATA]: (state, { sortField }) => {
    const sortType = state.sortType === 'asc' ? 'desc' : 'asc'
    const sortCurrenciesData = _.orderBy(
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

export default (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
