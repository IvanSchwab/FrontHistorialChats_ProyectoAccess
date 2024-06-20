import React, { useState, useEffect } from "react";
import LogoutButton from "./Logout";
import axios from "axios";
import "../Dashboard.css";

interface Chat {
  _id: string;
  chat_id: string;
  user_id: string;
  session_id: string;
  status: string;
  messages: Message[];
}

interface Message {
  _id: string;
  text: string;
  sender: "me" | "other";
}

const ChatList: React.FC<{
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}> = ({ chats, onSelectChat }) => (
  <div className="chat-list card">
    <h2>Chats</h2>
    <ul>
      {chats.map((chat) => (
        <li key={chat._id} onClick={() => onSelectChat(chat)}>
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
    console.log("selectedChat:", selectedChat);
  }, [selectedChat]);

  return (
    <div className="chat-window card">
      {selectedChat ? (
        <>
          <div className="chat-name">{selectedChat.chat_id}</div>
          <div className="messages">
            {selectedChat.messages.map((message) => (
              <div
                key={message._id}
                className={`message ${message.sender ? message.sender : ""}`}
              >
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

const Dashboard: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/conversations");
      console.log("Datos de la API:", response.data);
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
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
    </div>
  );
};

export default Dashboard;
