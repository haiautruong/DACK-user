import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Message from '../Message';
import moment from 'moment';
import Toolbar from '../Toolbar';
import './MessageList.css';
import { Cookies } from 'react-cookie';
import { chatApi } from '../../../api';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

const cookies = new Cookies();
function MessageList(props) {
  const [messages, setMessages] = useState([]);
  const currUser = cookies.get('CURR_USER');

  const MY_USER_ID = currUser.type;

  useEffect(() => {
    getMessages();
  });

  useEffect(() => {
    const scrollHeight = document.getElementById('scrollable').scrollHeight;
    document.getElementById('scrollable').scrollTop = scrollHeight;
  }, [messages]);

  const getMessages = () => {
    if (props.chatter) {
      const teacherEmail =
        currUser.type === 1 ? currUser.email : props.chatter.email;
      const studentEmail =
        currUser.type === 2 ? currUser.email : props.chatter.email;

      chatApi.getConversation(teacherEmail, studentEmail).then(res => {
        if (res.returnCode === 1) {
          setMessages([..._.cloneDeep(res.data.messages)]);
        }
      });
    }
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.sender === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.sender === current.sender;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.sender === current.sender;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div>
      <Toolbar title={props.chatter && props.chatter.email} />
      <div>
        <div className="container-message">{renderMessages()}</div>
      </div>
    </div>
  );
}

MessageList.propTypes = {
  newMessage: PropTypes.object,
  chatter: PropTypes.object
};

const mapStateToProps = state => ({
  newMessage: state.appReducer.newMessage,
  chatter: state.appReducer.chatter
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
