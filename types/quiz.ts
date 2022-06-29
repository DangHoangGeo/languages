import {IGrammar} from './grammar'
export interface IQuizCategory {
    title: string
    slug: string
    questions: IQuiz[]
}

export interface IAnswer {
    id: string
    answer: string
    isCorrect: boolean
    grammar: IGrammar
}

export interface IQuiz {
    id: string
    question: string
    answers: IAnswer[];
    category: IQuizCategory
}


