import React, { useState } from 'react';
import LogoutButton from './Logout';
import '../Dashboard.css';

// Definir una interfaz para el tipo de datos de Chat
interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
}

// Componente para la lista de chats (hardcodeado)
const ChatList: React.FC<{ chats: Chat[]; onSelectChat: (chat: Chat) => void }> = ({ chats, onSelectChat }) => (
  <div className="chat-list card">
    <h2>Chats</h2>
    <ul>
      {chats.map((chat) => (
        <li key={chat.id} onClick={() => onSelectChat(chat)}>
          {chat.name}
        </li>
      ))}
    </ul>
  </div>
);

// Componente para el chat seleccionado
const ChatWindow: React.FC<{ selectedChat: Chat | null }> = ({ selectedChat }) => {
  return (
    <div className="chat-window card">
      {selectedChat ? (
        <>
          <div className="chat-name">{selectedChat.name}</div>
          <div className="messages">
            {selectedChat.messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Selecciona un chat para empezar a chatear</p>
      )}
    </div>
  );
};

// Componente Dashboard principal
const Dashboard: React.FC = () => {
  // Estado para almacenar el chat seleccionado
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // Lista hardcodeada de chats
  const chats: Chat[] = [
    {
      id: 1,
      name: 'Chat 1',
      messages: [
        { id: 1, text: 'Hola!', sender: 'me' },
        { id: 2, text: 'Hola! Qué tal?', sender: 'other' },
          ],
    },
    {
        id: 2,
        name: 'Chat 2',
        messages: [
          { id: 1, text: 'Hola!', sender: 'me' },
          { id: 2, text: 'Hola! Qué tal?', sender: 'other' },
        ],
      }

  ];

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <LogoutButton />

      <div className="main-container">
        {/* Card para la lista de chats */}
        <div className="chat-list-container">
          <ChatList chats={chats} onSelectChat={handleSelectChat} />
        </div>

        {/* Card para el chat seleccionado */}
        <div className="chat-window-container">
          <ChatWindow selectedChat={selectedChat} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
