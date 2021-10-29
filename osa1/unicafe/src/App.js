import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Average = ({ good, neutral, bad }) => {
  const avg = (good - bad) / (good + neutral + bad)
  return (
    <div>
      average {avg}
    </div>
  )
}

const Positive = ({ good, neutral, bad }) => {

  const positive = good / (good + neutral + bad) * 100 + "%"
  return (
    <div>
      positive {positive}
    </div>
  )
}


const StatisticLine = ({ text, value }) => (
  <div> {text} {value}</div>
)
const All = ({good, neutral, bad})=>(
  <div>all {good+ neutral +bad} </div>
)


const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } return (
    <div>
      <h2>statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <All good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <div>
          <Button handleClick={() => setGood(good + 1)} text='good' />
          <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
          <Button handleClick={() => setBad(bad + 1)} text='bad' />
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
