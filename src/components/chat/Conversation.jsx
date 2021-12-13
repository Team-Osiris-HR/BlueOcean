import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import MessageEntry from './MessageEntry.jsx'

const Conversation = (props) => {
  console.log(props);
  return (
    <div>
    <button onClick={() => {props.leaveChat()}} style={{margin: '15px'}}>Go Back</button>
    <Row>
      <Col>{props.chat.itemPhoto}</Col>
      <Col>{props.chat.item}</Col>
    </Row>
    {props.messages.map((message, i) => {
      return (
        <MessageEntry
          key={i}
          index={i}
          messages={message}
          user={props.user} />
      )
    })}
    <div style={{float: 'right'}}>
      <input placeholder='type message'></input>
      <button>Send</button>
    </div>
    </div>
  )
}

export default Conversation;