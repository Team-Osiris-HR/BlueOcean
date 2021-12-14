import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const MessageEntry = (props) => {
  console.log('props', props);
  return (
    <>
      {props.messages.name === props.user ?
        <div className="userMessage"
        >{props.user} : {props.messages.message}</div>
        :
        <div className="otherUserMessage" >otherUser : {props.messages.message} </div>
      }
    </>
  )
}

export default MessageEntry;