import React from 'react'
import ConversationEntry from './ConversationEntry.jsx';


const ListOfConversations = (props) => {
  return (
    <div className='conversations-container'>
      {props.chats.map((chat, i) => {
        return (
          <ConversationEntry
            key={i}
            index={i}
            chats={props.chats}
            selectChat={props.selectChat} />
        )
      })}
    </div>
  )
}

export default ListOfConversations;