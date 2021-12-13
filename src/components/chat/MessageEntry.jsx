import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const MessageEntry = (props) => {
  //console.log(props);
  return (
    <>
      <div style={{marginBottom: '10px'}}>
        {props.messages.name === props.user ?
          <div style={{textAlign: 'right', backgroundColor: 'lightGray'}}>{props.messages.message}</div>
          :
          <div style={{backgroundColor: 'ivory'}}>{props.messages.message}</div>
        }
      </div>
    </>
  )
}

export default MessageEntry;