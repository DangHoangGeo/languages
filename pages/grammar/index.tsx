import type { NextPage } from 'next'
import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Layout from '../../components/layout/Layout'
import {Section} from '../../components/layout/Section'
import {getAllGrammarByLevel} from '../../utils/graphcms'
import {IGrammar} from '../../types/grammar'
import {IUser} from '../../types/user'
import { LEANERID } from '../../utils/constants'


type Props = {
  grammars: IGrammar[]
  user: IUser
}

const Grammar: NextPage<Props> = ({grammars, user}) => {
  const [slected, setSelected] = React.useState(1);
  const [grammar, setGrammar]  = React.useState(grammars[0]);
  const [isNext, setIsNext] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelected(value);
    setGrammar(grammars[value-1]);
  };
  return (
    <Layout>
      <Section title="N2 grammar" description="N2 grammar">
      <div className="gap-4 justify-center">
           <div className="flex justify-center">
            <div className="indicator max-w-lg">
                <div className="indicator-item indicator-bottom">
                    <button className="btn btn-primary">Example</button>
                </div> 
                <div className="card border">
                    <div className="card-body space-y-4">
                        <h2 className="card-title">{grammar.japanese}</h2> 
                        <p>{grammar.english}</p>
                        <pre><code>{grammar.use.markdown}</code></pre>
                        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                            <input type="checkbox" className="peer" /> 
                            <div className="collapse-title font-medium">
                                Click to see Sentences
                            </div>
                            <div className="collapse-content space-y-2"> 
                                {grammar.sentences.map((sen, idx)=>(
                                    <div className="border p-4 border-base-300 bg-base-100 rounded-box" key={idx}>
                                        <p >{sen.japanese}</p>
                                        <p>{sen.english}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="mt-8 flex justify-center">
            <Pagination count={grammars.length} variant="outlined" onChange={handleChange} color="secondary" />
            </div>
        </div>
      </Section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await getAllGrammarByLevel(LEANERID, "N2", 10, false)
  return { props:{grammars: data.grammars, user: data.learner }}
}

export default Grammar