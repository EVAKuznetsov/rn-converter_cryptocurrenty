import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import classNames from 'class-names'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  iconCoin: {
    height: 24,
    borderRadius: '50%',
  },
  redCell: {
    backgroundColor: '#f9a8a8',
  },
  greenCell: {
    backgroundColor: '#a8f9c1',
  },
  cell: {
    transition: '0.5s',
  },
})

const CoinTable = ({
  currenciesData,
  onSort,
  orderBy,
  order,
  onSetActiveCoin,
  differentData,
}) => {
  const classes = useStyles()
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'name'}
                  onClick={() => onSort('name')}
                  direction={order}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'fullName'}
                  onClick={() => onSort('fullName')}
                  direction={order}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'price'}
                  onClick={() => onSort('price')}
                  direction={order}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'volume24hour'}
                  onClick={() => onSort('volume24hour')}
                  direction={order}
                >
                  volume24Hours
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currenciesData.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => onSetActiveCoin(row.name)}
              >
                <TableCell component="th" scope="row">
                  <img
                    className={classes.iconCoin}
                    src={row.img}
                    alt="icon Coin"
                  />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.fullName}</TableCell>
                <TableCell
                  className={classNames(
                    classes.cell,
                    differentData[row.name] &&
                      (differentData[row.name] === 'up'
                        ? classes.greenCell
                        : classes.redCell)
                  )}
                  align="right"
                >
                  ${row.price.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  ${row.volume24hour.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

CoinTable.propTypes = {
  currenciesData: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSetActiveCoin: PropTypes.func,
  differentData: PropTypes.object,
}

export default CoinTable
