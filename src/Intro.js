import React from "react"

export default function intro(props){
    return(
        <div className="intro">
        <h1>Quizzical</h1>
        <p> This is a trivia app with medium level difficulty</p>
        <button onClick={props.displayIntro}>Start quiz</button>
        </div>
    )
}