import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import MessageEntry from './MessageEntry.jsx'

const Conversation = (props) => {
  var messageObj = {message: props.message, time: Date.now(), chatroom: props.chat.chatroomId, name: props.user}
  return (
    <div>
      <Row>
        <Col>{props.chat.title}</Col>
      </Row>
      {props.messages.map((message, i) => {
        return (
          <MessageEntry
            key={i}
            index={i}
            messages={message}
            user={props.chat.name} />
        )
      })}
      <div style={{ float: 'right' }}>
        <input placeholder='type message' value={props.message} onChange={props.handleMessage} ></input>
        <button onClick={() => { props.sendMessage(props.chat.chatroomId, messageObj) }}>Send</button>
      </div>
    </div>
  )
}

export default Conversation;