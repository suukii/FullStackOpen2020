import React from 'react';

const Persons = ({list, onDelete}) => (
  <div>
    {list.map(person => (
      <h4 key={person.name}>
        {person.name} {person.number} 
        <button onClick={() => onDelete(person)}>delete</button>
      </h4>
    ))}
  </div>
)

export default Persons