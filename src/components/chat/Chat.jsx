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
      listOfChats: [],
      messages: [],
      firstMessage: false
    }
    this.leaveChat = this.leaveChat.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getAllChats = this.getAllChats.bind(this);
  }

  componentDidMount() {
    this.getAllChats();
  }

  getAllChats = () => {
    // database query that returns all active chats. look at object above
    axios.get('/api/chatrooms/mychats')
      .then((result) => {
        console.log('chats', result.data);
        this.setState({ listOfChats: result.data })
        console.log(this.state.listOfChats)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  checkIfChatExists = (user1, user2) => {
    // return roomNumber if true, false if not
    var listOfIds = [];
    this.state.listOfChats.map(chat => {
      listOfIds.push(chat.PostId)
    })

    if (listOfIds.includes(this.props.itemObj.id)) {

    }
  }

  newChat = (user1, user2) => {
    var roomNumber = uuidv4();
    axios.post('/api/chatrooms/newroom', { roomHash: roomNumber, postId: this.props.itemObj.id })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getOldChat = (roomNumber) => {
    axios.get(`/api/chatrooms/${roomNumber}/messages`)
      .then((result) => {
        this.setState({ messages: result.data })
        console.log(this.state.chatSelected);
      })
      .then((result) => {
        this.setState({ chatSelectedStatus: true })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  startChat = (user1, user2) => {
    var exists = this.checkIfChatExists(user1, user2)
    if (!exists) {
      this.newChat();
    } else {
      getOldChat(exists);
    }
  }

  selectChat = (id) => {
    this.getOldChat(id);
  }

  leaveChat = () => {
    this.props.clearMessageStatus();
    this.setState({ chatSelected: null, chatSelectedStatus: false });
  }

  sendMessage = (roomId) => {
    // if logged in
    //   send message over socketio
    //socket.emit('something', this.state.connection);
    // render with setState
    // send message to db
    // if not logged in
    // send message to db
    // render with setState
    axios.post(`/api/chatrooms/${roomId}/messages/create`, { message: 'this is my test 7' })
      .then((result) => {
        console.log('You sent a message')
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <Container>
        <Col>
          {!this.state.chatSelectedStatus && !this.props.newMessageStatus ?
            <>
              <Button type="button" onClick={() => { this.props.setRenderState('feed') }}>Back</Button>
              <ListOfConversations
                chats={this.state.listOfChats}
                selectChat={this.selectChat} />
            </>
            :
            <>
              <Button onClick={() => { this.leaveChat() }} >Back</Button>
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