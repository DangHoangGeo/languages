//import {fetchAPI} from './graphcms'
import {ILevel} from '../types/vocabulary'
import {GRAPHCMS_DEV_AUTH_TOKEN, GRAPHCMS_PROD_AUTH_TOKEN, NEXT_CMS_GCMS_PROJECT_ID, GRAPHCMS_PROJECT_API} from '../utils/constants'

type variablesType = {
    id?:string
    stage?: string
    slug?: string
    date?: Date
    level?: ILevel
    locales?: [string]
    first?: number
    skip?: number
    orderBy?: string
    learner?: string
}

interface Props {
    variables?: variablesType,
    preview?: boolean
}

export async function fetchAPI(query: string, {variables, preview}: Props = {}){
    const res = await fetch(GRAPHCMS_PROJECT_API||"", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${
                preview
                ? GRAPHCMS_DEV_AUTH_TOKEN
                : GRAPHCMS_PROD_AUTH_TOKEN
                }`,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()
    if(json.errors) {
        console.log(process.env.NEXT_CMS_GCMS_PROJECT_ID)
        console.log(preview?"dev":"prod")
        console.log(preview
            ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
            : process.env.GRAPHCMS_PROD_AUTH_TOKEN)
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}
/**
 * Description:
 * connect user to remmbered grammar
 * Params
 * @param learner 
 * @param grammarID 
 * @param preview 
 * 
 * @output grammar
 */
export async function updateGrammarLearner(learner: string, grammarID: string, preview: boolean) {
    const data = await fetchAPI(
       `
        mutation updateGrammar($id: ID!, $learner: ID!){
            updateGrammar(
                where: {id: $id},
                data: { 
                    learners: {
                        connect: {
                            where: {
                                id: $learner
                            }
                        }
                    }
                }
            ) {
                id
                japanese
            }
            publishGrammar( where: { id: $id }, to: PUBLISHED) {
                id
                japanese
            }
        }
        `,{
            preview,
            variables:{
                learner,
                id: grammarID
            }
        }
    )
    return data
}


export async function getQuizesByPage(learner: string, level: ILevel,first: number, skip: number, preview: boolean) {
    const data = await fetchAPI(`
        query getQuizes($learner: ID!, $level: Level, $stage: Stage!, $first: Int!, $skip: Int!) {
            quizzes(where: {learners_none: {id_not: $learner}, level: $level}, 
                first: $first,
                skip: $skip,
                stage: $stage) {
                id
                question
                answers {
                    id
                    answer
                    isCorrect
                    grammar {
                        id
                        japanese
                        english
                        use{
                            html
                        }
                        sentences {
                            japanese
                            pronounce
                            english
                        }
                    }
                }
            },
            learner(where: {id: $learner}, stage: $stage){
                name
                email
                image{
                    url
                }
            }
        }
    `
    ,{
        preview,
        variables: {
            learner,
            stage: preview ? 'DRAFT' : 'PUBLISHED',
            level,
            first,
            skip
        },
    }
    )
    return data
}