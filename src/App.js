import React, { Component } from 'react'
import './App.css'
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

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px black',
  transform: 'scale(0.96)'
}

const inactiveStyle = {
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: '0 4px 16px black'
}


class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.playSound = this.playSound.bind(this)

    this.activePad = this.activePad.bind(this)
    this.inActivePad = this.inActivePad.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }


  activePad() {
    this.setState({
      padStyle: activeStyle
    })

  }

  inActivePad() {
    setTimeout(() => {
      this.setState({
        padStyle: inactiveStyle
      })
    }, 180)
  }

  handleKeyPress(e) {
    const keyPressed = e.key.toUpperCase();
    if (keyPressed === this.props.keyTrigger && this.props.isOn) {
      this.playSound()

      this.props.updateDisplay(this.props.id)
      this.activePad()
      this.inActivePad()

    } else if (keyPressed === this.props.keyTrigger) {
      this.setState({
        padStyle: {
          transform: 'scale(0.96)',
          backgroundColor: '#fff',
          boxShadow: '0 3px black'
        }
      })

      this.inActivePad()
    }
  }


  handleClick() {
    if (this.props.isOn) {
      this.playSound();

      this.props.updateDisplay(this.props.id)
      this.activePad()
      this.inActivePad()

    } else {
      this.setState({
        padStyle: {
          transform: 'scale(0.96)',
          backgroundColor: '#fff',
          boxShadow: '0 3px black'
        }
      })

      this.inActivePad();
    }

  }

  playSound() {
    const track = document.getElementById(this.props.keyTrigger)
    track.currentTime = 0;
    track.play()
  }


  render() {
    return (
      <div
        style={this.state.padStyle}
        id={this.props.id}
        className='drum-pad btn'
        onClick={this.handleClick}
      >
        <audio
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

  render() {
    return (
      <div className='drum-box'>
        {
          this.props.isOn
            ? this.props.track.map(item => {
              return (
                <DrumPad
                  key={item.keyTrigger}
                  keyTrigger={item.keyTrigger}
                  id={item.id}
                  url={item.url}
                  updateDisplay={this.props.updateDisplay}
                  isOn={this.props.isOn}
                />
              )
            })
            : this.props.track.map(item => {
              return (
                <DrumPad
                  key={item.keyTrigger}
                  keyTrigger={item.keyTrigger}
                  id={item.id}
                  url='#'
                  isOn={this.props.isOn}
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
      isOn: true
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
      isOn: !prevState.isOn,
      display: String.fromCharCode(160)
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
            isOn={this.state.isOn}
          />

          <div id='control'>
            <div
              className='power-btn'
              style={{ backgroundColor: this.state.isOn ? 'greenyellow' : 'orangered' }}
            >
              <span>Power</span>
              <Switch
                checked={this.state.isOn}
                onChange={this.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>

            <div className='display-box' >
              <div id="display">{this.state.display}</div>
              <VolumeControle
                onChange={this.handleVolume}
                isOn={this.state.isOn}
              />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default App