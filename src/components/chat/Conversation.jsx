import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import MessageEntry from './MessageEntry.jsx'

const Conversation = (props) => {
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
            user={props.user} />
        )
      })}
      <div style={{ float: 'right' }}>
        <input placeholder='type message' value={props.message} onChange={props.handleMessage} ></input>
        <button onClick={() => { props.sendMessage(props.chat.id) }}>Send</button>
      </div>
    </div>
  )
}

export default Conversation;