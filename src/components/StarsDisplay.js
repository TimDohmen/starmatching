import React from "react"
import utils from "../math-utils"
import NumberComp from "../NumberComp"

const StarsDisplay = props => {
  return (
  <>
   {utils.range(1,props.count).map(starId=> 
    <NumberComp numberProp={starId} key={starId} />
    )}
  </>
  )
}

export default StarsDisplay