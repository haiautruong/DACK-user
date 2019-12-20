import React, {useEffect, useState} from 'react';
import ConversationListItem from '../ConversationListItem';
import axios from 'axios';

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations();
  },[]);

  const getConversations = () => {
    axios.get('https://randomuser.me/api/?results=20').then(response => {
      let newConversations = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text: 'Hello world! This is a long message that needs to be truncated.'
        };
      });
      setConversations([...conversations, ...newConversations]);
    });
  };
  const style =  {
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={style}>
      {
        conversations.map(conversation =>
          <ConversationListItem
            key={conversation.name}
            data={conversation}
          />
        )
      }
    </div>
  );
}
