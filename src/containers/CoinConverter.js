import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CoinConverter } from '../components'

const CoinConverterContainer = () => {
  const { currenciesData, activeCoin } = useSelector((state) => state.table)
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [select1, setSelect1] = useState('')
  const [select2, setSelect2] = useState('')

  const state = {
    input1: input1.toString(),
    input2: input2.toString(),
    select1,
    select2,
  }

  const getPrice = (coinName) => {
    const { price } = currenciesData.find((coin) => coin.name === coinName)
    return price
  }
  //пересчёт валюты при зменении значений валют
  const mathCoinForInputChange = (
    valueCoin,
    nameCoin,
    convertCoinName,
    funcConvert
  ) => {
    if (valueCoin && nameCoin && convertCoinName) {
      const price1 = getPrice(nameCoin)
      const price2 = getPrice(convertCoinName)
      funcConvert((+price1 * +valueCoin) / +price2)
    }
  }
  //пересчёт валюты при зменении типа валют
  const mathCoinForSelectChange = (
    coinName,
    convertCoinName,
    valueCoin,
    funcConvert
  ) => {
    if (coinName && convertCoinName && valueCoin) {
      const price1 = getPrice(coinName)
      const price2 = getPrice(convertCoinName)
      funcConvert((+price1 * +valueCoin) / +price2)
    }
  }

  useEffect(() => {
    setSelect1(activeCoin)
    mathCoinForSelectChange(activeCoin, select2, input1, setInput2)
  }, [activeCoin])

  const onChange = (type, value) => {
    switch (type) {
      case 'input1':
        mathCoinForInputChange(value, select1, select2, setInput2)
        setInput1(value)
        break
      case 'input2':
        mathCoinForInputChange(value, select2, select1, setInput1)
        setInput2(+value)
        break
      case 'select1':
        mathCoinForSelectChange(value, select2, input1, setInput2)
        setSelect1(value)
        break
      case 'select2':
        mathCoinForSelectChange(value, select1, input2, setInput1)
        setSelect2(value)
        break

      default:
        break
    }
  }
  return (
    <CoinConverter
      currenciesData={currenciesData}
      state={state}
      onChange={onChange}
    />
  )
}

export default CoinConverterContainer
