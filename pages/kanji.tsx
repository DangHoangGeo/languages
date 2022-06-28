import type { NextPage } from 'next'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'

const Kanji: NextPage = () => {
  return (
    <div>
      <Hero/>
      <Section title="Kanji" description="N2 Kanji">
      </Section>
    </div>
  )
}

export default Kanji