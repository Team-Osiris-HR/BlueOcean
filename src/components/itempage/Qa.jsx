import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyVerticallyCenteredModal from './QaModal.jsx';

const Qa = ({ QAs, donor, answerClicked }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState('');
  return (
    <div className="qaContainer">
      <h4>Q&A</h4>
      <div className="qaContainer2">
        {QAs ? QAs.map((qa, index) => {
          return (
            <div className="qaTile" key={index}>
              <h6>{qa.questionText}</h6>
              <p>- {qa.answerText ? qa.answerText : donor ? <>
                <Button variant="secondary" onClick={() => { setModalShow(true); setCurrentQuestion(qa.questionText) }}>
                  Answer
                </Button>

              </> : "To be answered"} </p>
            </div>
          );
        }) : null}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          qa={React.useState(currentQuestion)}
        />
      </div>
    </div >
  );
}

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           {props.qa}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Your Answer</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

export default Qa;


/*
<div className="qaContainer">
            <h4>Q&A</h4>
            <div className="qaTile">
              <h6>{this.state.postData.qa[0].question}</h6>
              <p>- {this.state.postData.qa[0].answer}</p>
            </div>
            <div className="qaTile">
              <h6>{this.state.postData.qa[1].question}</h6>
              <p>- {this.state.postData.qa[1].answer}</p>
            </div>
          </div>
*/