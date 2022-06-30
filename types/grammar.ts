import {ILevel, ISentence} from './vocabulary'

export interface IGrammar {
    id: string
    japanese: string
    explain: string
    use: {html: string, markdown: string}
    english: string
    vietnamese: string
    chinese: string
    level: ILevel
    related: string
    sentences: ISentence[]
}