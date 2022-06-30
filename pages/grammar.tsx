import type { NextPage } from 'next'
import * as React from 'react'
import Question from '../components/qa/question'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'
import Pagination from '@mui/material/Pagination'
import {getAllQuizByLevel} from '../utils/graphcms'
import {IQuiz} from '../types/quiz'
import {IUser} from '../types/user'
import { LEANERID } from '../utils/constants'

type Props = {
  quizes: IQuiz[]
  user: IUser
}

const Grammar: NextPage<Props> = ({quizes, user}) => {
  const [slected, setSelected] = React.useState(1);
  const [isNext, setIsNext] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelected(value);
    setIsNext(true);
  };
  return (
    <div>
      <Hero user={user}/>
      <Section title="N2 grammar testing" description="N2 grammar testing">
        
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <Question next={isNext} question={quizes[slected-1]}/>
          </div>
          <div className="flex justify-center">
            <Pagination count={quizes.length} variant="outlined" onChange={handleChange} color="secondary" />
          </div>
        </div>
      </Section>
    </div>
  )
}

Grammar.getInitialProps = async ({ req }) => {
  const data = await getAllQuizByLevel(LEANERID, "N2",false)
  return { quizes: data.quizzes, user: data.learner  }
}

export default Grammar