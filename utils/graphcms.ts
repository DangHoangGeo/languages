import {ILevel} from '../types/vocabulary'

type variablesType = {
    id?:string
    stage?: string
    slug?: string
    date?: Date
    level?: ILevel
    locales?: [string]
    first?: number
    orderBy?: string
    learner?: string
}

interface Props {
    variables?: variablesType,
    preview?: boolean
}

export async function fetchAPI(query: string, {variables, preview}: Props = {}){
    const res = await fetch(process.env.GRAPHCMS_PROJECT_API||"", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${
                preview
                ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
                : process.env.GRAPHCMS_PROD_AUTH_TOKEN
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

// Fetch User profile
export async function getUserProfile(id: string, preview: boolean){
    const data = fetchAPI(
        `
        query userById($id: ID!, $stage: Stage!){
            learner(where: {id: $id}, stage: $stage){
                name
                email
                image{
                    url
                }
            }
        }
        `,{
            variables:{
                id: id,
                stage: preview ? 'DRAFT' : 'PUBLISHED',
            }
        }
    )
    return data
}

// Fetch Post
export async function getPreviewPostBySlug(slug: string) {
    const data = await fetchAPI(
        `
        query PostBySlug($slug: String!, $stage: Stage!){
            post(where: {slug: $slug}, stage: $stage){
                slug
            }
        }`,
            {variables:{
                stage: 'DRAFT',
                slug: slug,
            },
            preview: true
        }
    )
    return data.post
}

export async function getAllQuizByLevel(learner: string, level: ILevel,first: number, preview: boolean) {
    const data = await fetchAPI(`
        query getQuizes($learner: ID!, $level: Level, $stage: Stage!, $first: Int!) {
            quizzes(where: {learners_none: {id_not: $learner}, level: $level}, 
                first: $first,
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
            first
        },
    }
    )
    return data
}

/**
 * 
 * @param learner 
 * @param level 
 * @param first 
 * @param preview 
 * @returns 
 */

export async function getAllGrammarByLevel(learner: string, level: ILevel,first: number, preview: boolean) {
    const data = await fetchAPI(`
        query getGrammars($learner: ID! , $level: Level, $stage: Stage!, $first: Int!) {
            grammars(where: {learners_none: {id: $learner},level: $level},
                orderBy: createdAt_ASC,
                first: $first
                ) {
                id
                japanese
                level
                english
                use {
                  markdown
                }
                vietnamese
                sentences {
                  japanese
                  pronounce
                  english
                }
                learners{ id }
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
            first
        },
    }
    )
    return data
}

/**
 * 
 * @param slug 
 * @param preview 
 * @returns 
 */

export async function getGrammarAndMoreGrammar(slug: string, preview: boolean) {
    const data = await fetchAPI(
        `
        query PostBySlug($slug: String!, $stage: Stage!) {
            post(stage: $stage, where: {slug: $slug}){
                title
                slug
                author {
                    name,
                    image {
                        url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
                    }
                },
                content {
                    html
                },
                createdAt
            }
            morePosts: posts(
                where: {slug_not_in: [$slug]},
                orderBy: createdAt_DESC
                first: 6, 
                stage: $stage
              ) {
                slug
                title
                author {
                    name,
                    image {
                        url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
                    }
                }
                excerpt
                image {
                    url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
                }
                createdAt
            }
        }`
        ,{
            preview,
            variables: {
                stage: preview ? 'DRAFT' : 'PUBLISHED',
                slug
            },
        }
    )
    return data
}
