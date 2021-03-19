import React from 'react';
import {GridLayout} from './styles'
import MainHeader from '../MainHeader'
import Content from '../Content'
import Aside from '../Aside'

const Layout: React.FC = ({ children }) => {
  return (<GridLayout>
            <MainHeader/>
            <Aside />
            <Content>
              {children}
            </Content>
  </GridLayout>)
}

export default Layout