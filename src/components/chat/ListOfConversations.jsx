import React from 'react'
import ConversationEntry from './ConversationEntry.jsx';

const ListOfConversations = (props) => {
  return (
    <>
    <div>INBOX</div>
    {props.chats.map((chat, i) => {
      return (
        <ConversationEntry
          key={i}
          index={i}
          chats={props.chats}
          selectChat={props.selectChat} />
      )
    })}
    </>
  )
}

export default ListOfConversations;