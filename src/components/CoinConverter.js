import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    padding: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputSumm: {
    width: 'calc(70% - 10px)',
    marginRight: 10,
  },
  sellectCurrency: {
    width: '30%',
  },
  rowInputs: {
    marginBottom: 30,
  },
}))

const CoinConverter = ({ currenciesData, state, onChange }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.formWrapper}>
      <div className={classes.rowInputs}>
        <FormControl className={classes.inputSumm}>
          <InputLabel htmlFor="standard-adornment-password">Сумма</InputLabel>
          <Input
            type="number"
            value={state.input1}
            onChange={({ target }) => onChange('input1', target.value)}
          />
        </FormControl>
        <FormControl className={classes.sellectCurrency}>
          <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={state.select1}
            onChange={({ target }) => onChange('select1', target.value)}
          >
            {currenciesData.map((coin) => (
              <MenuItem key={coin.id} value={coin.name}>
                {coin.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.rowInputs}>
        <FormControl className={classes.inputSumm}>
          <InputLabel htmlFor="">Сумма</InputLabel>
          <Input
            type="number"
            value={state.input2}
            onChange={({ target }) => onChange('input2', target.value)}
          />
        </FormControl>
        <FormControl className={classes.sellectCurrency}>
          <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={state.select2}
            onChange={({ target }) => onChange('select2', target.value)}
          >
            {currenciesData.map((coin) => (
              <MenuItem key={coin.id} value={coin.name}>
                {coin.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  )
}

CoinConverter.propTypes = {
  currenciesData: PropTypes.arrayOf(PropTypes.object),
  state: PropTypes.shape({
    input1: PropTypes.string,
    input2: PropTypes.string,
    select1: PropTypes.string,
    select2: PropTypes.string,
  }),
  onChange: PropTypes.func,
}

export default CoinConverter
