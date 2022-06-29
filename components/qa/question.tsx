
import * as React from 'react'
import IQuetion from '../../types/question'

type Props = {
    question: IQuetion
    next: boolean
}

const Question = ({question, next}:Props) => {
    const [answer, setAnswer] = React.useState(-1);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(parseInt(event.target.value));
        console.log("answer: "+answer);
    };
    return(
        <div className="lg:mx-48 my-6">   
            <article className="relative space-y-2 block p-8 overflow-hidden border border-gray-100 rounded-lg">
                <div>
                    <h3 className="text-xl text-gray-900">{question.q}</h3>
                </div>
                {question.as.map((a, idx)=>(
                    <div className="lg:w-64" key={idx}>
                        <input className="hidden peer" onChange={handleChange} checked={next?answer===idx?true:false:undefined} type="radio" name="shippingOption" value={idx} id={a.a} />
                        <label className={`flex items-center justify-between p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer peer-checked:hover:bg-gray-50 peer-checked:ring-1  ${a.isCorrect?'peer-checked:ring-cyan-400':'peer-checked:ring-pink-500'}`} htmlFor={a.a}>
                            <span>{a.a}</span>
                        </label>
                    </div>
                ))}
                <span
                className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span>
            </article>
        </div>
    )
}

export default Question;