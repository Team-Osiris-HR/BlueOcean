import React from 'react';
import ListOfConversations from './ListOfConversations.jsx';
import Conversation from './Conversation.jsx';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { io } from 'socket.io-client';
const socket = io();

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: `you have connected with id:`,
      user: 'mitch',
      chatSelectedStatus: false,
      chatSelected: null,
      listOfChats: [{name: 'kim', item: 'fridge', userPhoto: 'userPhoto', itemPhoto: 'itemPhoto'},
                    {name: 'manny', item: 'grapes', userPhoto: 'userPhoto', itemPhoto: 'itemPhoto'},
                    {name: 'cam', item: 'car', userPhoto: 'userPhoto', itemPhoto: 'itemPhoto'},
                    {name: 'phil', item: 'guitar', userPhoto: 'userPhoto', itemPhoto: 'itemPhoto'},
                    {name: 'matthew', item: 'weights', userPhoto: 'userPhoto', itemPhoto: 'itemPhoto'},
                    {name: 'alex', item: 'stars', userPhoto: 'userPhoto', itemPhoto: 'itemPhoto'}],
      messages: [{name: 'mitch', message: 'this is s a fake conversation', time: 7},
                 {name: 'otherPerson', message: 'hey how are you?', time: 6},
                 {name: 'mitch', message: 'Was goody', time: 5},
                 {name: 'otherPerson', message: 'Are you able to drop off the item?', time: 4},
                 {name: 'otherPerson', message: 'I would like to get it by noon', time: 3},
                 {name: 'mitch', message: 'yeah I can do that!', time: 2},
                 {name: 'otherPerson', message: 'Awesome see you then', time: 1}],
    }
    this.leaveChat = this.leaveChat.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.testmessage = this.testmessage.bind(this);
  }

  selectChat = (chat) => {
    this.setState({chatSelected: chat, chatSelectedStatus: true});
  }

  leaveChat = () => {
    this.setState({chatSelected: null, chatSelectedStatus: false});
  }

  testmessage = () => {
    socket.emit('something', this.state.connection);
  }

  render () {
    console.log(this.props);
    return (
      <Container>
        <Col>
          {!this.state.chatSelectedStatus ?
          <>
          <Button type="button" onClick={() => {this.props.setRenderState('feed')}}>Back</Button>
          <ListOfConversations
            chats={this.state.listOfChats}
            selectChat={this.selectChat} />
          </>
          :
          <>
          <Button onClick={() => {this.leaveChat()}} >Back</Button>
          <Conversation
            user={this.state.user}
            chat={this.state.chatSelected}
            messages={this.state.messages} />
          </>
          }
        </Col>
      </Container>
    );
  }
}

export default Chat;