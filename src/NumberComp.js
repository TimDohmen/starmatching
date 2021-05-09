import './StarMatch.css'


const NumberComp = props => (
  <div className="star" onClick={()=> console.log(props.numberProp)}>
    {props.numberProp}
  </div> 
)

export default NumberComp