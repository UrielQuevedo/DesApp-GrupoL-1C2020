import React from 'react';
import '../Styles/MessagePage.css';

const MessagePage = ({ errorNumnber, title }) => {
  return (
    <div className="message-container">
      { errorNumnber && <div className="message" title={errorNumnber}>{errorNumnber}</div> }
      <div className="message" title={title}>{title}</div>
    </div>
  );
}

export default MessagePage;