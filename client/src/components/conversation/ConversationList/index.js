/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ConversationListItem from '../ConversationListItem';
import { Cookies } from 'react-cookie';
import { tutorApi, studentApi } from '../../../api';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { changeChatter } from '../../../reducers/app.reducer';

const cookies = new Cookies();

function ConversationList({ chatter, changeChatter }) {
  const currUser = cookies.get('CURR_USER');
  const [conversations, setConversations] = useState([]);
  const [changeCurrChat, setChangeCurrChat] = useState(null);

  const target = currUser.type === 1 ? tutorApi : studentApi;
  useEffect(() => {
    getConversations();
    if (!_.isEmpty(conversations) && _.isEmpty(chatter)) {
      changeChatter(conversations[0]);
    }
  }, [conversations.length]);

  useEffect(() => {}, [changeCurrChat]);

  const getConversations = () => {
    target
      .getListConversation(currUser.email)
      .then(response => {
        let newConversations = response.data.map(result => {
          return {
            photo: result.avatar,
            name: result.fullName,
            text: result.message,
            conversationID: result.conversationID,
            email: result.email
          };
        });
        setConversations([...newConversations]);
      })
      .catch(err => {
        alert('err list converstion' + err);
      });
  };
  const style = {
    display: 'flex',
    flexDirection: 'column'
  };

  const renderListConversation = () => {
    return conversations.map(conversation => (
      <ConversationListItem
        key={conversation.conversationID}
        data={conversation}
        setChangeCurrChat={setChangeCurrChat}
      />
    ));
  };

  if (_.isEmpty(conversations)) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 20 }}>
        No conversation found
      </div>
    );
  }

  return <div style={style}>{renderListConversation()}</div>;
}

const mapStateToProps = state => ({
  chatter: state.appReducer.chatter
});

const mapDispatchToProps = dispatch => ({
  changeChatter: (username, password, type) =>
    dispatch(changeChatter(username, password, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
