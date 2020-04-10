import { Api } from '../../api/api'
import {
  GET_CURRENCIES_DATA_REQUEST,
  GET_CURRENCIES_DATA_SUCCESS,
  SORT_CURRENCIES_DATA,
  SET_ACTIVE_COIN,
} from '../actionTypes'
export const fetchCurrenciesData = () => async (dispatch) => {
  dispatch({ type: GET_CURRENCIES_DATA_REQUEST })
  const data = await Api.fetchCurrenciesData()
  const currenciesData =
    data &&
    data.map((coin) => ({
      id: coin.CoinInfo.Id,
      name: coin.CoinInfo.Name,
      fullName: coin.CoinInfo.FullName,
      img: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
      price: coin.RAW.USD.PRICE,
      volume24hour: coin.RAW.USD.VOLUME24HOUR,
    }))
  setTimeout(
    () =>
      dispatch({
        type: GET_CURRENCIES_DATA_SUCCESS,
        currenciesData: currenciesData,
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
