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
import ChatHeader from './ChatHeader.jsx'
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
  componentDidMount() {
    this.socket = io();
    this.checkFirstTimeMessage();
    this.socket.on('receive', messageObj => {
      console.log('we are here')
      var newArray = this.state.messages.slice();
      newArray.push(messageObj)
      this.setState({ messages: newArray })
      console.log('after', newArray);
    })
  }
  checkFirstTimeMessage() {
    var ids = [];
    this.state.listOfChats.map(chat => {
      ids.push(chat.postId)
    })
    if (this.state.chatSelected) {
      if (!ids.includes(this.state.chatSelected.id)) {
        console.log('test', this.state.chatSelected)
        console.log('test2', Object.keys(this.state.chatSelected).length > 0)
        if (Object.keys(this.state.chatSelected).length > 0) {
          this.setState({ firstMessageStatus: true, chatSelectedStatus: true })
        }
      } else {
        this.selectChat(this.state.chatSelected.id, this.state.chatSelected)
      }
    }
  }
  newChat = (postId) => {
    var roomNumber = uuidv4();
    axios.post('/api/chatrooms/newroom', { roomHash: roomNumber, postId: postId })
      .then((result) => {
        this.setState({ newRoom: result.data._id })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  getOldChat = (roomNumber) => {
    axios.get(`/api/chatrooms/${roomNumber}/messages`)
      .then((result) => {
        console.log(result.data)
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
      this.props.getAllChats();
      setTimeout(() => {
        axios.post(`/api/chatrooms/${this.state.newRoom}/messages/create`, { message: this.state.message })
          .then((result) => {
            console.log('You sent a message')
            var newChat = {
              chatroomId: this.state.newRoom,
              donorId: null,
              name: this.state.chatSelected.donor,
              photos: this.state.chatSelected.photos[0],
              postId: this.state.chatSelected.id,
              title: this.state.chatSelected.title,
              userPhoto: null,
            }
            var newArray = this.state.listOfChats.slice();
            newArray.push(newChat);
            this.setState({ listOfChats: newArray })
            this.leaveChat();
          })
          .catch((error) => {
            console.log(error);
          })
        this.setState({ message: '' })
      }, 200)
    } else {
      this.socket.emit('send', messageObj, roomId)
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
    this.socket.emit('joinRoom', id)
    this.setState({ chatSelected: chat })
    this.getOldChat(id, chat);
  }
  leaveChat = () => {
    this.props.clearMessageStatus();
    this.props.getAllChats();
    this.setState({ chatSelected: null, chatSelectedStatus: false, firstMessageStatus: false });
  }
  handleMessage = (e) => {
    this.setState({ message: e.target.value })
  }
  render() {
    return (
          <>
          {!this.state.chatSelectedStatus ?
          <>
            <ChatHeader setRenderState={this.props.setRenderState} chatSelectedStatus={this.state.chatSelectedStatus} />
            <Container>
              <Col>
              <ListOfConversations
                chats={this.state.listOfChats}
                selectChat={this.selectChat} />
              </Col>
            </Container>
            </>
            :
            <>
            <ChatHeader leaveChat={this.leaveChat} chatSelectedStatus={this.state.chatSelectedStatus} />
            <Container>
              <Col>
              <Conversation
                user={this.props.user.name}
                message={this.state.message}
                chat={this.state.chatSelected}
                messages={this.state.messages}
                sendMessage={this.sendMessage}
                handleMessage={this.handleMessage}
                />
              </Col>
            </Container>
            </>
              }
          </>
    );
  }
}
export default Chat;