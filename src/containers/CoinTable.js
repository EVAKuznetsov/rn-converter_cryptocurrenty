import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CoinTable, Loader } from '../components'
import {
  fetchCurrenciesData,
  onSort,
  setActiveCoin,
} from '../store/actions/actionsTable'

const CoinTableContainer = () => {
  const dispatch = useDispatch()
  const { currenciesData, isLoading, sortField, sortType } = useSelector(
    (state) => state.table
  )

  useEffect(() => {
    dispatch(fetchCurrenciesData())
  }, [dispatch])

  const onSortHandler = (field) => {
    dispatch(onSort(field))
  }
  const onSetActiveCoin = (name) => {
    dispatch(setActiveCoin(name))
  }
  if (isLoading) return <Loader />
  return (
    <CoinTable
      currenciesData={currenciesData}
      onSort={onSortHandler}
      orderBy={sortField}
      order={sortType}
      onSetActiveCoin={onSetActiveCoin}
    />
  )
}

export default CoinTableContainer
