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
  sortField: '',
  sortType: 'asc',
  activeCoin: '',
  differentData: {},
}
const handlers = {
  [GET_CURRENCIES_DATA_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [GET_CURRENCIES_DATA_SUCCESS]: (state, { currenciesData }) => {
    const differentData = {}

    if (state.currenciesData.length > 0) {
      currenciesData.map((coin) => {
        const currentRow = state.currenciesData.find(
          (row) => row.id === coin.id
        )
        if (currentRow.price !== coin.price) {
          differentData[coin.name] =
            currentRow.price > coin.price ? 'up' : 'down'
        }
        return currentRow.price !== coin.price
      })
    }

    return {
      ...state,
      currenciesData: currenciesData,
      differentData: differentData,
      isLoading: false,
    }
  },
  [CLEAR_DIFFERENT_DATA]: (state) => ({ ...state, differentData: {} }),
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
