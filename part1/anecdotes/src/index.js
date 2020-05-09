import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({text, onClick}) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdote = ({anecdote, vote}) => (
  <div>
    <h2>Anecdote of the day</h2>
    <p>{anecdote}</p>
    <p>has {vote} votes</p>
  </div>
)

const TopAnecdote = ({anecdotes, points}) => {
  const getMostVotedAnecdote = () => {
    let index = -1
    let max = -1
    for (let i = 0; i < points.length; i++) {
      if (points[i] > max) {
        index = i
        max = points[i]
      }
    }
    return anecdotes[index]
  }

  return (
    <div>
    <h2>Anecdote with most votes</h2>
    <p>{getMostVotedAnecdote()}</p>
  </div>
  )
}

const App = (props) => {
  const { anecdotes } = props
  const anecdotesTotal = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotesTotal).fill(0))
  
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)

  const handleNextClick = () => {
    let randomIndex = getRandom(0, anecdotesTotal)
    while (randomIndex === selected) {
      randomIndex = getRandom(0, anecdotesTotal)
    }
    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} vote={points[selected]} />
      <Button text="vote" onClick={handleVoteClick} />
      <Button text="next anecdote" onClick={handleNextClick} />
      <TopAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)