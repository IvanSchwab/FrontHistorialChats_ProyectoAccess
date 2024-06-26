import React, { useState, useRef } from "react";
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

interface Props {
  chats: Chat[]; // Lista de chats
  searchQuery: string; // Consulta de búsqueda
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Manejador de cambio en la búsqueda
  onSelectChat: (chat: Chat) => void; // Función para seleccionar un chat
}

// Componente funcional ChatList
const ChatList: React.FC<Props> = ({
  chats,
  searchQuery,
  onSearchChange,
  onSelectChat,
}) => {
  // Función para remover la clase 'selectedChat' de todos los elementos
  const changeChatIndicator = () => {
    document.querySelector(".selectedChat")?.classList.remove("selectedChat");
  };

  // Función para obtener la fecha del último mensaje
  const getLastMessageDate = (messages: Message[]): string => {
    if (messages.length === 0) return "No messages";
    const lastMessage = messages[messages.length - 1];
    return new Date(parseInt(lastMessage.date) * 1000)
      .toLocaleString()
      .split(",")[0];
  };

  // Estado y referencias para la funcionalidad de búsqueda
  const [isSearchIconGone, setIsSearchIconGone] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isIconCloseVisible, setIsIconCloseVisible] = useState(false);

  const searchIconBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const iconCloseRef = useRef<SVGSVGElement>(null);
  const chatHeaderRef = useRef<HTMLDivElement>(null);

  // Manejador de clic en el ícono de búsqueda
  const handleSearchIconClick = () => {
    setIsSearchIconGone(true);
    setIsInputVisible(true);
    setIsIconCloseVisible(true);

    // Limpiar el contenido del input de búsqueda
    if (inputRef.current) {
      inputRef.current.value = "";
      // Llamar al manejador para actualizar el estado de búsqueda
      onSearchChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    if (chatHeaderRef.current) {
      chatHeaderRef.current.style.padding = "";
    }
  };

  // Manejador de clic en el ícono de cierre
  const handleIconCloseClick = () => {
    setIsSearchIconGone(false);
    setIsInputVisible(false);
    setIsIconCloseVisible(false);

    if (chatHeaderRef.current) {
      chatHeaderRef.current.style.padding = "";
    }
  };

  return (
    <>
      <div ref={chatHeaderRef} className="chats-header">
        <h2 className="title-chats">Chats</h2>
        <input
          type="text"
          placeholder="Buscar por ID..."
          value={searchQuery}
          onChange={onSearchChange}
          ref={inputRef}
          className="search-box"
          style={{ display: isInputVisible ? "block" : "none" }}
        />
        <div className="box-icon-close">
          <svg
            className="icon-close"
            onClick={handleIconCloseClick}
            ref={iconCloseRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0,0,256,256"
            width="30px"
            height="30px"
            style={{ display: isIconCloseVisible ? "block" : "none" }}
          >
            <g
              fill="#234d9d"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M25,2c-12.69047,0 -23,10.30953 -23,23c0,12.69047 10.30953,23 23,23c12.69047,0 23,-10.30953 23,-23c0,-12.69047 -10.30953,-23 -23,-23zM25,4c11.60953,0 21,9.39047 21,21c0,11.60953 -9.39047,21 -21,21c-11.60953,0 -21,-9.39047 -21,-21c0,-11.60953 9.39047,-21 21,-21zM32.99023,15.98633c-0.26377,0.00624 -0.51439,0.11645 -0.69727,0.30664l-7.29297,7.29297l-7.29297,-7.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30274c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l7.29297,7.29297l-7.29297,7.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l7.29297,-7.29297l7.29297,7.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-7.29297,-7.29297l7.29297,-7.29297c0.29724,-0.28583 0.38857,-0.7248 0.23,-1.10546c-0.15857,-0.38066 -0.53454,-0.62497 -0.94679,-0.61524z"></path>
              </g>
            </g>
          </svg>
        </div>

        <div
          className="search-icon-box"
          ref={searchIconBoxRef}
          style={{ display: isSearchIconGone ? "none" : "flex" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0,0,256,256"
            width="30px"
            height="30px"
          >
            <g
              fill="#234d9d"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
            >
              <g transform="scale(10.66667,10.66667)">
                <path d="M9,2c-3.85415,0 -7,3.14585 -7,7c0,3.85415 3.14585,7 7,7c1.748,0 3.34501,-0.65198 4.57422,-1.71875l0.42578,0.42578v1.29297l5.58594,5.58594c0.552,0.552 1.448,0.552 2,0c0.552,-0.552 0.552,-1.448 0,-2l-5.58594,-5.58594h-1.29297l-0.42578,-0.42578c1.06677,-1.22921 1.71875,-2.82622 1.71875,-4.57422c0,-3.85415 -3.14585,-7 -7,-7zM9,4c2.77327,0 5,2.22673 5,5c0,2.77327 -2.22673,5 -5,5c-2.77327,0 -5,-2.22673 -5,-5c0,-2.77327 2.22673,-5 5,-5z"></path>
              </g>
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30px"
            height="30px"
            onClick={handleSearchIconClick}
          >
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
        </div>
      </div>
      <div className="chat-list">
        <ul>
          {chats
            .filter((chat) =>
              chat.chat_id.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((chat, index) => (
              <li
                key={`${chat.chat_id}-${index}`}
                onClick={() => {
                  changeChatIndicator();
                  onSelectChat(chat);
                }}
                className="chat-list-item"
              >
                <div>{chat.chat_id}</div>
                <small>{getLastMessageDate(chat.messages)}</small>
                <small className={`tag-${chat.status}`}>
                  {chat.status === "open" ? "abierto" : "cerrado"}
                </small>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ChatList;
