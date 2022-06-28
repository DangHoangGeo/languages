import type { NextPage } from 'next'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'

const Kanji: NextPage = () => {
  return (
    <div>
      <Hero/>
      <Section title="Goi" description="N2 Goi">
      </Section>
    </div>
  )
}

export default Kanji