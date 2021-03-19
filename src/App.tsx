import React from 'react'
import Layout from './components/GridLayout';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark';
import List from './pages/List'
const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Layout>
        <List />
      </Layout>
    </ThemeProvider>
  )

}

export default App