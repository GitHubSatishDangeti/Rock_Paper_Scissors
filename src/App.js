import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './App.css'
import ItemList from './components/ItemList'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {score: 0, buttonSelected: [], randomItem: [], won: ''}

  buttonClick = id => {
    const {score} = this.state
    const selectedButton = choicesList.filter(i => i.id === id)
    this.setState({buttonSelected: selectedButton[0]})
    const random = Math.floor(Math.random() * 3)
    const randomItem = choicesList[random]
    this.setState({randomItem})
    if (
      (id === 'ROCK' && randomItem.id === 'SCISSORS') ||
      (id === 'SCISSORS' && randomItem.id === 'PAPER') ||
      (id === 'PAPER' && randomItem.id === 'ROCK')
    ) {
      this.setState(prev => ({score: prev.score + 1, won: 'YOU WON'}))
    } else if (
      (id === 'SCISSORS' && randomItem.id === 'ROCK') ||
      (id === 'PAPER' && randomItem.id === 'SCISSORS') ||
      (id === 'ROCK' && randomItem.id === 'PAPER')
    ) {
      this.setState(prev => ({score: prev.score - 1, won: 'YOU LOSE'}))
    } else {
      this.setState(prev => ({score: prev.score + 0, won: 'IT IS DRAW'}))
    }
  }

  onPlayAgain = () => {
    this.setState({buttonSelected: [], randomItem: [], won: ''})
  }

  render() {
    const {score, buttonSelected, randomItem, won} = this.state
    const isClicked = buttonSelected.length !== 0

    return (
      <div>
        <div>
          <h1>
            Rock Paper Scissors
            {/* {choicesList.map(i => (
              <li key={i.id}>{i.id}</li>
            ))} */}
          </h1>
          <div>
            <p>Score</p>
            <p className="score">{`${score}`}</p>
          </div>
        </div>
        <div>
          {isClicked ? (
            <div>
              <div>
                <h1>YOU</h1>
                <img
                  width="50px"
                  src={buttonSelected.imageUrl}
                  alt="your choice"
                />
              </div>
              <div>
                <h1>OPPONENT</h1>
                <img
                  width="50px"
                  src={randomItem.imageUrl}
                  alt="opponent choice"
                />
              </div>
              <div>
                <p>{won}</p>
                <button onClick={this.onPlayAgain} type="button">
                  PLAY AGAIN
                </button>
              </div>
            </div>
          ) : (
            <ul>
              {choicesList.map(i => (
                <ItemList
                  key={i.id}
                  itemdetails={i}
                  buttonClick={this.buttonClick}
                />
              ))}
            </ul>
          )}
        </div>
        <Popup
          trigger={<button type="button"> Rules</button>}
          position="right center"
        >
          <div>
            <>
              <button type="button">
                <RiCloseLine />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </>
          </div>
        </Popup>
      </div>
    )
  }
}

export default App
