import type { NextPage } from 'next'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'

const Grammar: NextPage = () => {
  return (
    <div>
      <Hero/>
      <Section title="N2 grammar" description="N2 grammar">
      </Section>
    </div>
  )
}

export default Grammar
