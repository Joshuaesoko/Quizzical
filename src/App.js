import React from "react";
import Intro from "./Intro.js";
import Questions from "./Questions.js";
import "./index.css";

export default function App() {
  const [intro, setIntro] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [isClicked, setisClicked] = React.useState(true)
  const [checkScore, setCheckScore]= React.useState(false)
  const [totalScore, setTotalScore] = React.useState(0)
  const answerArr= []
const [score, setScore]= React.useState(answerArr)

  for(let i=0;i<5;i++){
      answerArr.push({
           isCorrect: false,
      answer: "temp",
      index: i
      })
  }
  
  React.useEffect(() => {
      
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data =>{ 
        console.log(data)
          setQuestions(data.results)
          })
  }, [])
  
    function displayIntro() {
    setIntro(false);
  }

  function handleChange(index) {
    setisClicked(prevIsClicked => !prevIsClicked);
  }
function checkAnswer(){
        const totalScoreArr=score.map(score=>{
          return  score.isCorrect===true ?1:0
        })
        const totalScores= totalScoreArr.reduce((accu,curr)=>{ return accu + curr},0)
         setCheckScore(true)
         setTotalScore(totalScores)
    }

 const scoreText = (
              <div className="btn-div">
              <p>You scored {totalScore}/5 correct answers</p>
              <button onClick={() => window.location.reload()} className="btn">Play 
              again</button>
             </div>  )
                          
 const playButton=  checkScore ? scoreText : <button onClick={checkAnswer} className="btn">Check answer</button> 
  
 const element = questions.map((obj, index) => {
         
            let option = obj.incorrect_answers
            if(option.length===3){
           option.push(obj.correct_answer)
            }
                      
return (  
            <Questions
                questions={obj.question}
                answer={obj.correct_answer}
                option= {option}
                key={obj.correct_answer}
                isClicked={isClicked}
                onClick={() => handleChange(index)}
                index={index}
                score={setScore}
                scoreData={score}
                colorCode={checkScore}
            />
            )
        })
 
  return (
    <div>
   
      {intro && <Intro displayIntro={displayIntro} />}
      <div className="question-comp">
        {!intro && element}
      <div className="btn-format">
       {!intro && playButton}
       </div>
       </div>
    </div>
  );
}
