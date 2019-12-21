/* eslint-disable react/prop-types */
import React from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import Compose from '../Compose';
import './Messenger.css';
import { connect } from 'react-redux';

function Messenger({ chatter }) {
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList />
      </div>

      <div className="scrollable content" id="scrollable">
        {chatter && <MessageList />}
      </div>
      <Compose />
    </div>
  );
}

const mapStateToProps = state => ({
  chatter: state.appReducer.chatter
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
