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
      listOfChats: this.props.listOfChats,
      messages: [],
      message: '',
      firstMessageStatus: false,
      newRoom: null
    }
    this.leaveChat = this.leaveChat.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.getOldChat = this.getOldChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount () {
      this.checkFirstTimeMessage();
  }

  checkFirstTimeMessage () {
    var ids = [];
      this.state.listOfChats.map(chat => {
        ids.push(chat.postId)
      })
      if(this.state.chatSelected) {
        if (!ids.includes(this.state.chatSelected.id)){
          this.setState({ firstMessageStatus: true, chatSelectedStatus: true })
        } else {
          this.selectChat(this.state.chatSelected.id, this.state.chatSelected)
        }
      }
  }

  newChat = (postId) => {
    var roomNumber = uuidv4();
    axios.post('/api/chatrooms/newroom', { roomHash: roomNumber, postId: postId })
      .then((result) => {
        console.log('this is the return for room creation', result.data);
        this.setState({ newRoom: result.data._id})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getOldChat = (roomNumber) => {
    axios.get(`/api/chatrooms/${roomNumber}/messages`)
      .then((result) => {
        this.setState({ messages: result.data })
      })
      .then((result) => {
        this.setState({ chatSelectedStatus: true })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  sendMessage = (roomId) => {
    if (this.state.firstMessageStatus) {
      this.newChat(this.state.chatSelected.id)
      setTimeout(()=>{
        axios.post(`/api/chatrooms/${this.state.newRoom}/messages/create`, { message: this.state.message })
        .then((result) => {
          console.log('You sent a message')
        })
        .catch((error) => {
          console.log(error);
        })
        this.setState({ message: '' })
      }, 500)
    } else {
      axios.post(`/api/chatrooms/${roomId}/messages/create`, { message: this.state.message })
      .then((result) => {
        console.log('You sent a message')
      })
      .catch((error) => {
        console.log(error);
      })
      this.setState({ message: '' })
    }
  }

  selectChat = (id, chat) => {
    this.setState({ chatSelected: chat })
    this.getOldChat(id, chat);
  }

  leaveChat = () => {
    this.props.clearMessageStatus();
    this.setState({ chatSelected: null, chatSelectedStatus: false, firstMessageStatus: false });
  }

  handleMessage = (e) => {
    this.setState({ message: e.target.value })
  }


  render() {
    console.log(this.state.chatSelected);
    
    return (
      <Container>
        <Col>
          {!this.state.chatSelectedStatus ?
            <>
              <Button type="button" onClick={() => { this.props.setRenderState('feed') }}>Back</Button>
              <ListOfConversations
                chats={this.state.listOfChats}
                selectChat={this.selectChat} />
            </>
            :
            <>
              <Button onClick={() => { this.leaveChat() }} > Back </Button>
              <Conversation
                user={this.props.user.name}
                message={this.state.message}
                chat={this.state.chatSelected}
                messages={this.state.messages}
                sendMessage={this.sendMessage}
                handleMessage={this.handleMessage}
              />
            </>
          }
        </Col>
      </Container>
    );
  }
}

export default Chat;