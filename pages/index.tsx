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
      <Section title="Learning" description="Let learn then practice">
        <div className="lg:flex lg:space-x-12 space-y-6">
          <div className="p-1 flex-initial w-64 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
              <a className="block p-6 bg-white sm:p-8 rounded-xl" href="/vocabulary">
                <div className="mt-16 sm:pr-8">
                  <h5 className="text-xl font-bold text-gray-900">Science of Chemistry</h5>
                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                  </p>
                </div>
              </a>
            </div>
            <div className="p-1 flex-initial w-64 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
              <a className="block p-6 bg-white sm:p-8 rounded-xl" href="/kanji">
                <div className="mt-16 sm:pr-8">
                  <h5 className="text-xl font-bold text-gray-900">Science of Chemistry</h5>
                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                  </p>
                </div>
              </a>
            </div>
        </div>
      </Section>
    </div>
  )
}

export default Home
