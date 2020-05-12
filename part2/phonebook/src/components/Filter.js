import React from 'react'
import Input from './Input';

const Filter = ({filter, onChange}) => (
  <div>
    filter shown with <Input value={filter} onChange={onChange} />
  </div>
)

export default Filter