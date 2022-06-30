import type { NextPage } from 'next'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'
import {getUserProfile} from '../utils/graphcms'
import {IUser} from '../types/user'
import {LEANERID} from '../utils/constants'

type Props = {
  user: IUser
}
const Vocabulary: NextPage<Props> = ({user}) => {
  return (
    <div>
      <Hero user={user}/>
      <Section title="Vocabulary" description="New Vocabulary daily">
      </Section>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await getUserProfile(LEANERID,false)
  return { props:{ user: data.learner }}
}

export default Vocabulary