import type { NextPage } from 'next'
import * as React from 'react'
// Import Swiper React components
import Layout from '../../components/layout/Layout'
import {Section} from '../../components/layout/Section'
import {getAllQuizByLevel} from '../../utils/graphcms'
import {IQuiz} from '../../types/quiz'
import {IUser} from '../../types/user'
import { LEANERID } from '../../utils/constants'


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
    <Layout>
      <Section title="N2 grammar testing" description="N2 grammar testing">
            
      </Section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await getAllQuizByLevel(LEANERID, "N2",false)
  return { props:{quizes: data.quizzes, user: data.learner }}
}

export default Grammar