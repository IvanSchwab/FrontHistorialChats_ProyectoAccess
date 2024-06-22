import React, { useState, useEffect } from "react";
import LogoutButton from "./Logout";
import axios from "axios";
import "../Dashboard.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CircleIcon from '@mui/icons-material/Circle';

interface Chat {
  chat_id: string;
  user_id: string;
  session_id: string;
  status: "open" | "closed";
  messages: Message[];
}

interface Message {
  message_id: string;
  content: string;
  role: "human" | "ai";
  date: string;
  feedback?: "Positive" | "Negative" | "None";  
}

const ChatList: React.FC<{
  chats: Chat[];
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChat: (chat: Chat) => void;
}> = ({ chats, onSelectChat }) => (
  <div className="card-list card">
    <h2 className="title-chats">Chats</h2>
   
    <ul>
      {chats.map((chat) => (
        <li key={chat.chat_id} onClick={() => onSelectChat(chat)} className="chat-list-item">
          <CircleIcon className={`status-icon ${chat.status}`} />
          {chat.chat_id}
        </li>
      ))}
    </ul>
  </div>
);

const ChatWindow: React.FC<{ selectedChat: Chat | null }> = ({ selectedChat }) => {
  useEffect(() => {
    console.log("Selected chat:", selectedChat);
  }, [selectedChat]);

  if (!selectedChat) {
    return <div className="chat-window card empty-message" />;
  }

  return (
    <div className="chat-window card">
      <div className="chat-header sticky-header">
        <span className="chat-id">{selectedChat.chat_id}</span>
        <span className={`status-label ${selectedChat.status}`}>
          {selectedChat.status === 'open' ? 'Abierto' : 'Cerrado'}
        </span>
      </div>
      <div className="messages">
        {selectedChat.messages.length > 0 ? (
          selectedChat.messages
            .filter((message) => message !== null) // Filtra cualquier entrada nula
            .map((message) => (
              <div key={message.message_id} className={`message ${message.role === 'ai' ? 'ai' : 'human'}`}>
                <strong>{message.content}</strong>
                <small>{new Date(parseInt(message.date) * 1000).toLocaleString()}</small>
                {message.role === 'ai' && (
                  <div className="feedback-container">
                    {message.feedback === "Positive" && <ThumbUpIcon color="primary" />}
                    {message.feedback === "Negative" && <ThumbDownIcon color="error" />}
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="message">
          <p>Sin mensajes aún</p>
          </div>
        )}
      </div>
    </div>
  );
};


const Dashboard: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      setLoading(false);
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredChats = chats.filter((chat) =>
    chat.chat_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-message">
        <p>Cargando chats...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="main-container">
        <div className="chat-list-container">
          <ChatList chats={filteredChats} searchQuery={searchQuery} onSearchChange={handleSearchChange} onSelectChat={handleSelectChat} />
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
