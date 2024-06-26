import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import LogoutButton from "./Logout";
import "../Dashboard.css";

// Definición de tipos
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
  feedback?: "Positiva" | "Negativa" | "None";
}

// Componente funcional Dashboard
const Dashboard: React.FC = () => {
  // Estados del componente
  const [chats, setChats] = useState<Chat[]>([]); // Estado para almacenar los chats
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null); // Estado para el chat seleccionado
  const [isConnected, setIsConnected] = useState<boolean>(false); // Estado para indicar si hay conexión
  const [loading, setLoading] = useState<boolean>(true); // Estado para indicar si está cargando
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para la búsqueda de chats

  // Efecto de carga inicial para obtener los chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/conversations"); // Petición GET a la API
        console.log("Datos de la API:", response.data);
        setChats(response.data); // Actualiza el estado de chats con los datos recibidos
        setIsConnected(true); // Indica que hay conexión exitosa
      } catch (error) {
        //Manejo de error en la petición GET
        console.error("Error fetching chats:", error);
        setIsConnected(false);
      } finally {
        setLoading(false); // Finaliza la carga, independientemente del resultado de la petición
      }
    };

    fetchChats();
  }, []);

  // Manejador para seleccionar un chat
  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filtra los chats según la búsqueda actual
  const filteredChats = chats.filter((chat) =>
    chat.chat_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Renderiza un mensaje de carga mientras se obtienen los chats
  if (loading) {
    return (
      <div className="loading-message">
        <p>Cargando chats...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="logout-container">
        <img
          src="src/images/logoAccess.png"
          alt="Logo Access"
          className="logo-header"
        />
        <LogoutButton />
      </div>
      <div className="main-container">
        <div className="chat-list-container">
          <ChatList
            chats={filteredChats}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSelectChat={handleSelectChat}
          />
        </div>
        <div className="chat-window-container">
          <ChatWindow selectedChat={selectedChat} />
        </div>
      </div>
      {!isConnected && <p>Fallo de conexión. Por favor, revisa tu red.</p>}
    </div>
  );
};

export default Dashboard;
