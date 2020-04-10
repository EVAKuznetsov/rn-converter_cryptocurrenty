import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CoinTable, Loader } from '../components'
import {
  fetchCurrenciesData,
  onSort,
  setActiveCoin,
  clearDifferentData,
} from '../store/actions/actionsTable'

const CoinTableContainer = () => {
  const dispatch = useDispatch()
  const {
    currenciesData,
    differentData,
    isLoading,
    sortField,
    sortType,
  } = useSelector((state) => state.table)

  useEffect(() => {
    dispatch(fetchCurrenciesData())
    const updatingData = setInterval(
      () => dispatch(fetchCurrenciesData()),
      30000
    )
    return () => {
      clearInterval(updatingData)
    }
  }, [dispatch])

  useEffect(() => {
    const clearDiffData = setTimeout(() => dispatch(clearDifferentData()), 8000)
    return () => {
      clearTimeout(clearDiffData)
    }
  }, [dispatch, currenciesData])

  const onSortHandler = (field) => {
    dispatch(onSort(field))
  }
  const onSetActiveCoin = (name) => {
    dispatch(setActiveCoin(name))
  }
  //   if (isLoading) return <Loader />
  if (currenciesData.length === 0) return <Loader />
  return (
    <CoinTable
      currenciesData={currenciesData}
      onSort={onSortHandler}
      orderBy={sortField}
      order={sortType}
      onSetActiveCoin={onSetActiveCoin}
      differentData={differentData}
    />
  )
}

export default CoinTableContainer
