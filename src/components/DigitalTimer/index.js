// Write your code here
import {Component} from 'react'
import './index.css'

export default class DigitalTimer extends Component {
  state = {
    timer: false,
    seconds: 1500,
    m: 25,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState({
      timer: false,
      seconds: 1500,
      m: 25,
    })
  }

  onChangeTimerInc = () => {
    const {timer, m} = this.state
    if (!timer) {
      console.log('+ Clicked')
      this.setState(prevState => ({
        m: prevState.m + 1,
      }))
      console.log(m + 1)
      this.setState({seconds: (m + 1) * 60})
    }
  }

  onChangeTimerDec = () => {
    const {timer, m} = this.state
    if (!timer) {
      console.log('- Clicked')
      this.setState(prevState => ({
        m: prevState.m - 1,
      }))
      console.log(m - 1)
      this.setState({seconds: (m - 1) * 60})
    }
  }

  onChangeTimer = () => {
    const {seconds} = this.state
    console.log('=C')
    if (seconds === 0) {
      clearInterval(this.intervalId)
      this.setState({timer: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  onStartOrPauseTimer = () => {
    const {timer} = this.state
    if (!timer) {
      this.intervalId = setInterval(this.onChangeTimer, 1000)
    } else {
      clearInterval(this.intervalId)
    }
    this.setState({timer: !timer})
  }

  minutes = () => {
    const {seconds} = this.state
    const min = Math.floor(seconds / 60)
    if (min < 10) {
      return `0${min}`
    }
    return min
  }

  second = () => {
    const {seconds} = this.state
    const sec = Math.floor(seconds % 60)
    if (sec < 10) {
      return `0${sec}`
    }
    return sec
  }

  render() {
    const {timer, m} = this.state
    const time = `${this.minutes()}:${this.second()}`

    let startstop = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    let altst = 'play icon'

    if (timer) {
      startstop = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      altst = 'pause icon'
    }

    return (
      <div className="container">
        <h1>Digital Timer</h1>
        <div className="main-container">
          <div className="timer-bg">
            <div className="timer-display">
              <h1>{time}</h1>
              <p>{timer ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-controls">
            <div className="stsp">
              <button type="button" onClick={this.onStartOrPauseTimer}>
                <img src={startstop} alt={altst} />
                {timer ? 'Pause' : 'Start'}
              </button>
              <button type="button" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <div>
              <p>Set Timer Limit</p>
              <div className="incdscbtn">
                <button type="button" onClick={this.onChangeTimerDec}>
                  -
                </button>
                <p className="timerLimit">{m}</p>
                <button type="button" onClick={this.onChangeTimerInc}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
