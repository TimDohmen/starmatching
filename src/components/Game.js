import React, { useEffect, useState } from "react";
import utils from "../math-utils";
import PlayAgain from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";



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

  export default Game