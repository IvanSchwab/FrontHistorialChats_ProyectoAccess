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
  <div className="chat-list card">
    <h2>Chats</h2>
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
    return <p>Please select a chat to view its messages.</p>;
  }

  return (
    <div className="chat-window card">
      <div className="chat-name">{selectedChat.chat_id}</div>
      <div className="messages">
        {selectedChat.messages.length > 0? (
          selectedChat.messages
          .filter(message => message!== null) // Filter out any null entries
          .map((message) => (
              <div key={message.message_id} className={`message ${message.role === 'ai'? 'ai' : 'human'}`}>
                <strong>{message.content}</strong>
                <small>{new Date(message.date).toLocaleString()}</small>
              </div>
           ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false); // New state for connection status

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
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <LogoutButton />

      <div className="main-container">
        <div className="chat-list-container">
          <ChatList chats={chats} onSelectChat={handleSelectChat} />
        </div>

        <div className="chat-window-container">
          <ChatWindow selectedChat={selectedChat} />
        </div>
      </div>
      {!isConnected && <p>Connection failed. Please check your network.</p>}
    </div>
  );
};

export default Dashboard;
