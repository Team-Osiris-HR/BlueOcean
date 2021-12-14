import React from 'react';

const ConversationEntry = (props) => {
  return (
    <div style={{display: 'flex', margin: '15px'}} onClick={() => {props.selectChat(props.chats[props.index].id)}}>
      <img src={props.chats[props.index].photos} alt={props.chats[props.index].title} style={{ maxHeight: '125px', maxWidth: '125px', paddingRight: '15px'}} />
      <div style={{marginRight: '15px'}}>{props.chats[props.index].name},</div>
      <div>{props.chats[props.index].title}</div>
    </div>
  )
}

export default ConversationEntry;