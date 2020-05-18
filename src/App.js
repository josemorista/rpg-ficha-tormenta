import React, { memo } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Root from './components/Root'
import { Container, CssBaseline } from '@material-ui/core'
import bg from './bg.jpg'

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Verdana","Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#9d5124',
    },
  },
})

export default memo(function App(props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'left',
        height: '100%',
      }}
    >
      <MuiThemeProvider theme={theme}>
        <Container maxWidth={'lg'}>
          <CssBaseline />
          <Root />
        </Container>
      </MuiThemeProvider>
    </div>
  )
})
