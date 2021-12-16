import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const MessageEntry = (props) => {
  return (
    <>
      {props.messages.name === props.user ?
        <div className="otherUserMessage" >{props.user}: {props.messages.message}</div>
        :
        <div className="userMessage" style={{textAlign: 'right'}}>{props.messages.message}</div>
      }
    </>
  )
}

export default MessageEntry;