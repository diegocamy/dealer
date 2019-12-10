import React from 'react'

export default function Card(props) {
  return <div className="roll-in-left card-div"><img src={props.carta} alt={props.alt} style={{ transform: `rotate(${props.rotacion}deg)` }} /></div>

}
