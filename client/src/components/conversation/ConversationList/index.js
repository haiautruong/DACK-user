import React, { useEffect, useState } from 'react';
import ConversationListItem from '../ConversationListItem';
import { Cookies } from 'react-cookie';
import { tutorApi, studentApi } from '../../../api';
import * as _ from 'lodash';

const cookies = new Cookies();

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const currUser = cookies.get('CURR_USER');
  const target = currUser.type === 1 ? tutorApi : studentApi;
  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = () => {
    target
      .getListConversation(currUser.email)
      .then(response => {
        let newConversations = response.data.map(result => {
          return {
            photo: result.avatar,
            name: result.fullName,
            text: result.message,
            conversationID: result.conversationID
          };
        });
        setConversations([...conversations, ...newConversations]);
      })
      .catch(err => {
        alert('err list converstion', err);
      });
  };
  const style = {
    display: 'flex',
    flexDirection: 'column'
  };

  if (_.isEmpty(conversations)) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 20 }}>
        No conversation found
      </div>
    );
  }

  return (
    <div style={style}>
      {conversations.map(conversation => (
        <ConversationListItem key={conversation.name} data={conversation} />
      ))}
    </div>
  );
}
