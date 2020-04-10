import React from 'react'
import 'typeface-roboto'
import { CoinTable, CoinConverter } from './containers'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

function App() {
  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <CoinTable />
        </Grid>
        <Grid item xs={12} md={4}>
          <CoinConverter />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
