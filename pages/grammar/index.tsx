import type { NextPage } from "next"
import * as React from "react"
import Button from '@mui/material/Button'
import Pagination from "@mui/material/Pagination"
import Layout from "../../components/layout/Layout"
import FaqsCard from "../../components/FaqsCard"
import { Section } from "../../components/layout/Section"
import { getAllGrammarByLevel } from "../../utils/graphcms"
import { updateGrammarLearner } from '../../utils/graphqlUpdate'
import { IGrammar } from "../../types/grammar"
import { IUser } from "../../types/user"
import { LEANERID } from "../../utils/constants"

type Props = {
  grammars: IGrammar[]
  user: IUser
}


const Grammar: NextPage<Props> = ({ grammars, user }) => {
  const [slected, setSelected] = React.useState(0)
  const [onProcess, setOnProcess] = React.useState(false)
  const [total, setTotal] = React.useState(grammars.length)
  const [grammar, setGrammar] = React.useState(grammars[0])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setGrammar(grammars[value - 1])
    setSelected(value - 1)
  }

  async function handleRemember () {
    setOnProcess(true)
    const data = await updateGrammarLearner(LEANERID, grammar.id, false)
    const index = grammars.indexOf(grammars[slected]);
    if (index > -1) { // only splice array when item is found
        grammars.splice(index, 1); // 2nd parameter means remove one item only
    }
    setTotal(grammars.length)
    setGrammar(grammars[slected+1])
    setOnProcess(false)
  };


  return (
    <Layout>
      <Section title="N2 grammar" description="N2 grammar">
        <div>
          <div className="flex justify-center">
            <div className="indicator min-h-fit max-w-lg">
                <div className="indicator-item indicator-top">
                    <Button onClick={handleRemember} className="btn">Got</Button>
                </div> 
              <div className="card border shadow-md">
                <div className="card-body space-y-4">
                  <div className="text-center">
                    <h2 className="text-2xl text-gray-800 font-semibold">
                      {grammar.japanese}
                    </h2>
                  </div>
                  <p>{grammar.english}</p>
                  <div className="mt-4 p-4 bg-slate-500 text-gray-200 rounded-lg dark:text-slate-200">
                    <code>{grammar.use.markdown}</code>
                  </div>
                  <div className="mx-auto">
                    {grammar.sentences.map((sen, idx) => (
                      <FaqsCard key={idx} faqsList={sen} idx={idx} />
                    ))}
                  </div>
                </div>
                {onProcess ? <span className="absolute inset-x-0 bottom-0 h-1  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"/>:<></>}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              count={total}
              variant="outlined"
              onChange={handleChange}
              color="secondary"
            />
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await getAllGrammarByLevel(LEANERID, "N2", 10, false)
  return { props: { grammars: data.grammars, user: data.learner } }
}

export default Grammar
