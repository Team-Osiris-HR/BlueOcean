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
      newRoom: null,
      ioRoom: null,
    }
    this.leaveChat = this.leaveChat.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.getOldChat = this.getOldChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount () {
    const socket = io();
    this.checkFirstTimeMessage();
    socket.on('receive', messageObj => {
      var newArray = this.state.messages
      newArray.push(messageObj)
      console.log('before', this.state.messages)
      setTimeout(() => {
        this.setState({messages: newArray})
        console.log('after', this.state.messages)
      }, 100)
    })
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

  sendMessage = (roomId, messageObj) => {
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
      socket.emit('send', messageObj, roomId)
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
    socket.emit('joinRoom', id)
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