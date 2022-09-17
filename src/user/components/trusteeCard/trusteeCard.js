import React from 'react'
import "./trusteeCard.css"
const TrusteeCard = (props) => {
  return (
    <div className='trustee-card-client'>
        <div className="trustee-photo my-2"><img src={props.photo} alt="" /></div>
        <div className="trustee-name my-1">{props.name}</div>
        <div className="trustee-position my-1">{props.position}</div>
        <div className="trustee-description">{props.description}</div>
    </div>
  )
}

export default TrusteeCard