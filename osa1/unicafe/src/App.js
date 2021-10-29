import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => (
  <div>
    <p>good {good}</p>
    <p>neutral {neutral} </p>
    <p>bad {bad} </p>
  </div>
)
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
      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
