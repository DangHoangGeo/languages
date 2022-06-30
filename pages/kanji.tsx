import type { NextPage } from 'next'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'
import {getUserProfile} from '../utils/graphcms'
import {IUser} from '../types/user'
import {LEANERID} from '../utils/constants'

type Props = {
  user: IUser
}
const Kanji: NextPage<Props> = ({user}) => {
  return (
    <div>
      <Hero user={user}/>
      <Section title="Kanji" description="N2 Kanji">
      </Section>
    </div>
  )
}

Kanji.getInitialProps = async({ req }) => {
  const data = await getUserProfile(LEANERID,false)
  return { user: data.learner }
}

export default Kanji