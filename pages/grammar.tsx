import type { NextPage } from 'next'
import * as React from 'react'
import {IQuiz} from '../types/quiz'
import Question from '../components/qa/question'
import {Hero} from '../components/hero/Hero'
import {Section} from '../components/layout/Section'
import Pagination from '@mui/material/Pagination'
import {getAllQuizByLevel} from '../utils/graphcms'
import { LEANERID } from '../utils/constants'

/**
const question = [{ q: "彼はよく遅刻をする________、しばしば欠席もする。",
    as: [{
      a: "ばかりか",
      isCorrect: true
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
      isCorrect: false
    },
    ]
},
{ q: "話はよく聞いているが、一度________会ったことはない。",
    as: [{
      a: "きり",
      isCorrect: false
    },{
      a: "ほど",
      isCorrect: false
    },
    {
      a: "として",
      isCorrect: true
    },
    {
      a: "までして",
      isCorrect: false
    },
    ]
},
{ q: "場所________、まずはいつにするか日程を決めましょう",
    as: [{
      a: "を問わず",
      isCorrect: false
    },{
      a: "もかまわず",
      isCorrect: false
    },
    {
      a: "はさておき",
      isCorrect: true
    },
    {
      a: "にしたら",
      isCorrect: false
    },
    ]
},
{ q: "新入社員の研修________先立って各部署の担当を決めておく必要がある。",
    as: [{
      a: "は",
      isCorrect: false
    },{
      a: "を",
      isCorrect: false
    },
    {
      a: "で",
      isCorrect: false
    },
    {
      a: "に",
      isCorrect: true
    },
    ]
},
]

{ q: "",
    as: [{
      a: "",
      isCorrect: false
    },{
      a: "",
      isCorrect: false
    },
    {
      a: "",
      isCorrect: false
    },
    {
      a: "",
      isCorrect: false
    },
    ]
},
 */

type Props = {
  q: IQuiz[]
}

const Grammar: NextPage<Props> = ({q}) => {
  const [slected, setSelected] = React.useState(1);
  const [isNext, setIsNext] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelected(value);
    setIsNext(true);
  };
  return (
    <div>
      <Hero user="Dang Hoang" email="dang.hoang.geo@gmail.com"/>
      <Section title="N2 grammar testing" description="N2 grammar testing">
        
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <Question next={isNext} question={q[slected-1]}/>
          </div>
          <div className="flex justify-center">
            <Pagination count={q.length} variant="outlined" onChange={handleChange} color="secondary" />
          </div>
        </div>
      </Section>
    </div>
  )
}

Grammar.getInitialProps = async ({ req }) => {
  const data = await getAllQuizByLevel([LEANERID], "N2",false)
  console.log(data.quizzes[1].answers)
  return { q: data.quizzes }
}

export default Grammar