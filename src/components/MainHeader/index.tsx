import React from 'react';
import emojis from '../../utils/emojis'
import Toggle from '../Toggle';
import {
  Container, 
  Profile, 
  Welcome, 
  UserName} from './styles'

const Mainheader: React.FC = () => {
  const emoji = React.useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length)
    return emojis[indice]
  }, [])
  return (<Container>
    <Toggle/>
    <Profile>
      <Welcome>Olá, {emoji}</Welcome>
      <UserName>Junior Santos</UserName>
    </Profile>
  </Container>)
}

export default Mainheader