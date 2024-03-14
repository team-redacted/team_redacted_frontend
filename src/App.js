import axios from 'axios';
import { useState, useEffect } from 'react';

import Message from './components/Message';

import './App.css';

const host = 'https://main--redactedclueless.netlify.app/.netlify/functions/server/';

const postMessage = async (user, message) => {
  await fetch(`${host}/messages`, {
  method: 'POST',
  body: JSON.stringify({
     content: message,
     username: user,
  }),
  headers: {
     'Content-type': 'application/json; charset=UTF-8',
  },
  })
  .then((response) => response.json())
  .catch((err) => {
     console.log(err.message);
  });
  };

const deleteMessage = async (id) => {
  await fetch(`${host}/messages/${id}`, {
     method: 'DELETE',
  })
  .then((response) => response.json())
  .catch((err) => {
     console.log(err.message);
  });
  };


function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);


  const submitMessage = () => {
    if (username.length > 0 && message.length > 0) {
      console.log(`${username}: ${message}`);
      postMessage(username, message);
      setMessage('');
    } else if (username.length === 0) {
      alert("Please set a username.");
    } else {
      alert("Please write a message.")
    }
  }

  const getMessages = () => {
    axios.get(`${host}/messages`).then((data) => {
      setMessages(data.data);
      return data.data;
    })
  }

  useEffect(getMessages, [count]);
  useEffect(() => {
    const interval = setInterval(() => {
        setCount(count + 1);
    }, 500);

    return () => clearInterval(interval);
}, [count]);

  let messageItems = [];
  for (let item of messages) {
    let id = item.id;
    let content = item.content;
    let user = item.username;
    let isSender = (username === user);
    let message = (
    <Message key={`message-${id}`} content={content}
             username={user} isSender={isSender} deleteMessage={() => deleteMessage(id)}
    />);
    messageItems.push(message);
  }
  return (
    <div className="App">
      <div className='content'>
          <div className='content-header'>
            <input type='text' className='username' value={username}
            placeholder="username"  onChange={e => {setUsername(e.target.value)}}
            />
          </div>
          <div className='messages'>{messageItems}</div>
          <div className='input-area'>
            <div className='input-content'>
              <textarea className='text-area' value={message}
                onChange={ e=> {setMessage(e.target.value) }}
              />
              <div className='submit-button' onClick={() => submitMessage()}>↵</div>
            </div>
          </div>
        </div>
    </div>
  );
}
export default App;