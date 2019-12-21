/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Compose.css';
import { Cookies } from 'react-cookie';
import { chatApi } from '../../../api';
import { saveNewMessage } from '../../../reducers/app.reducer';

const cookies = new Cookies();
function Compose({ saveNewMessage, chatter }) {
  const [message, setMessage] = useState('');
  const currUser = cookies.get('CURR_USER');

  const onFormSubmit = e => {
    e.preventDefault();
    if (message === '') {
      return;
    }

    const newMessage = {
      conversationID: chatter.conversationID, //2
      sender: currUser.type,
      message: message
    };

    chatApi
      .createNewMessage(newMessage)
      .then(res => {
        if (res.returnCode === 1) {
          saveNewMessage({ ...newMessage, timestamp: new Date() });
        }
      })
      .catch(err => {
        alert('err in create new messges: ' + err);
      });

    setMessage('');
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="compose">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="compose-input"
          placeholder="Type Message Here"
        />
        <button type="submit" className="send-button">
          <i className="toolbar-button fa fa-paper-plane" />
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = state => ({
  chatter: state.appReducer.chatter
});

const mapDispatchToProps = dispatch => ({
  saveNewMessage: newMessage => dispatch(saveNewMessage(newMessage))
});

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
