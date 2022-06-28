import type { NextPage } from 'next'
import Head from 'next/head'
import Question from '../components/qa/question'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'

const question = { q: "彼はよく遅刻をする________、しばしば欠席もする。",
    as: [{
      a: "ばかりか",
      isCorrect: false
    },{
      a: "ばかりに",
      isCorrect: false
    },
    {
      a: "ばかりを",
      isCorrect: false
    },
    {
      a: "ばかりで",
      isCorrect: true
    },
    ]
}

const Home: NextPage = () => {
  return (
    <div>
      <Hero/>
      <Section title="N2 grammar testing" description="N2 grammar testing">
        <Question question={question}/>
      </Section>
    </div>
  )
}

export default Home
