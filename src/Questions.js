import React from "react"
import { decode } from 'html-entities'


export default function Questions(props){
    
    const [selectedOption, setSelectedOption] = React.useState(null)
    const [shuffledOptions, setShuffledOptions] = React.useState([]);

    function handleClick(obj,index){
        setSelectedOption(prevselectedOption=>prevselectedOption===index?null:index)
       const isCorrect = props.answer===obj
       
       props.score(prevScore=>{
           let currentScore= prevScore
           currentScore[props.index].isCorrect = isCorrect
            currentScore[props.index].answer = props.answer
            
            return [...currentScore]
       })
    }
      
      React.useEffect(() => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const newOptions = shuffleArray(props.option);
    setShuffledOptions(newOptions);
  }, [props.option]);
     
     const decodedQuestion = decode(props.questions)
     
      const options= shuffledOptions.map((obj,index)=>{
           const decodedOption = decode(obj);
        return(   
                 <p key={index}
                 onClick={()=>handleClick(obj,index)}
                 className={`${index===selectedOption?"selected":""} option-p
                 ${props.colorCode && index===selectedOption?"red":""}
                 ${props.colorCode && props.answer===obj?"green":"" }
                 `}
                 >
                 {decodedOption}</p>
        )
                })
  
   
    return (
        <div className="question">
        <h1>{decodedQuestion}</h1>
        <div className="options">
        {options}
        </div>
       <hr/>
        </div>
    )
}