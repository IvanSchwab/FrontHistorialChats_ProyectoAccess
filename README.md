# Aplicación FrontHistorialChats
## Descripción
Esta aplicación web te permite gestionar y visualizar historiales de chats de manera eficiente. Para acceder, necesitas una cuenta autorizada, ya sea registrándote con un nuevo usuario o utilizando una cuenta existente. También puedes iniciar sesión mediante la verificación de Microsoft Outlook.

Una vez dentro de la aplicación, encontrarás una interfaz intuitiva con una lista de chats a la izquierda. Al seleccionar un chat, se desplegará una ventana en el lado derecho mostrando los mensajes del historial. Cada chat incluye detalles como su ID, el ID del usuario y de la sesión, y su estado (abierto o cerrado).

Los mensajes en los chats están claramente organizados, mostrando su contenido, el rol (humano o IA), la fecha y cualquier feedback recibido (positivo, negativo o nulo). Esta disposición te permite navegar y revisar conversaciones de manera rápida y efectiva, mejorando así tu experiencia de gestión de chats.

## Requisitos
- Node.js
- npm (Node Package Manager)
- MongoDB

## Instalación
### Clonar el repositorio:
```
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```
## Instalar dependencias
```
npm install
```
# Ejecución
## Frontend
Para ejecutar el frontend, usa el siguiente comando:
```
npm run dev
```
El frontend estará disponible en el puerto 5173.

## Backend
Para ejecutar el backend, usa el siguiente comando:
```
npx nodemon app
```
El backend se ejecutará en el puerto 3100.

## API de Persistencia
Para cargar el historial de chats, la aplicación necesita conectarse con una API de persistencia la cúal contiene la dirección a la base de datos que se encuentra en el siguiente repositorio: API_AccessChatbot_Conversations. (https://github.com/FacuZ7/API_AccessChatbot_Conversations)

### MongoDB
Asegúrate de que el servidor de MongoDB esté corriendo en el puerto 8080.

### Configuración .env

Archivo .env
El backend requiere un archivo .env con la siguiente estructura:
```
DB_CONNECTION_STRING = "conection string del repo API_AccessChatbot_Conversations"
ACCESS_TOKEN_SECRET = ' '
REFRESH_TOKEN_SECRET = ' '
PORT = '3100'
```
### Cambiar Puerto del Frontend
Si deseas cambiar el puerto del frontend, edita el archivo src/auth/constants.ts y modifica la variable API_URL.

### Notas Adicionales
Asegúrate de que tanto el frontend como el backend estén ejecutándose simultáneamente para que la aplicación funcione correctamente.
La configuración de los puertos y la conexión a la base de datos son críticas para el correcto funcionamiento de la aplicación.
