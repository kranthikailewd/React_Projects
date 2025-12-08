import {Component} from 'react'
import {
  MainContainer,
  MemeGeneratingContainer,
  Heading,
  Label,
  Submit,
  Input,
  Select,
  Option,
  Button,
  ImageContainer,
  ImageBlock,
  TopText,
  BottomText,
} from './styledComponents'

const fontSizesOptionsList = [
  {
    optionId: '8',
    displayText: '8',
  },
  {
    optionId: '12',
    displayText: '12',
  },
  {
    optionId: '16',
    displayText: '16',
  },
  {
    optionId: '20',
    displayText: '20',
  },
  {
    optionId: '24',
    displayText: '24',
  },
  {
    optionId: '28',
    displayText: '28',
  },
  {
    optionId: '32',
    displayText: '32',
  },
]

class MemeGenerator extends Component {
  state = {
    imageURL: '',
    topText: '',
    bottomText: '',
    selectedFontSize: fontSizesOptionsList[0].optionId,
    displayImage: false,
  }

  render() {
    const {
      imageURL,
      topText,
      bottomText,
      selectedFontSize,
      displayImage,
    } = this.state
    return (
      <MainContainer>
        <MemeGeneratingContainer>
          <Heading>Meme Generator</Heading>
          <Submit
            onSubmit={event => {
              event.preventDefault()
              this.setState({displayImage: true})
            }}
          >
            <Label>
              Image URL
              <Input
                type="text"
                value={imageURL}
                placeholder="Enter the Image URL"
                onChange={event =>
                  this.setState({
                    imageURL: event.target.value,
                    displayImage: false,
                  })
                }
              />
            </Label>
            <Label>
              Top Text
              <Input
                type="text"
                value={topText}
                placeholder="Enter the Top Text"
                onChange={event =>
                  this.setState({
                    topText: event.target.value,
                    displayImage: false,
                  })
                }
              />
            </Label>
            <Label>
              Bottom Text
              <Input
                type="text"
                value={bottomText}
                placeholder="Enter the Bottom Text"
                onChange={event =>
                  this.setState({
                    bottomText: event.target.value,
                    displayImage: false,
                  })
                }
              />
            </Label>
            <Label>
              Font Size
              <Select
                value={selectedFontSize}
                onChange={event => {
                  console.log(event.target.value)
                  this.setState({
                    selectedFontSize: event.target.value,
                    displayImage: false,
                  })
                }}
              >
                {fontSizesOptionsList.map(each => (
                  <Option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </Option>
                ))}
              </Select>
            </Label>
            <Button type="submit">Generate</Button>
          </Submit>
        </MemeGeneratingContainer>
        <ImageContainer>
          {displayImage && (
            <ImageBlock src={imageURL} data-testid="meme">
              <TopText font={selectedFontSize}>{topText}</TopText>
              <BottomText font={selectedFontSize}>{bottomText}</BottomText>
            </ImageBlock>
          )}
        </ImageContainer>
      </MainContainer>
    )
  }
}

export default MemeGenerator
