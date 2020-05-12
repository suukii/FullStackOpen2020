import React from 'react';
import Input from './Input';

const PersonForm = ({
    data: {
      newName,
      newNumber,
      handleNameChange,
      handleNumberChange,
      onSubmit,
    }
  }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <Input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <Input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm