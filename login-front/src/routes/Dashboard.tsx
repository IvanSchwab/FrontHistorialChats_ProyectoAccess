import React, { useState, useEffect, useRef } from "react";
import LogoutButton from "./Logout";
import axios from "axios";
import "../Dashboard.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface Chat {
  chat_id: string;
  user_id: string;
  session_id: string;
  status: "open" | "closed";
  messages: Message[];
  // lastActivity: string;
}

interface Message {
  message_id: string;
  content: string;
  role: "human" | "ai";
  date: string;
  feedback?: "Positiva" | "Negativa" | "None";
}

const ChatList: React.FC<{
  chats: Chat[];
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChat: (chat: Chat) => void;
}> = ({ chats, searchQuery, onSearchChange, onSelectChat }) => {

  const changeChatIndicator = () =>{
    document.querySelector('.selectedChat')?.classList.remove('selectedChat');
    
  }

  const getLastMessageDate = (messages: Message[]): string => {
    if (messages.length === 0) return "No messages";
    const lastMessage = messages[messages.length - 1];
    return new Date(parseInt(lastMessage.date) * 1000).toLocaleString().split(',')[0];
  };

  //this part is just to make the input appear and disappear
  const [isSearchIconGone, setIsSearchIconGone] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isIconCloseVisible, setIsIconCloseVisible] = useState(false);

  const searchIconBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const iconCloseRef = useRef<SVGSVGElement>(null);
  const chatHeaderRef = useRef<HTMLDivElement>(null);

  const handleSearchIconClick = (e: React.MouseEvent) => {
    setIsSearchIconGone(true);
    setIsInputVisible(true);
    setIsIconCloseVisible(true);

    if (chatHeaderRef.current) {
      chatHeaderRef.current.style.padding = "10px 10px 10px 30px";
    }
  };

  const handleIconCloseClick = (e: React.MouseEvent) => {
    setIsSearchIconGone(false);
    setIsInputVisible(false);
    setIsIconCloseVisible(false);

    if (chatHeaderRef.current) {
      chatHeaderRef.current.style.padding = "";
    }
  };

  return(
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
        style={{ display: isInputVisible ? 'block' : 'none' }}
      />
      <div className="box-icon-close">
        <svg className='icon-close' onClick={handleIconCloseClick} ref={iconCloseRef} xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="30px" height="30px" style={{ display: isIconCloseVisible ? 'block' : 'none' }}>
          <g fill="#234d9d" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none">
            <g transform="scale(5.12,5.12)">
              <path d="M25,2c-12.69047,0 -23,10.30953 -23,23c0,12.69047 10.30953,23 23,23c12.69047,0 23,-10.30953 23,-23c0,-12.69047 -10.30953,-23 -23,-23zM25,4c11.60953,0 21,9.39047 21,21c0,11.60953 -9.39047,21 -21,21c-11.60953,0 -21,-9.39047 -21,-21c0,-11.60953 9.39047,-21 21,-21zM32.99023,15.98633c-0.26377,0.00624 -0.51439,0.11645 -0.69727,0.30664l-7.29297,7.29297l-7.29297,-7.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30274c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l7.29297,7.29297l-7.29297,7.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l7.29297,-7.29297l7.29297,7.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-7.29297,-7.29297l7.29297,-7.29297c0.29724,-0.28583 0.38857,-0.7248 0.23,-1.10546c-0.15857,-0.38066 -0.53454,-0.62497 -0.94679,-0.61524z">
              </path>
            </g>
          </g>
        </svg>
      </div>

      <div className="search-icon-box" ref={searchIconBoxRef} style={{ display: isSearchIconGone ? 'none' : 'flex' }}>
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="30px" height="30px" >
          <g fill="#234d9d" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none">
            <g transform="scale(10.66667,10.66667)">
              <path d="M9,2c-3.85415,0 -7,3.14585 -7,7c0,3.85415 3.14585,7 7,7c1.748,0 3.34501,-0.65198 4.57422,-1.71875l0.42578,0.42578v1.29297l5.58594,5.58594c0.552,0.552 1.448,0.552 2,0c0.552,-0.552 0.552,-1.448 0,-2l-5.58594,-5.58594h-1.29297l-0.42578,-0.42578c1.06677,-1.22921 1.71875,-2.82622 1.71875,-4.57422c0,-3.85415 -3.14585,-7 -7,-7zM9,4c2.77327,0 5,2.22673 5,5c0,2.77327 -2.22673,5 -5,5c-2.77327,0 -5,-2.22673 -5,-5c0,-2.77327 2.22673,-5 5,-5z">
              </path>
            </g>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px" height="30px" onClick={handleSearchIconClick}>
          <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z">
          </path>
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
                onSelectChat(chat)
              }}
              className="chat-list-item"
            >
              <div>{chat.chat_id}</div>
              {/* <small>{chat.lastActivity.split('T')[0]} at {chat.lastActivity.split('T')[1].split('.')[0].split(':')[0]}:{chat.lastActivity.split('T')[1].split('.')[0].split(':')[1]}</small> */}
              <small>{getLastMessageDate(chat.messages)}</small>
              <small className={`tag-${chat.status}`}>{chat.status}</small>
            </li>
          ))}
      </ul>
    </div>
  </>
)};

const ChatWindow: React.FC<{ selectedChat: Chat | null }> = ({
  selectedChat,
}) => {
  useEffect(() => {
    // console.log("Selected chat:", selectedChat);
  }, [selectedChat]);

  if (!selectedChat) {
    return <div className="chat-window card empty-message" />;
  }

  return (
    <div className="chat-window card">
      <div className="chat-header sticky-header">
        <span className="chat-id">{selectedChat.chat_id}</span>
        <span className={`status-label ${selectedChat.status}`}>
          {selectedChat.status === "open" ? "Abierto" : "Cerrado"}
        </span>
      </div>
      <div className="messages">
        {selectedChat.messages.length > 0 ? (
          selectedChat.messages
            .filter((message) => message !== null)
            .map((message, index) => (
              <div
                key={`${message.message_id}-${index}`}
                className={`message ${message.role === "ai" ? "ai" : "human"}`}
              >
                <div>
                  <div className="icon">
                    {message.role === "ai" ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 41 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                      >
                        <text x="-9999" y="-9999">
                          ChatGPT
                        </text>
                        <path
                          d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    ) : (
                      <img src="src/images/user-icon-color008000-20.png" alt="user-icon"/>
                    )}
                  </div>{" "}
                </div>
                <div className="content">
                  <strong>{message.content}</strong>
                  <small className="hour">
                    {new Date(parseInt(message.date) * 1000).toLocaleString()}
                  </small>
                </div>
                {message.role === "ai" && (
                  <div className="feedback-container">
                    {message.feedback === "Positiva" && (
                      <ThumbUpIcon color="primary" />
                    )}
                    {message.feedback === "Negativa" && (
                      <ThumbDownIcon color="error" />
                    )}
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="message message-empty">
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
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/conversations");
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

    fetchChats();
  }, []);

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
