import {IGrammar} from './grammar'
export type IWordType  = 'NOUN'| 'VERB' | 'ADJECTIVE' | 'OTHER'
export type ILevel  = 'N5'| 'N4' | 'N3' | 'N2' | 'N1'

export interface IVocabulary {
    id: string
    japanese: string
    english: string
    vietnamese?: string
    chinese?: string
    type?: IWordType
    sentence?: ISentence[]
}

export interface IKanji {
    id: string
    japanese: string
    pronounce: {on: string, kun: string}
    english: string
    vietnamese?: string
    chinese?: string
    sentence: ISentence[]
}

export interface ISentence {
    id: string
    japanese: string
    english: string
    vietnamese?: string
    chinese?: string
    kanjis?: IKanji[]
    grammar?: IGrammar[]
    vocabulary?: IVocabulary[]
}