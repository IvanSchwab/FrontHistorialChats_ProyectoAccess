import React, { useState, useEffect } from "react";
import LogoutButton from "./Logout";
import axios from "axios";
import "../Dashboard.css";

interface Chat {
  chat_id: string;
  user_id: string;
  session_id: string;
  status: string;
  messages: Message[];
}

interface Message {
  message_id: string;
  content: string;
  role: "human" | "ai";
  date: string;
}

const ChatList: React.FC<{
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}> = ({ chats, onSelectChat }) => (
  <div className="card-list card">
    <h2 className="title-chats">Chats</h2>
    <ul>
      {chats.map((chat) => (
        <li key={chat.chat_id} onClick={() => onSelectChat(chat)}>
          {chat.chat_id}
        </li>
      ))}
    </ul>
  </div>
);

const ChatWindow: React.FC<{ selectedChat: Chat | null }> = ({
  selectedChat,
}) => {
  useEffect(() => {
    console.log("Selected chat:", selectedChat);
  }, [selectedChat]);

  if (!selectedChat) {
    return <div className="chat-window card empty-message" />;
  }

  return (
    <div className="chat-window card">
      <div className="chat-name">{selectedChat.chat_id}</div>
      <div className="messages">
        {selectedChat.messages.length > 0 ? (
          selectedChat.messages
            .filter(message => message !== null) // Filter out any null entries
            .map((message) => (
              <div key={message.message_id} className={`message ${message.role === 'ai' ? 'ai' : 'human'}`}>
                <strong>{message.content}</strong>
                <small>{new Date(parseInt(message.date) * 1000).toLocaleString()}</small>
              </div>
            ))
        ) : (
          <p>Sin mensajes aún</p>
        )}
      </div>
    </div>
  );
};


const Dashboard: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false); // New state for connection status
  const [loading, setLoading] = useState<boolean>(true); // State to track loading state

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/conversations");
      console.log("Datos de la API:", response.data);
      setChats(response.data);
      setIsConnected(true);
    } catch (error) {
      console.error("Error fetching chats:", error);
      setIsConnected(false);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  if (loading) {
    return(
    <div className="loading-message">
      <p>Cargando chats...</p>
    </div>)
  }

  return (
    <div className="dashboard">

      <div className="main-container">
        <div className="chat-list-container">
          <ChatList chats={chats} onSelectChat={handleSelectChat} />
        </div>

        <div className="chat-window-container">
          <ChatWindow selectedChat={selectedChat} />
        </div>
      </div>

      <div className="logout-container">
        <LogoutButton />
      </div>

      {!isConnected && <p>Fallo de conexión. Por favor, revisa tu red.</p>}
    </div>
      
);
  
};


export default Dashboard;
