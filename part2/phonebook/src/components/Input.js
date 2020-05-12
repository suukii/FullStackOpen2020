import React from 'react'

const Input = ({value, onChange, type='text'}) => (
  <input value={value} type={type} onChange={onChange} />
)

export default Input