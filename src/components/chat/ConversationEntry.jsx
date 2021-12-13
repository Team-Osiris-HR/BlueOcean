import React from 'react';

const ConversationEntry = (props) => {
  return (
    <div className='conversationEntry' onClick={() => { props.selectChat(props.chats[props.index]) }}>
      <div style={{ marginRight: '15px' }}>{props.chats[props.index].itemPhoto}</div>
      <div style={{ marginRight: '15px' }}>{props.chats[props.index].name},</div>
      <div>{props.chats[props.index].item}</div>
    </div>
  )
}

export default ConversationEntry;