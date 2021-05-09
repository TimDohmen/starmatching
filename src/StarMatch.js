// STAR MATCH - Starting Template
import { useEffect, useState } from "react";
import NumberComp from "./NumberComp.js"
import './StarMatch.css'

const StarsDisplay = props => {
  return (
  <>
   {utils.range(1,props.count).map(starId=> 
    <NumberComp numberProp={starId} key={starId} />
    )}
  </>
  )
}

const PlayNumber = props => {
  return (
    <button className="number" 
     onClick={()=>props.onClick(props.num, props.status)}
     style={{backgroundColor: colors[props.status]}}
     >
    {props.num}</button>
  )
}
const PlayAgain = props => {
  return (<div className="game-done">
    <div className="message" style={{color: props.gameStatus === 'lost' ?'red': 'green'}}>
      {props.gameStatus === 'lost' ? 'Game Over' : 'Very Nice'}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>)
}


// Custom Hook

const useGameState=()=>{
const [stars, setStars] = useState( utils.random(1,9));
  const [availableNums, setAvailableNums] = useState(utils.range(1,9))
  const [candidateNums, setCandidateNums] = useState([])

  const [secondsLeft, setSecondsLeft] = useState(10)

 
  useEffect(() => {
    if(secondsLeft>0 && availableNums.length >0){
      const timerId = setTimeout(()=>{
        setSecondsLeft(secondsLeft-1)
      },1000)
      // cleans up effect
      return ()=> clearTimeout(timerId)
    }
   
    
  })

const setGameState=(newCandidateNums)=>{
  if(utils.sum(newCandidateNums) !== stars){
    setCandidateNums(newCandidateNums)
  }else  {
    const newAvailableNums = availableNums.filter( n => !newCandidateNums.includes(n))
    setStars(utils.randomSumIn(newAvailableNums,9))
    setAvailableNums(newAvailableNums)
    setCandidateNums([])
  }
}

return { stars, availableNums, candidateNums, secondsLeft, setGameState }


}



const Game = (props) => {
 
const  {
  stars,
  availableNums,
  candidateNums,
  secondsLeft,
  setGameState,
} = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus = availableNums.length ===0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'


  // const resetGame= ()=>{
  //   setStars(utils.random(1,9))
  //   setAvailableNums(utils.range(1,9))
  //   setCandidateNums([])
  // }

  const numberStatus=(num)=>{
    if(!availableNums.includes(num)){
      return 'used';
    }
    if(candidateNums.includes(num)){
      return candidatesAreWrong? 'wrong':'candidate'
    }
    return 'available'
  }

  const onNumberClick = (num, status) => {
    if(gameStatus!=='active' || status === 'used' ){
      return;
    }
    const newCandidateNums =  status === 'available' ? candidateNums.concat(num) : candidateNums.filter(cn=> cn !==num)

    setGameState(newCandidateNums)
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
        {gameStatus !== 'active' ? 
        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/> : 
         <StarsDisplay count={stars}/>
       }
        </div>
        <div className="right">

        {utils.range(1,9).map(num=>
        <PlayNumber 
        num={num} 
        key={num}
        status={numberStatus(num)}
        onClick={onNumberClick}
        /> 
       )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = ()=>{
  const [gameId, setGameId] = useState(1)
  return <Game key={gameId} startNewGame={()=>setGameId(gameId +1)}/>
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};



export default StarMatch;
