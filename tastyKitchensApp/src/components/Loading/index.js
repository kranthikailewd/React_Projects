import Loader from 'react-loader-spinner'
import {LoadingDiv} from '../StyledComponent/index'
import './index.css'

const Loading = props => {
  const {testid, minHeight} = props
  return (
    <LoadingDiv
      testid={testid}
      minHeight={minHeight}
      className="loading_height_adjust"
    >
      <Loader type="TailSpin" height={40} width={40} color="#f7931e" />
    </LoadingDiv>
  )
}

export default Loading
