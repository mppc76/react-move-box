import logo from './logo.svg';
import './App.css';

import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.keyDown = this.keyDown.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.state = {
      width: 0,
      height: 0,
      blockWidth: 0,
      blockHeight: 0,
      logo: { xpos: 0, ypos: 0 },
      logoColor: '#1E90FF',
    }
  }

  componentDidMount() {
    let width = document.getElementById('Board').parentElement.offsetWidth
    let height = width
    let blockWidth = width / 12
    let blockHeight = height / 12

    let logo = { xpos: (width / 2) - blockWidth / 2, ypos: (height / 2) - blockHeight / 2 }
    this.setState({
      width,
      height,
      blockWidth,
      blockHeight,
      logo
    })
    window.addEventListener('keydown', this.keyDown)
  }

  moveLogoBlock() {
    let logo = this.state.logo
    let width = this.state.width
    let height = this.state.height
    let blockWidth = this.state.blockWidth
    let blockHeight = this.state.blockHeight
    switch (this.state.direction) {
      case 'left':
        logo.xpos = logo.xpos <= 0 + blockWidth ? 0 : logo.xpos - blockWidth
        this.setState({ logo })
        break
      case 'right':
        logo.xpos = logo.xpos >= width - 2 * blockWidth ? width - blockWidth : logo.xpos + blockWidth
        this.setState({ logo })
        break
      case 'up':
        logo.ypos = logo.ypos <= 0 + blockHeight ? 0 : logo.ypos - blockHeight
        this.setState({ logo })
        break
      case 'down':
        logo.ypos =
          logo.ypos >= height - 2 * blockHeight ? height - blockHeight : logo.ypos + blockHeight
        this.setState({ logo })
        break
      default:

    }
  }

  clickHandler(event) {
    switch (event.target.id) {
      case 'left':
        this.moveLeft()
        break
      case 'right':
        this.moveRight()
        break
      case 'up':
        this.moveUp()
        break
      case 'down':
        this.moveDown()
        break
      default:
    }
  }

  keyDown(event) {
    switch (event.keyCode) {
      case 37:
        this.moveLeft()
        break
      case 39:
        this.moveRight()
        break
      case 38:
        this.moveUp()
        break
      case 40:
        this.moveDown()
        break
      default:
    }
  }

  moveLeft() {
    this.setState({ direction: 'left' })
    this.moveLogoBlock();
  }

  moveUp() {
    this.setState({ direction: 'up' })
    this.moveLogoBlock();
  }

  moveRight() {
    this.setState({ direction: 'right' })
    this.moveLogoBlock();
  }

  moveDown() {
    this.setState({ direction: 'down' })
    this.moveLogoBlock();
  }

  render() {

    return (
      <div>
        <div class="wrapper">
          <div class="up">   <button id="up" onClick={this.clickHandler} className="mov"></button></div>
          <div class="down"> <button id="down" onClick={this.clickHandler} className="mov"></button></div>
          <div class="left"> 
            Use click or arrow keys to move.
            <button id="left" onClick={this.clickHandler} className="movL"></button>
          </div>
          <div class="right"><button id="right"onClick={this.clickHandler} className="movR"></button></div>
          <div class="center"> <div
            id='Board'
            style={{
              width: this.state.width,
              height: this.state.height,
              borderWidth: 1,
            }}>

            <div
              key={0}
              className='LogoBlock'
              style={{
                background: this.state.logoColor,
                width: this.state.blockWidth,
                height: this.state.blockHeight,
                left: this.state.logo.xpos,
                top: this.state.logo.ypos
              }}
            >
              <img src={logo} className="logo" alt="d" />
            </div>

          </div>
          </div>
        </div>
        
      </div>

    )
  }
}

export default App

