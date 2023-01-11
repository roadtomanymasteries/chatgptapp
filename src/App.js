import './App.css';
import './normal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  console.log(process.env.REACT_APP_SERVER_API);

  const handleNewChat = () => {
    setChatLog([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: 'me', message: input }];
    setInput('');
    setChatLog(chatLogNew);
    const messages = chatLogNew.map((message) => message.message).join('\n');
    const response = await fetch(process.env.REACT_APP_SERVER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messages,
      }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: 'gpt', message: data.message }]);
  };

  return (
    <div className="App">
      <aside className="sidebox">
        <div className="newchatBtn" onClick={handleNewChat}>
          <span>+</span>
          New chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-text-box"
            ></input>
          </form>
          <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
        </div>
      </section>
    </div>
  );
}
const ChatMessage = ({ message }) => {
  return (
    <div className="me-chat-area">
      <div className="me-avatar"></div>
      <div className="me-text-area">{message.message}</div>
    </div>
  );
};

export default App;
