import React from "react"


const PlayAgain = props => {
  return (<div className="game-done">
    <div className="message" style={{color: props.gameStatus === 'lost' ?'red': 'green'}}>
      {props.gameStatus === 'lost' ? 'Game Over' : 'Very Nice'}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>)
}

export default PlayAgain
