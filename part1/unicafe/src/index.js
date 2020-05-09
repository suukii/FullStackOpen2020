import React, { useState } from 'react';
import ReactDOM from 'react-dom'

const Statistic = ({label, value}) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)
const Statistics = ({data}) => {
  const { good, neutral, bad } = data
  const all = good + neutral + bad
  const average = all === 0 ? 0 : ((good - bad) / all)
  const positive = all === 0 ? 0 : (good / all) * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <h3>statistics</h3>
        <table>
          <tbody>
            <Statistic label="good" value={good} />
            <Statistic label="neutral" value={neutral} />
            <Statistic label="bad" value={bad} />
            <Statistic label="all" value={all} />
            <Statistic label="average" value={average} />
            <Statistic label="positive" value={positive + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }
}

const Button = ({text, onClick}) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedbackClick = type => {
    switch (type) {
      case 'good':
        return () => setGood(good + 1)
      case 'bad':
        return () => setBad(bad + 1)
      case 'neutral':
        return () => setNeutral(neutral + 1)

      default:
        return () => {}
    }
  }

  return (
    <div>
      <h3>give feedback</h3>
      <Button text="good" onClick={handleFeedbackClick('good')} />
      <Button text="neutral" onClick={handleFeedbackClick('neutral')} />
      <Button text="bad" onClick={handleFeedbackClick('bad')} />
      <Statistics data={{good, bad, neutral}} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)