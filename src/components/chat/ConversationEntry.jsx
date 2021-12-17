import React from 'react';

const ConversationEntry = (props) => {
  return (
    <div className='convo-entry' onClick={() => { props.selectChat(props.chats[props.index].chatroomId, props.chats[props.index]) }}>
      <div className='picture-container'>
        {props.chats[props.index].photos.length !== 0 ?
        <img className='item-picture' src={props.chats[props.index].photos} />
        :
        <img className='item-picture' src={'https://www.indexdirect.ie/images/ownproducts/noimage.jpg'} />
        }
      </div>

      <div className='poster-name-container'>
        <div className='poster-name'>{props.chats[props.index].name}</div>
      </div>

      <div className='post-title-container'>
        <div className='post-title'>{props.chats[props.index].title}</div>
      </div>
    </div>
  )
}

export default ConversationEntry;