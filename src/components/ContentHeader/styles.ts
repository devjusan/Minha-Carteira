import styled from "styled-components"

interface ITitleContainerProps {
  lineColor: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  justify-content: space-between;

`

export const TitleContainer = styled.div<ITitleContainerProps>`
   > h1 {
    position: relative;
    color: ${props => props.theme.colors.themeColor};

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 55px;
      border-bottom:  10px solid ${props => props.lineColor};
      border-radius: 2px;   
    }
  }
`

export const Controllers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 7px;
`

