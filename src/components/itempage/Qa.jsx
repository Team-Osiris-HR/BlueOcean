import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';

const Qa = ({ QAs, donor, answerClicked, answer, answerChange, submitAnswer }) => {
  const [show, setShow] = useState(false);
  const [cQuesiton, setCQuestion] = useState('');
  const [cAnswer, setCAnswer] = useState('');
  const [bucket, setBucket] = useState([]);

  const [shownBucket, setShownBucket] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setShownBucket(bucket[index]);
    setShow(true);
  }
  const updateQuestion = (e) => setCQuestion(e.target.value);
  const updateAnswer = (e) => setCAnswer(e.target.value);
  useEffect(() => {
    if (QAs === undefined) {
      return
    } else {
      var arr = [];
      QAs.forEach((qa, index) => {
        arr.push(qa.questionText);
      })
      setBucket(arr);
    }
  }, [QAs]);

  return (
    <div className="qaContainer">
      <h4>Q&A</h4>
      <div className="qaContainer2">
        {QAs ? QAs.map((qa, index) => {
          // setBucket([...bucket, qa.questionText]);
          return (
            <div className="qaTile" key={index}>
              <h6>{qa.questionText}</h6>
              <p>- {qa.answerText ? qa.answerText : donor ? <>
                <Button variant="secondary" onClick={() => handleShow(index)} >
                  Answer
                </Button>

              </> : "To be answered"} </p>
            </div>
          );
        }) : null}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{shownBucket}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div >
  );
}

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