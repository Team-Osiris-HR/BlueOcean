import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import MessageEntry from './MessageEntry.jsx'

const Conversation = (props) => {
  var messageObj = { message: props.message, time: Date.now(), chatroom: props.chat.chatroomId, name: props.user }
  return (
    <div className='message-table'>
      <div className='message-container'>
        {props.messages.map((message, i) => {
          return (
            <MessageEntry
              key={i}
              index={i}
              messages={message}
              user={props.chat.name} />
          )
        })}
      </div>
      <div className='user-input'>
        <div className="message-input-container">
          <input className='message-input' placeholder='type message' value={props.message} onChange={props.handleMessage} ></input>
        </div>
        <div className='send-button-container'>
          <button className='send-button' onClick={() => { props.sendMessage(props.chat.chatroomId, messageObj) }}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Conversation;