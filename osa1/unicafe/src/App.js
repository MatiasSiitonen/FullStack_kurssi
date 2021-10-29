import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Avarage = ({ good, neutral, bad }) => {
  const avg = (good + neutral + bad) / 3
  return (
    <div>
      avarage {avg}
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
      <p>good {good}</p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {good + neutral + bad}</p>
      <Avarage good={good} neutral={neutral} bad={bad} />
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
