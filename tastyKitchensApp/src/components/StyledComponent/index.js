import styled, {createGlobalStyle, keyframes} from 'styled-components'
import {merge, bounceIn, flipInY} from 'react-animations'

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }
  body{
    font-family: "DM Sans", "Bree Serif", sans-serif;
  }

`

export const Button = styled.button`
  outline: none;
  border: none;
  border: ${props => props.border};
  cursor: pointer;
  color: #ffffff;
  color: ${props => props.color};
  background-color: #f7931e;
  background-color: ${props => props.bgColor};
  height: 32px;
  height: ${props => props.height};
  border-radius: 8px;
  border-radius: ${props => props.brRadius};
  padding: 8px 16px;
  font-weight: 700;
  font-weight: ${props => props.fontWeight};
  font-size: 14px;
  font-size: ${props => props.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  width: ${props => props.width};
  margin-top: ${props => props.marginTop};
`
export const Star = styled.p`
  font-size: 12px;
  color: #${props => props.color};
`
export const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.minHeight};
  margin-top: 20px;
`

const tickAnimations = merge(bounceIn, flipInY)

export const bounceAnimation = keyframes`${tickAnimations}`

export const BouncyDiv = styled.div`
  height: fit-content;
  width: fit-content;
  background-color: transparent;
  animation: 3s ${bounceAnimation} infinite;
`
