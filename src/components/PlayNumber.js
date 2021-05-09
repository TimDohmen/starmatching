import React from "react"


const PlayNumber = props => (

    <button className="number" 
     onClick={()=>props.onClick(props.num, props.status)}
     style={{backgroundColor: colors[props.status]}}
     >
    {props.num}</button>
  
)


const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};


export default PlayNumber