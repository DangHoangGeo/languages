import type { NextPage } from 'next'
import Link from 'next/link'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'
import {getUserProfile} from '../utils/graphcms'
import {IUser} from '../types/user'
import {LEANERID} from '../utils/constants'

type Props = {
  user: IUser
}

const Home: NextPage<Props> = ({user}) => {
  return (
    <div>
      <Hero user={user}/>
      <Section title="Learning" description="Let learn then practice">
        <div className="md:flex grid grid-cols-1 gap-4 justify-center">
          <div className="p-1 flex-1 mx-6 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
              <Link href="/grammar">
                <a  className="block p-6 bg-white sm:p-8 rounded-xl">
                  <div className="mt-8 sm:pr-8">
                    <h5 className="text-xl font-bold text-gray-900">JLPT GRAMMAR QUIZ N2</h5>
                    <p className="mt-2 text-sm text-gray-500">
                    JLPT GRAMMAR QUIZ N2
                    </p>
                  </div>
                </a>
              </Link>
            </div>
            <div className="p-1 flex-1 mx-6 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
              <Link href="/kanji">
                <a className="block p-6 bg-white sm:p-8 rounded-xl">
                  <div className="mt-8 sm:pr-8">
                    <h5 className="text-xl font-bold text-gray-900">JLPT KANJI QUIZ N2</h5>
                    <p className="mt-2 text-sm text-gray-500">
                      JLPT KANJI QUIZ N2
                    </p>
                  </div>
                </a>
              </Link>
            </div>
        </div>
      </Section>
    </div>
  )
}

Home.getInitialProps = async({ req }) => {
  const data = await getUserProfile(LEANERID,false)
  return { user: data.learner }
}

export default Home
