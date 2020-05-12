import React from 'react';

const Notification = ({message}) => {
  if (!message.message) {
    return null
  }
  else {
    return (
      <div className={`message ${message.type}`}>{message.message}</div>
    )
  }
}

export default Notification