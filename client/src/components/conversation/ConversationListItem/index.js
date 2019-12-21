/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import shave from 'shave';
import './ConversationListItem.css';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { changeChatter } from '../../../reducers/app.reducer';

function ConversationListItem(props) {
  const { photo, name, text, conversationID } = props.data;

  useEffect(() => {
    shave('.conversation-snippet', 20);
  });

  useEffect(() => {
    if (checkChoose(props.data)) {
      document.getElementById(conversationID).classList.add('choose');
    } else {
      document.getElementById(conversationID).classList.remove('choose');
    }
  }, [props.chatter]);

  const handleChooseItem = () => {
    props.changeChatter(props.data);
  };

  const checkChoose = conversation => {
    if (
      props.chatter &&
      _.isEqual(props.chatter.conversationID, conversation.conversationID)
    ) {
      return true;
    }

    return false;
  };

  return (
    <div
      id={conversationID}
      className="conversation-list-item "
      onClick={handleChooseItem}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">
          {props.newMessage.message !== '' ? props.newMessage.message : text}
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  chatter: state.appReducer.chatter,
  newMessage: state.appReducer.newMessage
});

const mapDispatchToProps = dispatch => ({
  changeChatter: (username, password, type) =>
    dispatch(changeChatter(username, password, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationListItem);
