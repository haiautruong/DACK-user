import React, {useState} from 'react';
import './Compose.css';

export default function Compose() {
  const [message, setMessage] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    if (message === '')
    {return;}
    //sendMessage(message);
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
          <i className="toolbar-button fa fa-paper-plane"/>
        </button>
      </div>
    </form>
  );
}
