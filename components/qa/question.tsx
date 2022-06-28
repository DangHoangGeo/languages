
import * as React from 'react'
import IQuetion from '../../types/question'

type Props = {
    question: IQuetion
}

const Question = ({question}:Props) => {
    const [answer, setAnswer] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(question.as[parseInt(event.target.value)].isCorrect);
        console.log(answer);
    };
    return(
        <article className="relative max-w-96 px-6 pt-6 pb-6 space-y-4 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
            <div>
                <h3 className="text-xl">{question.q}</h3>
            </div>
            {question.as.map((a, idx)=>(
                <div className="w-48" key={idx}>
                    <input className="hidden peer" onChange={handleChange} type="radio" name="shippingOption" value={idx} id={a.a} />
                        <label className={`flex items-center justify-between p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer peer-checked:hover:bg-gray-50 peer-checked:ring-1  ${a.isCorrect?'peer-checked:ring-blue-500':'peer-checked:ring-pink-500'}`} htmlFor={a.a}>
                        <span>{a.a}</span>
                    </label>
                </div>
            ))}
        </article>
    )
}

export default Question;