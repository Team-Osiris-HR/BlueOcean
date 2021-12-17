import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const MessageEntry = (props) => {
  return (
    <div className='message'>
      {props.messages.name === props.user ?
      <div className="otherUserMessage" >{props.messages.message}</div>
      :
      <div className="userMessage">{props.messages.message}</div>
      }
    </div>
  )
}

export default MessageEntry;