import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  @media (max-width: 426px){
    flex-direction: column;
    height: auto;
    padding: 0 20px;
  }
`
export const Heading = styled.h1`
  color: #1e293b;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 20px;
`
export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #7e858e;
`
export const Input = styled.input`
  height: 30px;
  width: 100%;
  padding: 0 6px;
  display: flex;
  align-items: center;
  color: #1e293b;
  font-size: 12px;
  font-size: 600;
  margin-top: 4px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid #5a7184;
  outline: none;
`
export const Select = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #5a7184;
  outline: none;
`
export const Submit = styled.form``
export const Option = styled.option`
  padding: 0 12px;
`
export const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #0b69ff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 22px;
  font-size: 12px;
  font-weight: 60px;
  border-radius: 6px;
  margin-top: 10px;
`
export const MemeGeneratingContainer = styled.div`
  width: 300px;
  height: fit-content;
`
export const ImageContainer = styled.div`
  width: 300px;
  height: fit-content
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ImageBlock = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
export const TopText = styled.p`
  font-weight: 600;
  font-size: ${props => props.font}px;
  color: #ffffff;
`
export const BottomText = styled(TopText)``
