
import * as React from 'react'
import {IQuiz} from '../../types/quiz'
import {IGrammar} from '../../types/grammar'
import {ISentence} from '../../types/vocabulary'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
    question: IQuiz
    next: boolean
}
const sgrammar: IGrammar = {
    "id": "",
    "japanese": "",
    "explain": "",
    "use": {html: "", markdown: ""},
    "english": "",
    "vietnamese": "",
    "chinese": "",
    "level": "N2",
    "related": "",
    "sentences": [{id:"",japanese:"", vietnamese:"",english:"",chinese:"",}],
}

const Question = ({question, next}:Props) => {
    const [answer, setAnswer] = React.useState(-1);
    const [grammar, setGrammar] = React.useState(sgrammar);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(parseInt(event.target.value));
        if(question.answers[parseInt(event.target.value)].grammar){
            setGrammar(question.answers[parseInt(event.target.value)].grammar);
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    //TODO: 
    const handleGotit = () => {
        setOpen(false);
    };

    return(
        <div className="lg:mx-48 my-6">   
            <article className="relative space-y-2 block p-8 overflow-hidden border border-gray-100 rounded-lg">
                <div>
                    <h3 className="text-xl text-gray-900">{question.question}</h3>
                </div>
                {question.answers.map((a, idx)=>(
                    <div className="lg:w-64" key={idx}>
                        <input className="hidden peer" onChange={handleChange} type="radio" name="shippingOption" value={idx} id={a.answer} />
                        <label className={`flex items-center justify-between p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer peer-checked:hover:bg-gray-50 peer-checked:ring-1  ${a.isCorrect?'peer-checked:ring-cyan-400':'peer-checked:ring-pink-500'}`} htmlFor={a.answer}>
                            <span>{a.answer}</span>
                        </label>
                    </div>
                ))}
                <span
                className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span>
            </article>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {grammar.japanese}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {grammar.english}
                </DialogContentText>
                <div className="mt-4 p-4 bg-slate-500 text-gray-200 rounded-lg dark:text-slate-200"
                            dangerouslySetInnerHTML={{ __html: grammar.use.html }}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleGotit} autoFocus>
                    Got
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Question;