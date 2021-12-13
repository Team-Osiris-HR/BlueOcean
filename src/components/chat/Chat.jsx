import React from 'react';
import { v4 as uuidv4 } from 'uuid'
import ListOfConversations from './ListOfConversations.jsx';
import Conversation from './Conversation.jsx';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { io } from 'socket.io-client';
const socket = io();

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: `you have connected with id:`,
      user: this.props.user.name,
      chatSelectedStatus: false,
      chatSelected: this.props.itemObj,
      listOfChats: [{name: 'kim', title: 'fridge', userPhoto: 'userPhoto', photos: 'photos'},
                    {name: 'manny', title: 'grapes', userPhoto: 'userPhoto', photos: 'photos'},
                    {name: 'cam', title: 'car', userPhoto: 'userPhoto', photos: 'photos'},
                    {name: 'phil', title: 'guitar', userPhoto: 'userPhoto', photos: 'photos'},
                    {name: 'matthew', title: 'weights', userPhoto: 'userPhoto', photos: 'photos'},
                    {name: 'alex', title: 'stars', userPhoto: 'userPhoto', photos: 'photos'}],
      messages: [{name: this.props.user.name, message: 'this is s a fake conversation', time: 7},
                 {name: 'otherPerson', message: 'hey how are you?', time: 6},
                 {name: this.props.user.name, message: 'Was goody', time: 5},
                 {name: 'otherPerson', message: 'Are you able to drop off the item?', time: 4},
                 {name: 'otherPerson', message: 'I would like to get it by noon', time: 3},
                 {name: this.props.user.name, message: 'yeah I can do that!', time: 2},
                 {name: 'otherPerson', message: 'Awesome see you then', time: 1}],
      firstMessage: false
      }
    this.leaveChat = this.leaveChat.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.testmessage = this.testmessage.bind(this);
  }

  getAllChats = () => {
    // database query that returns all active chats. look at object above
    axios.get('/api/chatrooms/mychats')
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  checkIfChatExists = (user1, user2) => {
    // return roomNumber if true, false if not
  }

  newChat = (user1, user2) => {
    // create new hash for room number
    var roomNumber = uuidv4();
    console.log(roomNumber);
    // create new database entry {roomNumber: hash, user1: name, user2:name}
    axios.post('/api/chatrooms/newroom', {noomHash: roomNumber, postId: this.props.itemObj.id})
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getOldChat = (roomNumber) => {
    // query into the table and return all the messages.
  }

  startChat = (user1, user2) => {
    var exists = this.checkIfChatExists(user1, user2)
    if  (!exists) {
      this.newChat();
    } else {
      getOldChat(exists);
    }
  }

  selectChat = (chat) => {
    this.setState({chatSelected: chat, chatSelectedStatus: true});
  }

  leaveChat = () => {
    this.newChat()
    this.props.clearMessageStatus();
    this.setState({chatSelected: null, chatSelectedStatus: false});
  }

  testmessage = () => {
    // if logged in
      // send message over socketio
      socket.emit('something', this.state.connection);
        // render with setState
      // send message to db
    // if not logged in
      // send message to db
      // render with setState
  }

  render () {
    console.log(this.props);
    return (
      <Container>
        <Col>
          {!this.state.chatSelectedStatus && !this.props.newMessageStatus ?
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
            user={this.props.user.name}
            chat={this.state.chatSelected}
            messages={this.state.messages}
            firstMessage={this.state.firstMessage}
            />
          </>
          }
        </Col>
      </Container>
    );
  }
}

export default Chat;