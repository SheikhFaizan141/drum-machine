import React, { Component } from 'react'
import './App.css'
import { StyledEngineProvider } from '@mui/material/styles';
import VolumeControle from './components/VolumeControle';
import Switch from '@mui/material/Switch';

const bankOne = [
  {
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: {
        backgroundColor: 'rgb(255, 255, 255)'
      }
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.playSound = this.playSound.bind(this)
    this.handleEnd = this.handleEnd.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    const keyPressed = e.key.toUpperCase();
    if (keyPressed === this.props.keyTrigger) {
      this.playSound()
    }
  }


  playSound() {
    const track = document.getElementById(this.props.keyTrigger)
    track.currentTime = 0;
    track.play()

    this.props.updateDisplay(this.props.id)

    this.setState({
      padStyle: {
        backgroundColor: 'rgb(179 175 45)',
        transform: 'scale(0.96) translate(1px, 1px)'
      }
    })
  }

  handleEnd() {
    this.setState({
      padStyle: {
        backgroundColor: 'rgb(255, 255, 255)'
      }
    })
  }


  render() {

    return (
      <div
        style={this.state.padStyle}
        id={this.props.id}
        className={`drum-pad`}
        onClick={this.playSound}
      >
        <audio
          onEnded={this.handleEnd}
          className='clip'
          id={this.props.keyTrigger}
          src={this.props.url}
        />
        {this.props.keyTrigger}
      </div>
    )
  }
}

class DrumBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='drum-box'>
        {
          this.props.track.map(ele => {
            return (
              <DrumPad
                key={ele.keyTrigger}
                keyTrigger={ele.keyTrigger}
                id={ele.id}
                url={ele.url}
                updateDisplay={this.props.updateDisplay}
              />
            )
          })
        }
      </div>
    )
  }
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: String.fromCharCode(160),
      volume: 0.35,
      checked: true
    }
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleVolume(value) {
    this.setState({
      volume: value,
      display: `Volume: ${Math.floor(value * 100)}`
    })
  }

  updateDisplay(name) {
    this.setState({
      display: name
    })
  }

  handleChange() {
    this.setState(prevState => ({
      checked: !prevState.checked
    }))
  }

  render() {
    const clips = [...document.getElementsByClassName('clip')];
    clips.forEach(clip => {
      clip.volume = this.state.volume
    })

    return (
      <div className='container'>
        <div id='drum-machine'>
          <DrumBox
            track={bankOne}
            updateDisplay={this.updateDisplay}
          />
          <div id='control'>
            <div className='power-btn' >
              <span>Power</span>
              <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>

            <div className='display-box' >
              <div id="display">{this.state.display}</div>
              <StyledEngineProvider injectFirst>
                <VolumeControle onVolumeChange={this.handleVolume} />
              </StyledEngineProvider>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default App