import type { NextPage } from 'next'
import * as React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Layout from '../../components/layout/Layout'
import {Section} from '../../components/layout/Section'
import Pagination from '@mui/material/Pagination'
import Question from '../../components/qa/question'
import {getAllQuizByLevel} from '../../utils/graphcms'
import {getQuizesByPage} from '../../utils/graphqlUpdate'
import {IQuiz} from '../../types/quiz'
import {IUser} from '../../types/user'
import { LEANERID } from '../../utils/constants'

type Props = {
  quizes: IQuiz[]
  user: IUser
}

const GrammarTest: NextPage<Props> = ({quizes, user}) => {
  const [slected, setSelected] = React.useState(1);
  const [page, setPage] = React.useState(10);
  const [skipPage, setSkipPage] = React.useState(0);
  const [isNext, setIsNext] = React.useState(false);
  const [currenQuizes, setCurrenQuizes] = React.useState(quizes)

  async function handleNext () {
    const data = await getQuizesByPage(LEANERID, "N2", 5,skipPage,false);
    setCurrenQuizes(data.quizzes)
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSkipPage(value*5-5)
    handleNext()
  };
  return (
    <Layout>
      <Section title="N2 grammar testing" description="N2 grammar testing">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <CountdownCircleTimer
                  isPlaying
                  size={48}
                  strokeWidth={4}
                  duration={90}
                  colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                  colorsTime={[80, 40, 30, 10]}
              >
                  {({ remainingTime }) => <p className="text-xl text-red-700">{remainingTime}</p>}
              </CountdownCircleTimer>
          </div>
          <div className="">
            {currenQuizes.map((item, idx)=>(
              <Question key={idx} next={isNext} question={item}/>
            ))}
          </div>
          <div className="flex justify-center">
            <Pagination count={page} variant="outlined" onChange={handleChange} color="secondary" />
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await getAllQuizByLevel(LEANERID, "N2", 5,false)
  return { props:{quizes: data.quizzes, user: data.learner }}
}

export default GrammarTest