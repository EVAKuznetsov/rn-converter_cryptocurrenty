import { Api } from '../../api/api'
import {
  GET_CURRENCIES_DATA_REQUEST,
  GET_CURRENCIES_DATA_SUCCESS,
  SORT_CURRENCIES_DATA,
  SET_ACTIVE_COIN,
  CLEAR_DIFFERENT_DATA,
} from '../actionTypes'

export const fetchCurrenciesData = () => async (dispatch, getState) => {
  const { currenciesData: oldCurrencyesData } = getState().table

  dispatch({ type: GET_CURRENCIES_DATA_REQUEST })
  const data = await Api.fetchCurrenciesData()
  const newCurrenciesData =
    data &&
    data.map((coin) => ({
      id: coin.CoinInfo.Id,
      name: coin.CoinInfo.Name,
      fullName: coin.CoinInfo.FullName,
      img: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
      price: coin.RAW.USD.PRICE,
      volume24hour: coin.RAW.USD.VOLUME24HOUR,
    }))

  const differentData = {}
  if (oldCurrencyesData.length > 0) {
    newCurrenciesData.map((coin) => {
      const currentRow = oldCurrencyesData.find((row) => row.id === coin.id)
      if (currentRow.price !== coin.price) {
        differentData[coin.name] = currentRow.price > coin.price ? 'up' : 'down'
      }
      return currentRow.price !== coin.price
    })
  }
  setTimeout(
    () =>
      dispatch({
        type: GET_CURRENCIES_DATA_SUCCESS,
        payload: {
          currenciesData: newCurrenciesData,
          differentData: differentData,
        },
      }),
    3000
  )
}
export const onSort = (sortField) => ({
  type: SORT_CURRENCIES_DATA,
  sortField: sortField,
})
export const setActiveCoin = (name) => ({
  type: SET_ACTIVE_COIN,
  payload: name,
})
export const clearDifferentData = () => ({ type: CLEAR_DIFFERENT_DATA })
