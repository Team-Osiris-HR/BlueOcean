import React from 'react';

const Qa = ({ QAs }) => {
  return (
    <div className="qaContainer">
      <h4>Q&A</h4>
      <div className="qaContainer2">
        {QAs ? QAs.map((qa, index) => {
          return (
            <div className="qaTile" key={index}>
              <h6>{qa.questionText}</h6>
              <p>- {qa.answerText ? qa.answerText : "To be answered"} </p>
            </div>
          );
        }) : null}
      </div>
    </div>
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